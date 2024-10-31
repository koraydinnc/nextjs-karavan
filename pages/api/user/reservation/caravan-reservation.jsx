import prisma from '@/app/lib/prisma';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { startDate, endDate, person, caravanId, userId } = req.body;
        try {
            const parsedStartDate = new Date(startDate);
            const parsedEndDate = new Date(endDate);

            const reservation = await prisma.reservation.create({
                data: {
                    startDate: parsedStartDate,
                    endDate: parsedEndDate,
                    user: {
                        connect: { id: userId }
                    },
                    caravan: { connect: { id: caravanId } }, 
                    person: person, 
                },
            });

            return res.status(201).json(reservation);
        } catch (error) {
            console.error('Hata:', error);
            return res.status(500).json({ message: 'Rezervasyon oluşturulurken bir hata oluştu' });
        }
    } else {
        return res.status(405).json({ message: 'Yalnızca POST isteği kabul edilmektedir' });
    }
}
