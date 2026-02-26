import jwt from 'jsonwebtoken'
import User from "../models/authModel.js"
// Fonction pour générer un token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

// FOnction pour enregistrer un utilisateur
export const registerUser = async (req, res) => {
    try {
        if(!req.body){
            return res.status(400).json({message: "Aucune donnée envoyé"})
        }
        const { email, password } = req.body

        if (!email || !password) {
            res.status(400)
            throw new Error("Veuillez renseigner tous les champs")
        }

        // Vérifier si l'utilisateur existe déjà
        const userExist = await User.findOne({email})

        if (userExist) {
            res.status(400)
            throw new Error("Cet utilisateur existe déjà")
        }
        
        // Créer l'utilisateur (le mdp est daja hasher)
        const user = await User.create({
            email,
            password
        })

        if (user){
            return res.status(201).json({
                _id: user._id,
                email: user.email,
                token: generateToken(user._id)
            })
        }
        res.status(400)
        throw new Error("Données utilisateur invalides");
    } catch (error) {
        console.error('Enregistrement impossible : ', error)
        return res.status(500).json({message: error.message})
    }
}

// Fonction pour se connecter en tant qu'Utilisateur.