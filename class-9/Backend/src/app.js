const express = require("express")
const noteModel = require("./models/note.model")
const cors = require("cors")
const path = require("path")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("./public"))

// Create note 

app.post("/notes",async (req,res) => {
    const{ title, description } = req.body

    const note = await noteModel.create({
        title,description
    })
    
    res.status(201).json({
        message:"note created successfully",
        note
    })
})

// Fetch all the notes data from mongoDB

app.get("/notes", async (req,res) => {
    const notes = await noteModel.find()

    res.status(200).json({
        message: "notes fetched successfully",
        notes
    })
})

// Delete note with the id from req.params

app.delete("/api/notes/:id", async (req,res) => {
    const id = req.params.id

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "Note deleted successfully"
    })
})

// Patch/api/notes/:id  Update the description of note by id

app.patch("/api/notes/:id", async (req,res) => {
    const id = req.params.id
    const { description } = req.body

    await noteModel.findByIdAndUpdate(id,{ description })

    res.status(200).json({
        message: "Note updated successfully"
    })
})

console.log(__dirname);

app.use("*name", (req,res) => {
    res.sendFile(path.join(__dirname, "..", "/public/index.html"))
})





module.exports = app