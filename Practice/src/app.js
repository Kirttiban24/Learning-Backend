const express = require("express")
const noteModel = require("./models/notes.model")

const app = express()

app.use(express.json())

app.post("/notes", async (req,res) => {
    const { title, description,age } = req.body

    const note = await noteModel.create({
        title, description,age
    })

    res.status(201).json({
        message: "note created successfully",
        note
    })
})

app.get("/notes", async (req,res) => {
    const note = await noteModel.find()

    res.status(200).json({
        message: "note fetched successfully",
        note
    })
})

module.exports = app