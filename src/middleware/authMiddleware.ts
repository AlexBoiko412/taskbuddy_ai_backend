import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
    }
}

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({error: 'Unauthorized: invalid token or format'});
        return;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({error: 'Unauthorized: invalid token'});
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {id: string, email: string};

        req.user = {id: decoded.id, email: decoded.email}

        next();
    } catch (error) {
        res.status(401).json({error: 'Unauthorized: invalid token'});
        return;
    }

}