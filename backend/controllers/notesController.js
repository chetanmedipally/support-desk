const asyncHandler = require('express-async-handler')

const User = require('../models/UserModel')
const Ticket = require('../models/TicketModel')
const Note = require('../models/NotesModel')

// @desc   Get notes
// @route  GET /api/tickets/:ticketId/notes
// @access Private

const getNotes = asyncHandler(async (req, res) => {
    
    //Get user from JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const notes = await Note.find({ticket:req.params.ticketId })

    res.status(200).json(notes)
})

const addNote = asyncHandler(async (req, res) => {
    
    //Get user from JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const note = await Note.create(
        {
            text: req.body.text,
            ticket:req.params.ticketId,
            isStaff:false,
            user: req.user.id,
            staffId: ""
        }
        )

    res.status(201).json(note)
})

module.exports = {
    getNotes,
    addNote
}