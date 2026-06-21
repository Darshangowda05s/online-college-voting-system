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
        message: "Email not verified",
      });
    }

    // OPTIONAL COLLEGE DOMAIN CHECK

    if (!email.endsWith("@cambridge.edu.in")) {
      return res.status(403).json({
        message: "Use college email",
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
    console.log(error);

    return res.status(500).json({
      message: "Login Failed",
    });
  }
};