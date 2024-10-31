import prisma from "@/app/lib/prisma";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { name, description, price, photos } = req.body;

            if (!name || !description || !price || !photos) {
                 return res.status(400).json({message:'Name, description, price, photos alanları zorunludur'})
            }

            const newCaravanPark = await prisma.CaravanPark.create({
                data: {
                    name,
                    description,
                    price: parseFloat(price),
                    photos: photos ||[]
                }
            })

           return res.status(201).json({messsage:'Başarıyla Karavan Park Oluşturuldu', data: newCaravanPark, status:1})

        } catch (error) {
            console.error(error)
            return res.status(500).json({message:'Bir hata oluştu',status:0})
            
        }
    }
    else {
        res.status(405).json({ message: 'Sadece POST istekleri desteklenmektedir' });
    }
}