import mongoose from "mongoose";
// import { StationSchema } from "../../models/index.js";
import BaseRepository from "../base/base.repository.js";
import pagination from "../../utils/pagination.js";
import withTransaction from "../../middleware/transactions/withTransaction.js";
import { StationSchema } from "../../models/STATION/stationSchema.js";
import { NotFoundError } from "../../utils/errors.js";


class StationRepository extends BaseRepository {
    #model;
    constructor(model) {
        super(model)
        this.#model = model;
    }

    async createStation(payload, session) {
        const { name, state, city } = payload;
        if (!name ||!city ||!state) throw new Error('Name, city and state are required'); 
        const checkStation = await this.#model.findOne({ name });
        console.log('checkStation',checkStation);
        if (checkStation) throw new NotFoundError('Station already exist');
        
        const station = new this.#model({
            name: name,
            state: state,
            city: city
        });
        const savedStation = await station.save({ session });

        return savedStation;

    }
    async getAllStationPagination(query) {
        try {
            const station = await pagination(query, async (limit, offset, sortOrder) => {
                const stationsPromise = this.#model.find({
                })
                    .sort({})
                    .skip(offset)
                    .limit(limit)
                    .exec();
                const totalStationsPromise = this.#model.estimatedDocumentCount().exec();

                const [stations, totalStations] = await Promise.all([stationsPromise, totalStationsPromise]);

                return { doc: stations, totalDoc: totalStations };
            });
            return station;
        } catch (error) {
            console.error('Error finding all stations:', error);
            throw error;
        }
        // });
    }


    async getSingleStation(id) {
        try {
            const foundStation = await this.#model.findById(id);
            console.log('foundStation',foundStation);
            if (!foundStation) throw new NotFoundError('Station not found');
            return foundStation;
        } catch (error) {
            console.error('Error finding station:', error);
            throw error;
        }
    }

    async updateStation(payload, id) {
        const { name, city,state} = payload;
        if (!name ||!city ||!state) throw new Error('Name, city and state are required');
        const foundStation = await this.#model.findById(id);
        if (!foundStation) throw new NotFoundError('Station not found');
        const updatedStation = await this.#model.findByIdAndUpdate(id, {
            name: name,
            city: city,
            state: state
        }, { new: true });
        return updatedStation;   
    }
    async deleteStation(stationId) {
        try {
            const deletedStation = await this.#model.findByIdAndDelete(stationId);
            if (!deletedStation) throw new NotFoundError(`Station ${stationId} not found`);
            console.log('Station deleted successfully:', deletedStation);
            return deletedStation;
        } catch (error) {
            console.error('Error deleting station:', error);
            throw error;
        }
    }


}

export default new StationRepository(StationSchema);