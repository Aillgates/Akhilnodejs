const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString(); // Random 6-digit OTP

module.exports = generateOTP;
