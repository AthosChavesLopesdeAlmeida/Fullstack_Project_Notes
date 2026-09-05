import { prisma } from "../lib/prisma";

// This endpoint serves the purpose of finding the user's credentials and data by his ID
// Even though the /auth enpoint does this (or could do), it's for authentication purposes.

export const meRepository = {
    findUserDataById (userId: string) {
        return  prisma.user.findUnique({
            where: { id: userId }
        })
    }
}