import mongoose from "mongoose";
// import { TrainSchema } from "../../models/index.js";
import BaseRepository from "../base/base.repository.js";
import pagination from "../../utils/pagination.js";
import withTransaction from "../../middleware/transactions/withTransaction.js";


class TrainRepository extends BaseRepository {
    #model;
    constructor(model) {
        super(model)
        this.#model = model;
    }

    async createTrain(payload, session) {
        const { level, term, course_name, course_code, batch_ref, semester_ref, department_ref } = payload;

        // Use the provided session for all database operations within the transaction
        const savedTrains = [];
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
            const savedTrain = await course.save({ session });
            console.log("Train created successfully:", savedTrain);
            savedTrains.push(savedTrain);
        }

        return savedTrains;

    }

    async updateTrain(courseId, updatePayload) {
        const { level, term, course_name, course_code, batch_ref, semester_ref, department_ref } = payload;


        const savedTrains = [];

        // Iterate over the course_name array
        for (let i = 0; i < course_name.length; i++) {
            const course = new this.#model({
                level: level,
                term: term,
                course_name: course_name[i],
                course_code: course_code[i],
                batch: batch
            });

            const savedTrainPromise = course.save({ session });
            savedTrains.push(savedTrainPromise);
        }

        const savedTrainsResults = await Promise.all(savedTrains);

        const updatePromises = [];

        for (let i = 0; i < update_ids.length; i++) {
            const courseId = update_ids[i];
            const updatePayload = {
                course_name: update_course_name[i],
                course_code: update_course_code[i]
                // Add other fields to update if needed
            };

            const updatePromise = this.#model.TrainUpdate(courseId, updatePayload)
                .then(updatedTrain => {
                    console.log(`Train with ID ${courseId} updated successfully:`, updatedTrain);
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

    async deleteTrain(courseId) {
        // Your delete logic here
        try {
            const deletedTrain = await this.#model.findByIdAndDelete(courseId);
            if (!deletedTrain) {
                throw new Error('Train not found');
            }
            console.log('Train deleted successfully:', deletedTrain);
            return deletedTrain;
        } catch (error) {
            console.error('Error deleting course:', error);
            throw error;
        }
    }

    async getSingleTrain(courseId) {
        // Your find single course logic here
        try {
            const foundTrain = await this.#model.findById(courseId)
                .populate('batch_ref');
            if (!foundTrain) {
                throw new Error('Train not found');
            }
            return foundTrain;
        } catch (error) {
            console.error('Error finding course:', error);
            throw error;
        }
    }

    async getAllTrain(query) {

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
                const totalTrainsPromise = this.#model.estimatedDocumentCount().exec();

                const [courses, totalTrains] = await Promise.all([coursesPromise, totalTrainsPromise]);

                return { doc: courses, totalDoc: totalTrains };
            });
            return course;
        } catch (error) {
            console.error('Error finding all courses:', error);
            throw error;
        }
        // });
    }

    async getAllActiveTrain(payload) {
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
    async getNotUseActiveTrain(payload) {
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

export default new TrainRepository();