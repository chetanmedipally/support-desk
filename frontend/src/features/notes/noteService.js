import axios from "axios";

const PROXY="http://localhost:5000/"
const baseRoute = "api/tickets/"

//Create new Note
const addNote = async (noteText, ticketId, token) => {

    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.post(PROXY + baseRoute + ticketId + "/notes" , {
        text:noteText
    }, config)
    return response.data
}

//Get Notes
const getNotes = async (ticketId, token) => {

    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get(PROXY+baseRoute+ticketId+"/notes", config)
    return response.data
}

const noteService = {
    addNote,
    getNotes
}

export default noteService