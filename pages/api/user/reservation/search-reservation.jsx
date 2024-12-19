"use server"

import prisma from "@/app/lib/prisma";

export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const { searchType, startDate, endDate, person } = req.body;
  
        if (!searchType || !startDate || !endDate || !person) {
          return res.status(400).json({ status: 0, message: "İlgili alanlar boş bırakılamaz!" });
        }
  
        let result;
        switch (searchType) {
          case 'caravan':
            result = await prisma.reservation.findMany({
              where: {
                startDate: { gte: new Date(startDate) },
                endDate: { lte: new Date(endDate) },
                person: { gte: person },
                caravan: { isNot: null }
              }
            });
            break;
          case 'caravanPark':
            result = await prisma.reservation.findMany({
              where: {
                startDate: { gte: new Date(startDate) },
                endDate: { lte: new Date(endDate) },
                person: { gte: person },
                caravanPark: { isNot: null }
              }
            });
            break;
          case 'tinyHouse':
            result = await prisma.reservation.findMany({
              where: {
                startDate: { gte: new Date(startDate) },
                endDate: { lte: new Date(endDate) },
                person: { gte: person },
                tinyHouse: { isNot: null }
              }
            });
            break;
          default:
            return res.status(400).json({ status: 0, message: 'Geçersiz arama türü' });
        }
  
        return res.status(200).json({ status: 1, data: result });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 0, message: 'Bir Hata Oluştu' });
      }
    } else {
      return res.status(405).json({ message: 'Yalnızca POST isteği için geçerlidir' });
    }
  }
  