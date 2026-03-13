import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'

import taskRoutes from './routes/taskRoutes'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/tasks', taskRoutes)
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    })
})
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    })
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})