import Quote from "../models/quoteModel.js"
import { GoogleGenAI } from "@google/genai";
import {z} from 'zod'

const defaultQuotes = [
    {quote: "Le succès est de passer d'échec en échec sans perdre son enthousiasme.", author: "A"},
    {quote: "Il n'y a qu'une façon d'échouer, c'est d'abandonner avant d'avoir réussi.", author: "Georges Clemenceau"},
    {quote: "L'avenir n'appartient à ceux qui croient à la beauté de leurs rêves.", author: "A"},
    {quote: "La vie, c'est comme une bicyclette, il faut avancer pour ne pas perdre l'équilibre", author: "A"}
]

export const getRandomQuote = async (req, res) =>{
    try {
        // countDocuments() permet de compter le nombre d'entrée dans la bdd
        const count = await Quote.countDocuments()

        // Si la BDD est vide, on prend une phrase au hasard depuis le tableau qui est enregistré en dur
        if (count ===0) {
            const randomIndex = Math.floor(Math.random()* defaultQuotes.length)
            return res.status(200).json(defaultQuotes[randomIndex])           
        }

        // Sinon récupérer aléatoirement depuis MangoDB
        const random = Math.floor(Math.random()*count)
        const quote = await Quote.findOne().skip(random)
        res.status(200).json(quote)

    } catch (error) {
        console.error("Erreur de quote : " , error)
    }
}

export const getAllQuotes = async (req, res) => {
    try {
        const quotes = await Quote.find({})
        res.status(200).json(quotes)
    } catch (error) {
        console.error("Erreur de récupération", error)
        res.status(500).json({message: "Erreur de récupération "})
    }
}

export const createQuote = async(req, res)=>{
    try {
        const {quote, author} = req.body

        if(!quote || !author){
            res.status(400)
            throw new Error("Veuillez fournir la citation et l'auteur")
        }
        const quoteRegistered = await Quote.create({quote, author})
        res.status(201).json(quoteRegistered)
    } catch (error) {
        console.error("Erreur d'enregistrement : ", error)
        res.status(500).json({message: error.message})
    }
}

export const deleteQuote = async(req, res)=>{
    try {
        // On recupere l'id des parametres de l'url
        const quote = await Quote.findById(req.params.id)

        if (!quote) {
            res.status(404)
            throw new Error("Citation non trouvée")
        }
        await quote.deleteOne()
        res.status(200).json({message: "Citation supprimé"})
    } catch (error) {
        console.error("Erreur de suppression : ", error)
        res.status(500).json({message: error.message})
    }
}

export const updateQuote = async (req, res)=>{
    try {
        const quote = await Quote.findById(req.params.id)
        
        if (!quote) {
            res.status(404)
            throw new Error("Citation non trouvée")
        }
        const updatedQuote = await Quote.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true}
        )

        res.status(200).json(updatedQuote)

    } catch (error) {
        console.error("Erreur lors de la modification : ", error)
        res.status(500).json({message: error.message})
    }
}

export const getAiQuote = async (req, res) => {
    try {
        const ai = new GoogleGenAI({apiKey: process.env.GEMINI_AI_KEY})
        
        const quoteSchema = z.object({
            quote: z.string(),
            author: z.string()
        })
        const req = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: "Donne moi une citation en français",
            config:{
                responseMimeType: "application/json",
                responseJsonSchema: z.toJSONSchema(quoteSchema)
            }
        })

        //Text brut retourner par Gemini
        const jsonText = req.text

        //on convertit en json
        const parsed = JSON.parse(jsonText)

        // Validation avec Zod
        const validated = quoteSchema.parse(parsed)

        res.json(validated)

        
    } catch (error) {
        console.error("Erreur lors de la modification : ", error)
        res.status(500).json({message: error.message})
    }
}