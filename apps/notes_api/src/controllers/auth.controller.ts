import { Request, Response } from "express";
import { authService } from "../services/auth.service";

export interface AuthRequest extends Request {
  userId?: string;
}


export const authController = {
    async register (req: Request, res: Response) {
        const { email, name, password } = req.body

        try {
            const { token, user } = await authService.register(email, name, password)

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 1000 * 60 * 60 * 24 * 7,
                path: '/'
            })

            res.json({user: { id: user.id, email: user.email }})
        } catch (err) {
            res.status(401).json({ error: 'Invalid credentials' })
        }
    },

    async login (req: Request, res: Response) {
        const { email, password } = req.body

        try {
            const { token, user } = await authService.login(email, password)

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 1000 * 60 * 60 * 24 * 7,
                path: '/'
            })

            res.json({user: { id: user.id, email: user.email }})
        } catch (err) {
            res.status(401).json({ error: 'Invalid credentials' })
        }
    },

    async delete (req: AuthRequest, res: Response) {
        const { password } = req.body
        const userId = req.userId! 

        try {
            await authService.delete(userId, password);

            res.clearCookie('token', { path: '/' });
            res.status(204).send();
        } catch (err) {
            res.status(401).json({ error: 'User not found' })
        }
    },

    async logout(req: Request, res: Response) {
        res.clearCookie('token', { path: '/' });
        res.json({ message: 'Logout realizado' });
    }
}