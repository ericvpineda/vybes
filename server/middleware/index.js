import jwt from "jsonwebtoken"

const isAuthenticated = async (req, res, next) => {

    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({message: "User is not authorized."});
        } 
        
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, user) => {
            if (err) {
                return res.status(403).json({message: "User is not authorized."});
            }
            req.user = user;
            next()
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }

} 

export {isAuthenticated}