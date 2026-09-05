import { Request, Response } from "express";
import { meService } from "../services/me.service";

export interface AuthRequest extends Request {
  userId?: string;
}


export const meController = {
    async findUserDataById (req: AuthRequest, res: Response) {
        const id = req.userId!

        try {
            const userData = await meService.findUserDataById(id)
            res.status(200).json({ userData })
        } catch (err) {
            res.status(404).json({error: 'Unable to fetch your data'})
        }
    }
}