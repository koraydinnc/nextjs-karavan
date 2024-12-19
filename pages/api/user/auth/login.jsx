import prisma from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(400).json({ message: 'Kullanıcı Bulunamadı' });
      }

      const matchPassword = await bcrypt.compare(password, user.password);

      if (!matchPassword) {
        return res.status(400).json({ message: 'Yanlış Şifre!' });
      }

      const token = jwt.sign({ id: user.id, role: 'user' }, JWT_SECRET, { expiresIn: '1h' });

      res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; Max-Age=3600`);

      return res.status(200).json({ status: 1, message: 'Giriş Başarılı!', token, user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Bir hata oluştu', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
