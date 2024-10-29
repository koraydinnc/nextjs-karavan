import prisma from "@/app/lib/prisma"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 


const JWT_SECRET = process.env.JWT_SECRET; 


export default async function handler(req,res) {
    
    const {email, password} = req.body
     
    if (req.method === 'POST') {
         if (!email ||!password) {
             return res.status(400).json({status:1, message:'Email ve Password Alanları Zorunludur!'})
         }

         try {
             
             const admin = await prisma.admin.findUnique({
                       where: {
                        email: email 
                       }
             })

             if (!admin) {
                 return res.status(400).json({status:0 , message:'Admin Bulunamadı!'})
             }

             const matchPassword =  bcrypt.compare(password, admin.password)

             if (!matchPassword) {
                  return res.status(400).json({status:0, message:'Yanlış Şifre!'})
             }

             const token  = jwt.sign({adminId: admin.id, email: admin.email}, JWT_SECRET, {expiresIn:'1h'})
            
             return res.status(200).json({ status: 1, message: 'Giriş Başarılı!', token, admin:admin });

         } catch (error) {
             console.error(error)
             return res.status(500).json({status:0, message:'Bir Hata Oluştu'})
         }
      }
}