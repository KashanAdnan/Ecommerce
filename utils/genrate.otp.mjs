const generateOtp = async () => {
  try {
    const otp = Math.floor(Math.random() * 1000000 + 1);
    return otp;
  } catch (error) {
    console.log(error.message);
  }
};

export default generateOtp;
