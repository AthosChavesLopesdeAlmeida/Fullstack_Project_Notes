import { meRepository } from "../repositories/me.repository";

export const meService = {
    async findUserDataById (userId: string) {
        const user = await meRepository.findUserDataById(userId)
        if (!user) throw new Error('Invalid credentials')
        
        return await meRepository.findUserDataById(userId)
    }
}