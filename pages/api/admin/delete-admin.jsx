import prisma from "@/app/lib/prisma";

export default async function handler(req, res) {
    const { id } = req.body;

    if (req.method === 'DELETE') {
        if (!id) {
            return res.status(400).json({ status: 0, message: 'Kullanıcı ID Gereklidir' });
        }

        try {
            const admin = await prisma.admin.delete({
                where: {
                    id: id,
                },
            });
            return res.status(200).json({ status: 1, message: 'Admin Başarıyla Silindi', data: admin });
        } catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).json({ status: 0, message: 'Admin bulunamadı' });
            }
            console.error(error);
            return res.status(500).json({ message: 'Bir hata oluştu', status: 0 });
        }
    } else {
        return res.status(405).json({ status: 0, message: 'Method not allowed' });
    }
}
