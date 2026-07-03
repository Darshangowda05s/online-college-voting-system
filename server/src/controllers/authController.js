import client from "../config/googleClient.js";
import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/tokenUtils.js";

export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const {
      sub,
      email,
      name,
      picture,
      email_verified,
    } = payload;

    if (!email_verified) {
      return res.status(401).json({
        success: false,
        message: "Email not verified",
      });
    }

    // OPTIONAL COLLEGE DOMAIN CHECK

    const collegeDomain = process.env.COLLEGE_DOMAIN;

    if (collegeDomain && !email.endsWith(collegeDomain)) {
      return res.status(403).json({
        success: false,
        message: `Use a valid ${collegeDomain} email`,
      });
    }

    let user = await User.findOne({
      googleId: sub,
    });

    if (!user) {
      user = await User.create({
        googleId: sub,
        email,
        name,
        picture,
      });
    }

    const accessToken =
      generateAccessToken(user);

    const refreshToken =
      generateRefreshToken(user);

    await RefreshToken.create({
      userId: user._id,
      token: refreshToken,
      expiresAt: new Date(
        Date.now() +
        7 * 24 * 60 * 60 * 1000
      ),
    });

    res.cookie(
      "accessToken",
      accessToken,
      {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite: "lax",
        secure: false, // Set to true in production with HTTPS
      }
    );

    res.cookie(
      "refreshToken",
      refreshToken,
      {
        httpOnly: true,
        maxAge:
          7 * 24 * 60 * 60 * 1000,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
      }
    );

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not found",
      });
    }

    const storedToken = await RefreshToken.findOne({
      token: refreshToken,
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token",
      });
    }

    const user = await User.findById(
      storedToken.userId
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const accessToken = generateAccessToken(user);

    res.cookie(
      "accessToken",
      accessToken,
      {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite: "lax",
        secure: false,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
    });
  } catch (error) {
    console.error("Token refresh error:", error);

    return res.status(500).json({
      success: false,
      message: "Token refresh failed",
    });
  }
};

export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      await RefreshToken.deleteOne({
        token: refreshToken,
      });
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};