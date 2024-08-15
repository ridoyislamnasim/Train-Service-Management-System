import catchError from "../../middleware/errors/catchError.js";
import withTransaction from "../../middleware/transactions/withTransaction.js";
import responseHandler from "../../utils/responseHandler.js";
import ticketService from "./ticket.service.js";

class TicketController {
    createTicket = withTransaction(async(req,res,next, session)=>{
        const userID = req?.user?.id
        const payload = {
            user:userID,
            train:req.body?.train,
            startStation:req.body?.startStation,
            endStation:req.body?.endStation,
            seatNumber:req.body?.seatNumber,
            journeyDate: req.body?.journeyDate,
        }

        const ticket = await ticketService.createTicket(payload, session);
        const resDoc = responseHandler(201, 'Ticket Create Successfully', ticket);
        res.status(resDoc.statusCode).json(resDoc);
    })

    getAllTicket = catchError(async(req,res,next)=>{
        const { page, limit, order} = req.query;
        let query={
			page: page,
			limit: limit,
			order: order,
		}
        const ticket = await ticketService.getAllTicket(query);
        const resDoc = responseHandler(200, 'Ticket get Successfully',ticket);
        res.status(resDoc.statusCode).json(resDoc);
    })


    
    getSingleTicket = catchError(async(req,res,next)=>{
        const {id}=req.params;
        const ticket  = await ticketService.getSingleTicket(id)
        const resDoc = responseHandler(200,'Ticket Get SuccessFully',ticket);
        res.status(resDoc.statusCode).json(resDoc);
    })

    updateTicket = catchError(async (req, res, next) => {
        const userID = req?.user?.id
        const payload = {
            user:userID,
            train:req.body?.train,
            startStation:req.body?.startStation,
            endStation:req.body?.endStation,
            seatNumber:req.body?.seatNumber,
            journeyDate: req.body?.journeyDate,
        }   
        const {id}=req.params;
    
        const ticket = await ticketService.updateTicket(payload , id);
        const resDoc = responseHandler(200,'Ticket update successfully');
        return res.status(201).json(resDoc);
    });

    cancleTicket = withTransaction(async (req, res, next, session) => {
        const {id}=req.params;
        const ticket  = await ticketService.cancleTicket(session,id);
        const resDoc = responseHandler(200, 'Ticket cancle successfully');
        res.status(resDoc.statusCode).json(resDoc);
    });

    updateTicketStatus = catchError(async (req, res, next) => {
        const { id } = req.params;
        await ticketService.updateTicketStatus(id, req.query);
        const resDoc = responseHandler(200, 'Ticket Update Status successfully');
        res.status(resDoc.statusCode).json(resDoc);
      });

}

export default new TicketController();