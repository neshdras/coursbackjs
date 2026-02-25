import express from 'express'

const app = express()

// définir une route de test pour l'acceuil /
app.get('/', (req, res) => {
    res.json({message: "L'app se lance !"})
})

export default app;
