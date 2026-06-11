const User = require("../Models/user.model");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");
const logActivity = require("../utils/logActivity");
const saltRounds = 10;

const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "The User Already Exists, please login" });
    }

   

    const hash = await bcrypt.hash(password, saltRounds);

    const user = await User.create({ ...req.body, password: hash });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: "Signup Successfull",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });


  } catch (error) {
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const myPlaintextPassword = password;
    const hash = user.password;
    const isMatching = await bcrypt.compare(myPlaintextPassword, hash);

    if (!isMatching) {
      return res.status(401).json({ message: "invalid email or password" });
    }
    
    const token = generateToken(user._id, user.role);
    await logActivity(user._id, 'login', 'User logged in');
    res.status(200).json({
      message: "Login successful",
      token ,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { signup, login };
