import { Request, Response } from 'express';
import * as authService from '../services/authService';
import RegisterRequestDTO from "../models/registerRequestDTO";
import LoginRequestDTO from "../models/loginRequestDTO";
import LoginResponseDTO from "../models/loginResponseDTO";
import RegisterResponseDTO from "../models/registerResponseDTO";

export async function register(req: Request, res: Response) {
    try {
        const registerRequestDTO: RegisterRequestDTO = req.body;

        const registerResponseDTO: RegisterResponseDTO = await authService.register(registerRequestDTO);

        res.status(201).json(registerResponseDTO);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const loginRequestDTO: LoginRequestDTO = req.body;

        const loginResponseDTO: LoginResponseDTO = await authService.login(loginRequestDTO);

        res.json(loginResponseDTO);
    } catch (error) {
        res.status(401).json({ error: (error as Error).message });
    }
}