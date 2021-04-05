const express = require("express")
const mongoose = require("mongoose")
const router = require("./router")

class App {
    constructor() {
        this.app = express()
        this.setDB()
        this.setMiddleWare()
        this.setRouter()
        this.set404Error()
        this.setError()
    }
    setDB() {
        mongoose
            .connect("mongodb://localhost:27017/careerly", {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                ignoreUndefined: true,
                useFindAndModify: false,
            })
            .then(() => console.log("db connected"))
            .catch((err) => console.log(err))
    }
    setMiddleWare() {
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(express.json())
    }
    setRouter() {
        this.app.use(router)
        this.app.get("/", (req, res) => {
            res.send("hello")
        })
    }
    set404Error() {
        this.app.use((req, res, _) => {
            res.status(404).send("404")
        })
    }
    setError() {
        this.app.use((err, req, res, _) => {
            console.log(err)
            res.status(500).send("500")
        })
    }
}

module.exports = App
