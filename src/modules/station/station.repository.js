import mongoose from "mongoose";
// import { StationSchema } from "../../models/index.js";
import BaseRepository from "../base/base.repository.js";
import pagination from "../../utils/pagination.js";
import withTransaction from "../../middleware/transactions/withTransaction.js";


class StationRepository extends BaseRepository {
    #model;
    constructor(model) {
        super(model)
        this.#model = model;
    }

    async createStation(payload, session) {
        const { level, term, course_name, course_code, batch_ref, semester_ref, department_ref } = payload;

        // Use the provided session for all database operations within the transaction
        const savedStations = [];
        for (let i = 0; i < course_name.length; i++) {
            const course = new this.#model({
                level: level,
                term: term,
                course_name: course_name[i],
                course_code: course_code[i],
                batch_ref: batch_ref,
                semester_ref: semester_ref,
                department_ref: department_ref
            });

            // Save the course to the database within the session
            const savedStation = await course.save({ session });
            console.log("Station created successfully:", savedStation);
            savedStations.push(savedStation);
        }

        return savedStations;

    }

    async updateStation(courseId, updatePayload) {
        const { level, term, course_name, course_code, batch_ref, semester_ref, department_ref } = payload;


        const savedStations = [];

        // Iterate over the course_name array
        for (let i = 0; i < course_name.length; i++) {
            const course = new this.#model({
                level: level,
                term: term,
                course_name: course_name[i],
                course_code: course_code[i],
                batch: batch
            });

            const savedStationPromise = course.save({ session });
            savedStations.push(savedStationPromise);
        }

        const savedStationsResults = await Promise.all(savedStations);

        const updatePromises = [];

        for (let i = 0; i < update_ids.length; i++) {
            const courseId = update_ids[i];
            const updatePayload = {
                course_name: update_course_name[i],
                course_code: update_course_code[i]
                // Add other fields to update if needed
            };

            const updatePromise = this.#model.StationUpdate(courseId, updatePayload)
                .then(updatedStation => {
                    console.log(`Station with ID ${courseId} updated successfully:`, updatedStation);
                })
                .catch(error => {
                    console.error(`Error updating course with ID ${courseId}:`, error);
                });
            updatePromises.push(updatePromise);
        }

        Promise.all(updatePromises)
            .then(() => {
                console.log('All update operations completed successfully');
            })
            .catch(error => {
                console.error('Error executing update operations:', error);
            });
    }

    async deleteStation(courseId) {
        // Your delete logic here
        try {
            const deletedStation = await this.#model.findByIdAndDelete(courseId);
            if (!deletedStation) {
                throw new Error('Station not found');
            }
            console.log('Station deleted successfully:', deletedStation);
            return deletedStation;
        } catch (error) {
            console.error('Error deleting course:', error);
            throw error;
        }
    }

    async getSingleStation(courseId) {
        // Your find single course logic here
        try {
            const foundStation = await this.#model.findById(courseId)
                .populate('batch_ref');
            if (!foundStation) {
                throw new Error('Station not found');
            }
            return foundStation;
        } catch (error) {
            console.error('Error finding course:', error);
            throw error;
        }
    }

    async getAllStation(query) {

        const { semester_ref, department_ref } = query;
        try {
            const course = await pagination(query, async (limit, offset, sortOrder) => {
                const coursesPromise = this.#model.find({
                    semester_ref: semester_ref,
                    department_ref: department_ref
                })
                    .sort({ level: 1, term: 1, 'batch_ref.batch': 1 }) // Sort by level, term, and batch_ref's batch
                    .skip(offset)
                    .limit(limit)
                    .populate('batch_ref')
                    .exec();
                const totalStationsPromise = this.#model.estimatedDocumentCount().exec();

                const [courses, totalStations] = await Promise.all([coursesPromise, totalStationsPromise]);

                return { doc: courses, totalDoc: totalStations };
            });
            return course;
        } catch (error) {
            console.error('Error finding all courses:', error);
            throw error;
        }
        // });
    }

    async getAllActiveStation(payload) {
        const { semester_ref, department_ref } = payload;
        const course = this.#model.find({
            semester_ref: semester_ref,
            department_ref: department_ref,
        })
            .sort({ level: 1, term: 1, 'batch_ref.batch': 1 })
            .populate('batch_ref')
            .exec();
        return course;

    }
    async getNotUseActiveStation(payload) {
        const { semester_ref, department_ref } = payload;
        const course = this.#model.find({
            subject_flag:0,
            semester_ref: semester_ref,
            department_ref: department_ref,
        })
            .sort({ level: 1, term: 1, 'batch_ref.batch': 1 })
            .populate('batch_ref')
            .exec();
        return course;

    }

}

export default new StationRepository();