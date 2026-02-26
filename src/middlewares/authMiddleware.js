import jwt from 'jsonwebtoken'
import User from '../models/authModel.js'

export const protect = async (req, res, next) => {
    let token;

    // Vérifier si le header Authorization commence par headers
    if(req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ){
        try {
            // Extriare le token
            // Bearer rgjrnhozsehnb
            token = req.headers.authorization.split(' ')[1]

            //verifier le token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Récupérer l'utilisateur correspondant
            req.user = await User.findById(decoded.id).select('-password')

            if (!req.user) {
                return res.status(401).json({message: 'Non autorisé, utilisateur introuvable'})
            }
            next()
        } catch (error) {
            console.error(error)
            return res.status(401).json({message: "Non autorisé, token invalide"})
        }
    }

    if (!token) {
        return res.status(401).json({message: "Non autorisé, pas de token fourni"})
    }
}