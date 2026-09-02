import { prisma } from "../lib/prisma";

export const notesRepository = {
    findByUserId (userId: string) {
        return prisma.note.findMany({ where: { userId: userId } })
    },

    findUniqueById (userId: string, id: string) {
        return prisma.note.findUnique({ where: { userId: userId, id: id } })
    },

    create (data: { title: string, content: string, userId: string }) {
        return prisma.note.create({ data })
    },

    delete (id: string, userId: string) {
        return prisma.note.delete({ where:{
            id: id,
            userId: userId
        } })
    },

    archive (id: string, archived: boolean, userId: string) {
        return prisma.note.update({
            where: { id: id, userId: userId },
            data: { archived }
        })
    }
}