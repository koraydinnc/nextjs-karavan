import jwt from 'jsonwebtoken'

const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key'

export function verifyToken(token, role) {
  try {
    const decoded = jwt.verify(token, secretKey)
    return decoded.role === role
  } catch (error) {
    console.error('Token doğrulama hatası:', error)
    return false
  }
}
