import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
    {
        quote: {
            type: String,
            require: [true, "Veuillez ajouter le texte de la citation"]
        },
        author: {
            type: String,
            require: [true, "Veuillez renseigner l'auteur de la citation"]
        }
    }
)

const Quote = mongoose.model('Quote', quoteSchema)
export default Quote