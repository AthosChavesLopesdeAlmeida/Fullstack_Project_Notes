import { prisma } from "../lib/prisma";

export const userRepository = {
    findById (id: string) {
        return prisma.user.findUnique({ where: {id} })
    },
    findByEmail (email: string) {
        return prisma.user.findUnique({ where: {email} })
    },
    create (data: { email: string; name: string; password: string }) {
        return prisma.user.create({ data })
    },
    delete (id: string) {
        return prisma.user.delete({ where: {id} })
    }
}