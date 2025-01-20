declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = "ababaabab";

export const authMiddleware = async(req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.headers['authorization']?.startsWith('Bearer ') ? req.headers['authorization'].split(' ')[1] : undefined;

    if (!token) {
        return res.status(401).json({
            message: "Access Denied: No Token Provided" 
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        
        req.userId = decoded.userId;
        next();
    } 
    catch (error) {
        return res.status(403).json({ 
            message: "Invalid Token" 
        });
    }
};
