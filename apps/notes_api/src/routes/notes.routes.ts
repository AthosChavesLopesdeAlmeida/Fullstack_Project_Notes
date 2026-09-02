import { notesController } from "../controllers/notes.controller";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router()

// Usamos, por exemplo 'GET notes/:id', especificando sempre o método, já que não uso nomes específicos para cada rota

router.get('/:id', authMiddleware, notesController.findUniqueById)
router.get('/', authMiddleware, notesController.findByUserId)

router.post('/', authMiddleware, notesController.create)

router.delete('/:id', authMiddleware, notesController.delete)

router.patch('/:id/archive', authMiddleware, notesController.archive)

export default router