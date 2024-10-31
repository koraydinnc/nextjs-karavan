import prisma from "@/app/lib/prisma";
import jwt from "jsonwebtoken";

export default async function handler(req,res) {
    if (req.method === 'POST') {
         try {
            const { startDate, endDate, person, caravanparkId } = req.body;

            const authHeader = req.headers.authorization;
            const userToken = authHeader && authHeader.split(' ')[1]

            if (!userToken) {
                return res.status(401).json({ message: 'Lütfen Giriş Yapınız' });
            }

            const decodedToken = jwt.verify(userToken, process.env.JWT_SECRET)
            const userId = decodedToken.id;

            if (!userId) {
                return res.status(401).json({ message: 'Geçersiz token' });
            }

            const parsedStartDate = new Date(startDate)
            const parsedEndDate  = new Date(endDate)

            const reservationCaravanPark = await prisma.reservation.create({
                data: {
                    startDate: parsedStartDate,
                    endDate: parsedEndDate,
                    user: {
                        connect: { id: userId }
                    },
                    caravanPark: { connect: { id: caravanparkId } }, 
                    person: person, 
                },
            })
 

            return res.status(201).json({data:reservationCaravanPark, message:'Rezervasyon Başarıyla Oluşturulmuştur.', status:1});
              

         } catch (error) {
            console.error('Hata:', error);
            return res.status(500).json({ message: 'Rezervasyon oluşturulurken bir hata oluştu' });
         }
    }
    else {
        return res.status(405).json({ message: 'Yalnızca POST isteği kabul edilmektedir' });
    }
}