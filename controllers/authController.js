const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const generateOTP = require('../utils/generateOTP');

const tempUserStorage = {};

// Signup Controller
exports.signup = async (req, res) => {
  const { email, password } = req.body;
  const otp = generateOTP();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    tempUserStorage[email] = { email, password: hashedPassword, otp };
    console.log(`Generated OTP for ${email}: ${otp}`); // Log OTP for testing
    res.status(200).json({ message: 'User created temporarily. Please verify OTP.', email });
  } catch (error) {
    res.status(500).json({ message: 'Error during signup', error: error.message });
  }
};

// OTP Verification Controller
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const tempUser = tempUserStorage[email];
  if (!tempUser || tempUser.otp !== otp) return res.status(400).json({ message: 'Invalid OTP or user not found' });

  try {
    const newUser = new User({ email: tempUser.email, password: tempUser.password });
    await newUser.save();
    delete tempUserStorage[email];
    res.status(200).json({ message: 'OTP verified successfully, user saved to database' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving user', error: error.message });
  }
};

// Resend OTP Controller
exports.resendOTP = (req, res) => {
  const { email } = req.body;
  const tempUser = tempUserStorage[email];
  if (!tempUser) return res.status(400).json({ message: 'User not found or already verified' });

  const newOtp = generateOTP();
  tempUserStorage[email].otp = newOtp;
  console.log(`Resent OTP for ${email}: ${newOtp}`);
  res.status(200).json({ message: 'New OTP has been sent', email });
};

// Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    res.status(200).json({ message: 'Login successful', accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
};
