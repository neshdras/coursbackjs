import express from 'express'
import dotenv from 'dotenv'
import quoteRoute from "./routes/quoteRoute.js";
import authRoute from "./routes/authRoute.js";
import cors from 'cors'
dotenv.config()

const app = express()

//permet de gérer l'acceptation des CORS
app.use(cors())

//Body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// On defini les ROUTES API
app.use('/api/auth', authRoute)
app.use('/api/quote', quoteRoute)

// définir une route de test pour l'acceuil /
app.get('/', (req, res) => {
    res.json({message: "L'app se lance !"})
})



export default app;
