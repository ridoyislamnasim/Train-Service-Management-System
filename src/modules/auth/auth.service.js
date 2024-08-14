import { NotFoundError } from '../../utils/errors.js';
import BaseService from '../base/base.service.js';
import bcrypt from "bcryptjs";
import teacherRepository from '../teacher/teacher.repository.js';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt.js';
import authRepository from './auth.repository.js';

class AuthService extends BaseService {
    #repository;
    #teacherRepository;
    constructor(repository, teacherRepository, serviceName) {
        super(repository, serviceName);
        this.#repository = repository;
        this.#teacherRepository = teacherRepository;
    }

    async createAuth(payload, files, session) {
        const { email, password, teacher_id } = payload;
        const authTeacher = await this.#teacherRepository.getAuthByEmailOrTeacherId(email, teacher_id);
        if (!authTeacher) throw new NotFoundError('unauthorized access');
        console.log(authTeacher)
        console.log(password)
        console.log(authTeacher.password)
        // check authTeacher password to match hash current password
        const isPasswordMatch = await bcrypt.compare(password, authTeacher.password);
        if (!isPasswordMatch) throw new NotFoundError('unauthorized access');
        const user_info_encrypted = {
            id: authTeacher._id || null,
            name: authTeacher.user_name || null,
            email: authTeacher.email || null,
            role: authTeacher.role || null,
            image: authTeacher.image || null,
            department_ref: authTeacher.department_ref || null,
        };

        const accessToken = generateAccessToken({ userInfo: { user_info_encrypted } });
        const refreshToken = generateRefreshToken({ userInfo: { user_info_encrypted } });

        return {
            accessToken: `Bearer ${accessToken}`,
            refreshToken: `Bearer ${refreshToken}`,
            user: user_info_encrypted,
        };
    }


}

export default new AuthService(authRepository, teacherRepository, 'auth');
