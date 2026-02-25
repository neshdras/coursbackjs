import Quote from "../models/quoteModel.js"

const defaultQuotes = [
    {quote: "Le succès est de passer d'échec en échec sans perdre son enthousiasme.", author: "A"},
    {quote: "Il n'y a qu'une façcon d'échouer, c'est d'abandonner avant d'avoir réussi.", author: "A"},
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
        console.error("Erreur de quote : " .error)
    }
}

export const createQuote = async(req, res)=>{
    console/log('vljsnqg')
}