import catchError from "../../middleware/errors/catchError.js";
import withTransaction from "../../middleware/transactions/withTransaction.js";
import responseHandler from "../../utils/responseHandler.js";
import courseService from "./train.service.js";

class TrainController {
    createTrain = withTransaction(async(req,res,next, session)=>{
        const payload = {
            level:req.body?.level,
            term:req.body?.term,
            course_name:req.body?.course_name,
            course_code:req.body?.course_code,
            batch_ref:req.body?.batch_ref,
            semester_ref: req.semester?._id,
            department_ref: req.user?.department_ref[0],
        }

        const course = await courseService.createTrain(payload, session);
        const resDoc = responseHandler(201, 'Train Create Successfully', course);
        res.status(resDoc.statusCode).json(resDoc);
    })

    getAllTrain = catchError(async(req,res,next)=>{
        const { page, limit, order} = req.query;
        let query={
			page: page,
			limit: limit,
			order: order,
            semester_ref: req.semester?._id,
            department_ref: req.user?.department_ref[0],
		}
        const course = await courseService.getAllTrain(query);
        const resDoc = responseHandler(200, 'Train get Successfully',course);
        res.status(resDoc.statusCode).json(resDoc);
    })

    getAllActiveTrain = catchError(async(req,res,next)=>{
        const payload ={
            semester_ref: req.semester?._id,
            department_ref: req.user?.department_ref[0],
        }
        const course = await courseService.getAllActiveTrain(payload);
        const resDoc = responseHandler(200, 'Train get Successfully',course);
        res.status(resDoc.statusCode).json(resDoc);
    })

    getNotUseActiveTrain = catchError(async(req,res,next)=>{
        const payload ={
            semester_ref: req.semester?._id,
            department_ref: req.user?.department_ref[0],
        }
        const course = await courseService.getNotUseActiveTrain(payload);
        const resDoc = responseHandler(200, 'Train get Successfully',course);
        res.status(resDoc.statusCode).json(resDoc);
    })
    
    getSingleTrain = catchError(async(req,res,next)=>{
        const {id}=req.params;
        const course  = await courseService.getSingleTrain(id)
        const resDoc = responseHandler(200,'Train Get SuccessFully',course);
        res.status(resDoc.statusCode).json(resDoc);
    })

    updateTrain = catchError(async (req, res, next) => {
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
    
        const course = await courseService.updateTrain(payload , id);
        const resDoc = responseHandler(200,'Train update successfully');
        return res.status(201).json(resDoc);
    });

    deleteTrain = catchError(async (req, res, next) => {
        const {id}=req.params;
        const course  = await courseService.deleteTrain(id);
        const resDoc = responseHandler(200, 'Train get successfully');
        res.status(resDoc.statusCode).json(resDoc);
    });

    updateTrainStatus = catchError(async (req, res, next) => {
        const { id } = req.params;
        await courseService.updateTrainStatus(id, req.query);
        const resDoc = responseHandler(200, 'Train Update Status successfully');
        res.status(resDoc.statusCode).json(resDoc);
      });

}

export default new TrainController();