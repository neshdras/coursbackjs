import express from "express"
import { createQuote, deleteQuote, getAllQuotes, getRandomQuote, updateQuote } from "../controllers/quoteController.js"

const router = express.Router()

// On va pouvoir gèrer les routes
//         la route, middleware(si use), controller
//     route, controller → la FONCTION qui vient du controller
// Une app qui fournit une phrase inspirante

router.get('/', getRandomQuote)

router.get('/all', getAllQuotes)

router.post('/', createQuote)

router.delete('/:id',deleteQuote)

router.put('/:id', updateQuote)

export default router