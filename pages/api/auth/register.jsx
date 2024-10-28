import prisma from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name,surname, email, password } = req.body;
    console.log("Incoming registration request:", req.body);

    if (!name || !email ||!surname|| !password) {
      return res.status(400).json({ message: 'name,  surname , email ve password alanları boş bırakılamaz.' });
    }

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ message: 'Bu email zaten kayıtlı.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          name: name,
          surname: surname,
          email,
          password: hashedPassword,
        },
      });

      return res.status(201).json({ 
        message: 'Kullanıcı başarıyla oluşturuldu.',
        user: { data: newUser }
      });
    } catch (error) {
      console.error('Registration error:', error); 
      return res.status(500).json({ message: 'Bir hata oluştu', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
