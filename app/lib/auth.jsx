import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      })

      if (existingUser) {
        return res.status(400).json({ message: 'Bu email zaten kayıtlı' })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      })

      return res.status(201).json({ message: 'Kullanıcı başarıyla oluşturuldu', user: newUser })
    } catch (error) {
      return res.status(500).json({ message: 'Bir hata oluştu', error })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
