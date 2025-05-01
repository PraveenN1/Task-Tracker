const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const signupUser = async (req, res) => {
  const { email, password, name, country } = req.body;

  try {
    if (!email || !password || !name || !country) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: `User already exists` });
    }

    const hashedpwd = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedpwd,
      name,
      country,
    });

    const token = jwt.sign({ id: user._id}, JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token",token,{
      maxAge:24*60*60*1000,
    }).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        country: user.country,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Unable to Signup...Try Again!" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.json({ message: "Please enter both email and password" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("token",token,{
      maxAge:24*60*60*1000,
    }).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        country: user.country,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Unable to Login...Try Again!" });
  }
};

const logOutUser = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged Out" });
};


module.exports = { signupUser, loginUser ,logOutUser};
