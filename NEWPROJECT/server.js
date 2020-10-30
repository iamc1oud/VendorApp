// Dependency
const express = require('express')

const app = express()

app.get("", (req, res) => {
    res.send({
        status: 'Done',
        fetched: "File uploaded"
    })
})

app.post("", (req, res) => {
    res.send({
        response : "Response",
        name: req.params.name
    })
})

app.listen(
    8080,
    () => {
        console.log("Server started");
    }
)