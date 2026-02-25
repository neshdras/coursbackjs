import process from 'process'
import app from './src/app.js'
import connectDB from './src/config/db.js'

// Connection à la BDD MongoDB
connectDB()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`)
})