import jwt from 'jsonwebtoken';

export function verifyToken(token, role) {
  try {
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET environment variable is missing');
      return false;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded.role === role;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
}
