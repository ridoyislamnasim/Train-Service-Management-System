import catchError from "../../middleware/errors/catchError.js";
import withTransaction from "../../middleware/transactions/withTransaction.js";
import responseHandler from "../../utils/responseHandler.js";
import stationService from "./station.service.js";

class StationController {
    createStation = withTransaction(async(req,res,next, session)=>{
        const payload = {
            name:req.body?.name,
            city:req.body?.city,
            state:req.body?.state,
        }

        const station = await stationService.createStation(payload, session);
        const resDoc = responseHandler(201, 'Station Create Successfully', station);
        res.status(resDoc.statusCode).json(resDoc);
    })

    getAllStationPagination = catchError(async(req,res,next)=>{
        const { page, limit, order} = req.query;
        let query={
			page: page,
			limit: limit,
			order: order,
		}
        const station = await stationService.getAllStationPagination(query);
        const resDoc = responseHandler(200, 'Station get Successfully',station);
        res.status(resDoc.statusCode).json(resDoc);
    })

    getSingleStation = catchError(async(req,res,next)=>{
        const {id}=req.params;
        const station  = await stationService.getSingleStation(id)
        const resDoc = responseHandler(200,'Station Get SuccessFully',station);
        res.status(resDoc.statusCode).json(resDoc);
    })
    updateStation = catchError(async (req, res, next) => {
        const payload = { 
            name:req.body?.name,
            city:req.body?.city,
            state:req.body?.state,
        };    
        const {id}=req.params;
    
        const station = await stationService.updateStation(payload , id);
        const resDoc = responseHandler(200,'Station update successfully');
        return res.status(201).json(resDoc);
    });

    deleteStation = catchError(async (req, res, next) => {
        const {id}=req.params;
        const station  = await stationService.deleteStation(id);
        const resDoc = responseHandler(200, 'Station get successfully');
        res.status(resDoc.statusCode).json(resDoc);
    });



}

export default new StationController();