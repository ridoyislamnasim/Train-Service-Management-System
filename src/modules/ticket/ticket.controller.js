import catchError from "../../middleware/errors/catchError.js";
import withTransaction from "../../middleware/transactions/withTransaction.js";
import responseHandler from "../../utils/responseHandler.js";
import courseService from "./ticket.service.js";

class TicketController {
    createTicket = withTransaction(async(req,res,next, session)=>{
        const payload = {
            level:req.body?.level,
            term:req.body?.term,
            course_name:req.body?.course_name,
            course_code:req.body?.course_code,
            batch_ref:req.body?.batch_ref,
            semester_ref: req.semester?._id,
            department_ref: req.user?.department_ref[0],
        }

        const course = await courseService.createTicket(payload, session);
        const resDoc = responseHandler(201, 'Ticket Create Successfully', course);
        res.status(resDoc.statusCode).json(resDoc);
    })

    getAllTicket = catchError(async(req,res,next)=>{
        const { page, limit, order} = req.query;
        let query={
			page: page,
			limit: limit,
			order: order,
            semester_ref: req.semester?._id,
            department_ref: req.user?.department_ref[0],
		}
        const course = await courseService.getAllTicket(query);
        const resDoc = responseHandler(200, 'Ticket get Successfully',course);
        res.status(resDoc.statusCode).json(resDoc);
    })

    getAllActiveTicket = catchError(async(req,res,next)=>{
        const payload ={
            semester_ref: req.semester?._id,
            department_ref: req.user?.department_ref[0],
        }
        const course = await courseService.getAllActiveTicket(payload);
        const resDoc = responseHandler(200, 'Ticket get Successfully',course);
        res.status(resDoc.statusCode).json(resDoc);
    })

    getNotUseActiveTicket = catchError(async(req,res,next)=>{
        const payload ={
            semester_ref: req.semester?._id,
            department_ref: req.user?.department_ref[0],
        }
        const course = await courseService.getNotUseActiveTicket(payload);
        const resDoc = responseHandler(200, 'Ticket get Successfully',course);
        res.status(resDoc.statusCode).json(resDoc);
    })
    
    getSingleTicket = catchError(async(req,res,next)=>{
        const {id}=req.params;
        const course  = await courseService.getSingleTicket(id)
        const resDoc = responseHandler(200,'Ticket Get SuccessFully',course);
        res.status(resDoc.statusCode).json(resDoc);
    })

    updateTicket = catchError(async (req, res, next) => {
        const payload = { 
            level:req.body?.level,
            term:req.body?.term,
            course_name:req.body?.course_name,
            course_code:req.body?.course_code,
            batch:req.body?.batch,
            update_ids:req.body?.update_ids,
            update_course_name:req.body?.update_course_name,
            update_course_code:req.body?.update_course_code, 
            semester_ref: req.semester?._id,
            department_ref: req.user?.department_ref[0], 
        };    
        const {id}=req.params;
    
        const course = await courseService.updateTicket(payload , id);
        const resDoc = responseHandler(200,'Ticket update successfully');
        return res.status(201).json(resDoc);
    });

    deleteTicket = catchError(async (req, res, next) => {
        const {id}=req.params;
        const course  = await courseService.deleteTicket(id);
        const resDoc = responseHandler(200, 'Ticket get successfully');
        res.status(resDoc.statusCode).json(resDoc);
    });

    updateTicketStatus = catchError(async (req, res, next) => {
        const { id } = req.params;
        await courseService.updateTicketStatus(id, req.query);
        const resDoc = responseHandler(200, 'Ticket Update Status successfully');
        res.status(resDoc.statusCode).json(resDoc);
      });

}

export default new TicketController();