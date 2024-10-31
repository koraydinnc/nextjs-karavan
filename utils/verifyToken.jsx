import jwt from 'jsonwebtoken';

export function verifyToken(token, role) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        return decoded.role === role; 
    } catch (error) {
        return false;
    }
}
