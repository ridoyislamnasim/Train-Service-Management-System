import mongoose from "mongoose";
// import { TicketSchema } from "../../models/index.js";
import BaseRepository from "../base/base.repository.js";
import pagination from "../../utils/pagination.js";
import withTransaction from "../../middleware/transactions/withTransaction.js";


class TicketRepository extends BaseRepository {
    #model;
    constructor(model) {
        super(model)
        this.#model = model;
    }

    async createTicket(payload, session) {
        const { level, term, course_name, course_code, batch_ref, semester_ref, department_ref } = payload;

        // Use the provided session for all database operations within the transaction
        const savedTickets = [];
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
            const savedTicket = await course.save({ session });
            console.log("Ticket created successfully:", savedTicket);
            savedTickets.push(savedTicket);
        }

        return savedTickets;

    }

    async updateTicket(courseId, updatePayload) {
        const { level, term, course_name, course_code, batch_ref, semester_ref, department_ref } = payload;


        const savedTickets = [];

        // Iterate over the course_name array
        for (let i = 0; i < course_name.length; i++) {
            const course = new this.#model({
                level: level,
                term: term,
                course_name: course_name[i],
                course_code: course_code[i],
                batch: batch
            });

            const savedTicketPromise = course.save({ session });
            savedTickets.push(savedTicketPromise);
        }

        const savedTicketsResults = await Promise.all(savedTickets);

        const updatePromises = [];

        for (let i = 0; i < update_ids.length; i++) {
            const courseId = update_ids[i];
            const updatePayload = {
                course_name: update_course_name[i],
                course_code: update_course_code[i]
                // Add other fields to update if needed
            };

            const updatePromise = this.#model.TicketUpdate(courseId, updatePayload)
                .then(updatedTicket => {
                    console.log(`Ticket with ID ${courseId} updated successfully:`, updatedTicket);
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

    async deleteTicket(courseId) {
        // Your delete logic here
        try {
            const deletedTicket = await this.#model.findByIdAndDelete(courseId);
            if (!deletedTicket) {
                throw new Error('Ticket not found');
            }
            console.log('Ticket deleted successfully:', deletedTicket);
            return deletedTicket;
        } catch (error) {
            console.error('Error deleting course:', error);
            throw error;
        }
    }

    async getSingleTicket(courseId) {
        // Your find single course logic here
        try {
            const foundTicket = await this.#model.findById(courseId)
                .populate('batch_ref');
            if (!foundTicket) {
                throw new Error('Ticket not found');
            }
            return foundTicket;
        } catch (error) {
            console.error('Error finding course:', error);
            throw error;
        }
    }

    async getAllTicket(query) {

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
                const totalTicketsPromise = this.#model.estimatedDocumentCount().exec();

                const [courses, totalTickets] = await Promise.all([coursesPromise, totalTicketsPromise]);

                return { doc: courses, totalDoc: totalTickets };
            });
            return course;
        } catch (error) {
            console.error('Error finding all courses:', error);
            throw error;
        }
        // });
    }

    async getAllActiveTicket(payload) {
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
    async getNotUseActiveTicket(payload) {
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

export default new TicketRepository();