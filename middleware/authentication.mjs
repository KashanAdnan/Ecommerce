const authentication = async (req, res, next) => {
    try {
        const {
            AUTHENTICATION_USER_TOKEN
        } = req.cookies;
        if (!AUTHENTICATION_USER_TOKEN) {
            res.status(400).send({
                success: false,
                message: "Please Login to Access This Resource!"
            })
        } else {
            next()
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export default authentication;