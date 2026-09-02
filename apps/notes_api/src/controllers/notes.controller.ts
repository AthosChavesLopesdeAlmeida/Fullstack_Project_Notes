import { Request, Response } from "express";
import { notesService } from "../services/notes.service";

export interface AuthRequest extends Request {
  userId?: string;
}

export const notesController = {
    async findByUserId (req: AuthRequest, res: Response) {
        const userId = req.userId!

        try {
            const notes = await notesService.findByUserId(userId)
            res.status(200).json({ notes })
        } catch (err) {
            res.status(404).json({ error: 'Unable to find notes' })
        }
    },

    async findUniqueById (req: AuthRequest, res: Response) {
        const { id } = req.params
        const userId = req.userId!

        try {
            if (!id || typeof id !== 'string') {
                return res.status(404).json({ error: 'Unable to find note' })
            }

            const note = await notesService.findUniqueById(userId, id)
            res.status(200).json({ note })
        } catch (err) {
            res.status(404).json({ error: 'Unable to find note' })
        }
    },

    async create (req: AuthRequest, res: Response) {
        const { title, content } = req.body
        const userId = req.userId!

        try {
            if (!title || ! content) {
                return res.status(400).json({ error: 'Unable to create note' })
            }

            const note = await notesService.create(title, content, userId)
            res.status(201).json({ note })
        } catch (err) {
            res.status(400).json({ error: 'Unable to create note' })
        }
    },

    async delete (req: AuthRequest, res: Response) {
        const { id } = req.body
        const userId = req.userId!

        try {
            if (!id) {
               return res.status(400).json({ error: 'Unable to delete note' })
            }

            await notesService.delete(id, userId)
            res.status(204).send()
        } catch (err) {
            res.status(400).json({ error: 'Unable to delete note' })
        }
    },

    async archive (req: AuthRequest, res: Response) {
        const { id, archived } = req.body
        const userId = req.userId!

        try {
            if (!id || archived === undefined || typeof archived !== 'boolean') {
               return res.status(400).json({ error: 'Unable to archive note' })
            }

            await notesService.archive(id, archived, userId)
            res.status(204).send()
        } catch (err) {
            res.status(400).json({ error: 'Unable to archive note' })
        }
    }
}