import bcrypt from "bcryptjs"

const comparePassword = async (password, hashPassword) => {
    const comparePassword = await bcrypt.compare(password, hashPassword);
    return comparePassword;
}

export {
    comparePassword
}