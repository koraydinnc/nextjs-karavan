import prisma from "@/app/lib/prisma";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { name, description, price, photos } = req.body;

            if (!name || !description || !price) {
                return res.status(400).json({ message: 'Name, description, price alanları zorunludur' });
            }

            const caravan = await prisma.caravan.create({
                data: {
                    name,
                    description,
                    price: parseFloat(price),
                    photos: photos || []  
                }
            });

            return res.status(201).json({ status: 1, message: 'Karavan Başarıyla Oluşturuldu', data: caravan });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 0, message: 'Bir Hata Oluştu' });
        }
    } else {
        res.status(405).json({ message: 'Sadece POST istekleri desteklenmektedir' });
    }
}
