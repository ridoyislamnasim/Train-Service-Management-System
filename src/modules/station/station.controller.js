import catchError from "../../middleware/errors/catchError.js";
import withTransaction from "../../middleware/transactions/withTransaction.js";
import responseHandler from "../../utils/responseHandler.js";
import courseService from "./station.service.js";

class StationController {
    createStation = withTransaction(async(req,res,next, session)=>{
        const payload = {
            level:req.body?.level,
            term:req.body?.term,
            course_name:req.body?.course_name,
            course_code:req.body?.course_code,
            batch_ref:req.body?.batch_ref,
            semester_ref: req.semester?._id,
            department_ref: req.user?.department_ref[0],
        }

        const course = await courseService.createStation(payload, session);
        const resDoc = responseHandler(201, 'Station Create Successfully', course);
        res.status(resDoc.statusCode).json(resDoc);
    })

    getAllStation = catchError(async(req,res,next)=>{
        const { page, limit, order} = req.query;
        let query={
			page: page,
			limit: limit,
			order: order,
            semester_ref: req.semester?._id,
            department_ref: req.user?.department_ref[0],
		}
        const course = await courseService.getAllStation(query);
        const resDoc = responseHandler(200, 'Station get Successfully',course);
        res.status(resDoc.statusCode).json(resDoc);
    })

    getAllActiveStation = catchError(async(req,res,next)=>{
        const payload ={
            semester_ref: req.semester?._id,
            department_ref: req.user?.department_ref[0],
        }
        const course = await courseService.getAllActiveStation(payload);
        const resDoc = responseHandler(200, 'Station get Successfully',course);
        res.status(resDoc.statusCode).json(resDoc);
    })

    getNotUseActiveStation = catchError(async(req,res,next)=>{
        const payload ={
            semester_ref: req.semester?._id,
            department_ref: req.user?.department_ref[0],
        }
        const course = await courseService.getNotUseActiveStation(payload);
        const resDoc = responseHandler(200, 'Station get Successfully',course);
        res.status(resDoc.statusCode).json(resDoc);
    })
    
    getSingleStation = catchError(async(req,res,next)=>{
        const {id}=req.params;
        const course  = await courseService.getSingleStation(id)
        const resDoc = responseHandler(200,'Station Get SuccessFully',course);
        res.status(resDoc.statusCode).json(resDoc);
    })

    updateStation = catchError(async (req, res, next) => {
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
    
        const course = await courseService.updateStation(payload , id);
        const resDoc = responseHandler(200,'Station update successfully');
        return res.status(201).json(resDoc);
    });

    deleteStation = catchError(async (req, res, next) => {
        const {id}=req.params;
        const course  = await courseService.deleteStation(id);
        const resDoc = responseHandler(200, 'Station get successfully');
        res.status(resDoc.statusCode).json(resDoc);
    });

    updateStationStatus = catchError(async (req, res, next) => {
        const { id } = req.params;
        await courseService.updateStationStatus(id, req.query);
        const resDoc = responseHandler(200, 'Station Update Status successfully');
        res.status(resDoc.statusCode).json(resDoc);
      });

}

export default new StationController();