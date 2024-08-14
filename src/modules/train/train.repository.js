import mongoose from "mongoose";
// import { TrainSchema } from "../../models/index.js";
import BaseRepository from "../base/base.repository.js";
import pagination from "../../utils/pagination.js";
import withTransaction from "../../middleware/transactions/withTransaction.js";
import { TrainSchema } from "../../models/index.js";


class TrainRepository extends BaseRepository {
    #model;
    constructor(model) {
        super(model)
        this.#model = model;
    }

    async createTrain(payload, session) {
        const { name,number,station,fareRatePerStop } = payload;
        console.log('payload',payload);
        const stops = [];
        const stations = JSON.parse(station);
        for (const station of stations) {
            const stop = {
                station: station.id,
                order: stations.indexOf(station) + 1
            };
            stops.push(stop);  
        }

        console.log('stops',stops);
        const train = new this.#model({
            name: name,
            number: number,
            stops: stops,
            fareRatePerStop: fareRatePerStop,
            // daysOfOperation: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        });
        const savedTrain = await train.save({ session });
        return savedTrain;
    }

    async updateTrain(payload , id) {
        const { name,number,station,fareRatePerStop } = payload;
        console.log('payload',payload);
        const stops = [];
        const stations = JSON.parse(station);
        for (const station of stations) {
            const stop = {
                station: station.id,
                order: stations.indexOf(station) + 1
            };
            stops.push(stop);  
        }
    }

    async deleteTrain(id) {
        try {
            const deletedTrain = await this.#model.findByIdAndDelete(id);
            if (!deletedTrain) {
                throw new Error('Train not found');
            }
            console.log('Train deleted successfully:', deletedTrain);
            return deletedTrain;
        } catch (error) {
            console.error('Error deleting train:', error);
            throw error;
        }
    }

    async getSingleTrain(id) {
        try {
            const foundTrain = await this.#model.findById(id)
                // .populate('batch_ref');
            if (!foundTrain) {
                throw new Error('Train not found');
            }
            return foundTrain;
        } catch (error) {
            console.error('Error finding train:', error);
            throw error;
        }
    }

    async getAllTrainPagination(query) {
        try {
            const train = await pagination(query, async (limit, offset, sortOrder) => {
                const trainPromise = this.#model.find({})
                    .sort({ }) 
                    .skip(offset)
                    .limit(limit)
                    // .populate('batch_ref')
                    .exec();
                  
                const totalTrainsPromise = this.#model.estimatedDocumentCount().exec();
                const [train, totalTrains] = await Promise.all([trainPromise, totalTrainsPromise]);
                return { doc: train, totalDoc: totalTrains };
            });
            return train;
        } catch (error) {
            console.error('Error finding all train:', error);
            throw error;
        }
        // });
    }

    async getAllTrain() {
        const train = this.#model.find({
        })
            .sort({  })
            // .populate('batch_ref')
            .exec();
        return train;

    }


}

export default new TrainRepository(TrainSchema);