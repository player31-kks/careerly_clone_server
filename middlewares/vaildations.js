const { DB } = require("../models")
const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = (req, res, next) => {
    const { authorization } = req.headers
    try {
        const [tokenType, tokenValue] = authorization.split(" ")

        if (tokenType !== "Bearer") {
            console.log("tokenType")
            return res.status(400).send({ err: "token err" })
        }
        try {
            const { userId } = jwt.verify(tokenValue, process.env.TOKEN_KEY)
            DB.User.findById(userId)
                .then((user) => {
                    res.locals.user = user
                    next()
                })
                .catch((err) => {
                    return res.send({ err })
                })
        } catch (err) {
            return res.status(400).send({ err: "user err" })
        }
    } catch (err) {
        return res.status(400).send({ err: "split err" })
    }
}
