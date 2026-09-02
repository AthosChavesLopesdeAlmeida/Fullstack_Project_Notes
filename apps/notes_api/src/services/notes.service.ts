import { notesRepository } from "../repositories/notes.repository";
import { userRepository } from "../repositories/user.repository";

export const notesService = {
    async findByUserId (userId: string) {
        const user = await userRepository.findById(userId)
        if (!user) throw new Error('Invalid credentials')
        
        const notes = await notesRepository.findByUserId(userId)
        return { notes }
    },

    async findUniqueById (userId: string, id: string) {
        const user = await userRepository.findById(userId)
        if (!user) throw new Error('Invalid credentials') 

        const note = await notesRepository.findUniqueById(userId, id)
        if (!note) throw new Error('Note not found')

        return { note }
    },

    async create (title: string, content: string, userId: string) {
        const user = await userRepository.findById(userId)
        if (!user) throw new Error('Invalid credentials')

        const note = await notesRepository.create({title, content, userId})
        return { note }
    },

    async delete (id: string, userId: string) {
        const user = await userRepository.findById(userId)
        if (!user) throw new Error('Invalid credentials')
            
        await notesRepository.delete(id, userId)
    },

    async archive (id: string, archived: boolean, userId: string) {
        const user = await userRepository.findById(userId)
        if (!user) throw new Error('Invalid credentials')     
        
        const note = await notesRepository.findUniqueById(userId, id)
        if (!note) throw new Error('Note not found')

        await notesRepository.archive(id, archived, userId)
    }
}