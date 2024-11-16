const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  const refreshToken = jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return { accessToken, refreshToken };
};

exports.signup = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password, name } = req.body;
    const user = new User({ email, password, name });
    await user.save();

    const tokens = generateTokens(user._id);
    res.status(201).json({
      user: { id: user._id, email: user.email, name: user.name },
      ...tokens,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw new Error("Invalid login credentials");
    }

    const tokens = generateTokens(user._id);
    res.json({
      user: { id: user._id, email: user.email, name: user.name },
      ...tokens,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
