import prisma from "@/app/lib/prisma";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { type, itemId, startDate, endDate, person, userId } = req.body;

            if (!['caravan', 'caravanPark', 'tinyHouse'].includes(type)) {
                return res.status(400).json({ status: 0, message: 'Geçersiz nesne türü' });
            }

            const reservationData = {
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                person: person,
                user: { connect: { id: userId } },
            };

            if (type === 'caravan') {
                reservationData.caravan = { connect: { id: itemId } };
            } else if (type === 'caravanPark') {
                reservationData.caravanPark = { connect: { id: itemId } };
            } else if (type === 'tinyHouse') {
                reservationData.tinyHouse = { connect: { id: itemId } };
            }

            const reservation = await prisma.reservation.create({
                data: reservationData,
            });

            return res.status(201).json({ status: 1, data: reservation });
        } catch (error) {
            console.error('Hata:', error);
            return res.status(500).json({ status: 0, message: 'Rezervasyon oluşturulurken bir hata oluştu' });
        }
    } else {
        return res.status(405).json({ message: 'Yalnızca POST isteği için geçerlidir' });
    }
}
