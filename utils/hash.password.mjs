import bcrypt from "bcryptjs";

const hashPassword = async (password) => {
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    return hashPassword;
  } catch (error) {
    console.log(error.message);
  }
};

export { hashPassword };
