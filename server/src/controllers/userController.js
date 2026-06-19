import User from "../models/User.js";

export const getMe = async (
  req,
  res
) => {

  const user = await User.findById(
    req.user.userId
  );

  res.json(user);
};