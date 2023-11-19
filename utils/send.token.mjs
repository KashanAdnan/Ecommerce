import jwt from "jsonwebtoken";

const sendToken = (dataToSend) => {
    try {
        const token = jwt.sign({
            ...dataToSend
        }, process.env.JWT_SECRET_KEY)
        return token;
    } catch (error) {
        console.log(error.message);
    }
}

export default sendToken