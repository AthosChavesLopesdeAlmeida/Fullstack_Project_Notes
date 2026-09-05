import { meRepository } from "../repositories/me.repository";

export const meService = {
    async findUserDataById (id: string) {
        const user = await meRepository.findUserDataById(id)
        if (!user) throw new Error('Invalid credentials')
        
        return await meRepository.findUserDataById(id)
    }
}