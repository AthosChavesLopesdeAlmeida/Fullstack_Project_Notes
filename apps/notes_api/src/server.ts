import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.routes'
import notesRoutes from './routes/notes.routes'
import meRoutes from './routes/me.routes'
import cookieParser from 'cookie-parser';

const app = express()

app.use(cors({ 
    origin: process.env.FRONTEND_URL,
    credentials: true 
}))
app.use(cookieParser());
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/notes', notesRoutes)
app.use('/me', meRoutes)

const PORT = process.env.PORT || 3333
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
