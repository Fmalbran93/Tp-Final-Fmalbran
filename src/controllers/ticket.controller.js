const Ticket = require ("../models/ticket.model");
const TicketRepository = require("../repositories/ticket.repository");

const ticketR = new TicketRepository();

class TicketController {
    async getTicket(req, res) {
        try {
            const tickets = await Ticket.find();
            res.status(200).json({tickets: tickets});
        } catch (error){
            res.status(500).json({error: "Error al obtener los tickets"});
        }
    }

    async getTicketById(req, res) {
        const tid = req.params.tid
        try {
            const ticket = await ticketR.getTicketById(tid);
            res.json(ticket);
        }
        catch (error){
            res.status(500).send("Error al obtener el ticket");
        }
     }

     async renderPaymentGateway(req, res) {
        const tid = req.params.tid;
        try {
            const ticket = await ticketR.getTicketById(tid);
            res.render('pasarela', { ticket: ticket });
        } catch (error) {
            res.status(500).send("Error al obtener el ticket para el pago");
        }
    }
}

module.exports = TicketController;