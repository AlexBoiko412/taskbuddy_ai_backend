import LoginResponseDTO from "../models/loginResponseDTO";
import LoginRequestDTO from "../models/loginRequestDTO";
import {hash, compare} from 'bcrypt'
import * as userData from '../data/userData';
import jwt from 'jsonwebtoken';
import RegisterRequestDTO from "../models/registerRequestDTO";
import RegisterResponseDTO from "../models/registerResponseDTO";

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

export async function login(loginRequestDTO: LoginRequestDTO): Promise<LoginResponseDTO> {
    const user = await userData.findUserByEmail(loginRequestDTO.email);

    if (!user || !(await compare(loginRequestDTO.password, user.passwordHash))) {
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: '48h',
    });

    return { token, username: user.username, email: user.email };
}

export async function register(loginRequestDTO: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    const passwordHash = await hash(loginRequestDTO.password, 10);
    const user = await userData.createUser({
        username: loginRequestDTO.username,
        email: loginRequestDTO.email,
        passwordHash,
        createdAt: new Date(),
    });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: '48h',
    });

    return {
        username: user.username,
        email: user.email,
        token
    };
}