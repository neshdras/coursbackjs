import express from "express"
import { createQuote, getRandomQuote } from "../controllers/quoteController.js"

const router = express.Router()

// On va pouvoir gèrer les routes
//         la route, middleware(si use), controller
//     route, controller → la FONCTION qui vient du controller
// Une app qui fournit une phrase inspirante

router.get('/', getRandomQuote)

router.get('/', createQuote)

export default router