import axios from "axios";

const PROXY="http://localhost:5000/"
const baseRoute = "api/tickets"

//Create new Ticket
const createTicket = async (ticketData, token) => {

    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.post(PROXY+baseRoute, ticketData, config)
    return response.data
}

//Get Tickets
const getTickets = async (token) => {

    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get(PROXY+baseRoute, config)
    return response.data
}

//Get Ticket
const getTicket = async (ticketId,token) => {
    
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get(PROXY+baseRoute+'/'+ticketId, config)
    
    return response.data
    
}

//close Ticket
const closeTicket = async (ticketId,token) => {
    
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.put(PROXY+baseRoute+'/'+ticketId, {status :'closed'}, config)
    
    return response.data
    
}

const ticketService = {
    createTicket,
    getTickets,
    getTicket,
    closeTicket
}

export default ticketService