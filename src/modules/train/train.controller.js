import catchError from "../../middleware/errors/catchError.js";
import withTransaction from "../../middleware/transactions/withTransaction.js";
import responseHandler from "../../utils/responseHandler.js";
import trainService from "./train.service.js";

class TrainController {
    createTrain = withTransaction(async(req,res,next, session)=>{
        const payload = {
            name:req.body?.name,
            number:req.body?.number,
            station:req.body?.station,
            fareRatePerStop:req.body?.fareRatePerStop,
        }

        const train = await trainService.createTrain(payload, session);
        const resDoc = responseHandler(201, 'Train Create Successfully', train);
        res.status(resDoc.statusCode).json(resDoc);
    })

    getAllTrainPagination = catchError(async(req,res,next)=>{
        const { page, limit, order} = req.query;
        let query={
			page: page,
			limit: limit,
			order: order,
		}
        const train = await trainService.getAllTrainPagination(query);
        const resDoc = responseHandler(200, 'Train get Successfully',train);
        res.status(resDoc.statusCode).json(resDoc);
    })

    getAllTrain = catchError(async(req,res,next)=>{
        const train = await trainService.getAllTrain();
        const resDoc = responseHandler(200, 'Train get Successfully',train);
        res.status(resDoc.statusCode).json(resDoc);
    })

    
    getSingleTrain = catchError(async(req,res,next)=>{
        const {id}=req.params;
        const train  = await trainService.getSingleTrain(id)
        const resDoc = responseHandler(200,'Train Get SuccessFully',train);
        res.status(resDoc.statusCode).json(resDoc);
    })

    updateTrain = catchError(async (req, res, next) => {
        const payload = { 
            name:req.body?.name,
            number:req.body?.number,
            station:req.body?.station,
            fareRatePerStop:req.body?.fareRatePerStop,
        };    
        const {id}=req.params;
    
        const train = await trainService.updateTrain(payload , id);
        const resDoc = responseHandler(200,'Train update successfully');
        return res.status(201).json(resDoc);
    });

    deleteTrain = catchError(async (req, res, next) => {
        const {id}=req.params;
        const train  = await trainService.deleteTrain(id);
        const resDoc = responseHandler(200, 'Train get successfully');
        res.status(resDoc.statusCode).json(resDoc);
    });

    updateTrainStatus = catchError(async (req, res, next) => {
        const { id } = req.params;
        await trainService.updateTrainStatus(id, req.query);
        const resDoc = responseHandler(200, 'Train Update Status successfully');
        res.status(resDoc.statusCode).json(resDoc);
      });

}

export default new TrainController();