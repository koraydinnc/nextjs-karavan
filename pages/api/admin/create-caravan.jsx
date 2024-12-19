import prisma from "@/app/lib/prisma";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { name, description, price, photos, city, district, person } = req.body;

            if (!name || !description || !price || !city || !district || !person) {
                return res.status(400).json({ message: 'Name, description, price, city, district fields are required' });
            }

            const caravan = await prisma.caravan.create({
                data: {
                    name,
                    description,
                    price: parseFloat(price),
                    city,
                    district,
                    photos: photos || [],
                    person
                }
            });

            return res.status(201).json({ status: 1, message: 'Caravan successfully created', data: caravan });
        } catch (error) {
            console.error('Error creating caravan:', error);
            return res.status(500).json({ status: 0, message: 'An error occurred' });
        }
    } else {
        res.status(405).json({ message: 'Only POST requests are supported' });
    }
}
