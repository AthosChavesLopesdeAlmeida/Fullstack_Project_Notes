import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { userRepository } from "../repositories/user.repository";

const JWT_SECRET = process.env.JWT_SECRET!

export const authService = {
    async register (email: string, name: string, password: string) {
        const existing = await userRepository.findByEmail(email)
        if(existing) throw new Error('Email already registered')

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await userRepository.create({email, name, password: hashedPassword})

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })
        return { user: {id: user.id, name: user.name, email: user.email}, token }
    },

    async login (email: string, password: string) {
        const user = await userRepository.findByEmail(email)
        if (!user) throw new Error('Invalid credentials')

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) throw new Error('Invalid credentials')

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })
        return { user: {id: user.id, name: user.name, email: user.email}, token }
    },
    
    async delete (id: string, password: string) {
        const user = await userRepository.findById(id)
        if (!user) throw new Error('Invalid credentials')

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) throw new Error('Invalid credentials')

        await userRepository.delete(id)
    }
}
