import express from 'express'
import dotenv from 'dotenv'
import quoteRoutes from "./routes/quoteRoute.js";

dotenv.config()

const app = express()

//Body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// On defini les ROUTES API
app.use('/api/quote', quoteRoutes)

// définir une route de test pour l'acceuil /
app.get('/', (req, res) => {
    res.json({message: "L'app se lance !"})
})



export default app;
