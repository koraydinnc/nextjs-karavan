import prisma from "@/app/lib/prisma"

export default async function handler(req,res) {
       const {id} = req.body

       if (req.method === 'DELETE') {

        if (!id) {
          return res.status(400).json({status: 0 , messsage: 'Kullanıcı ID Gereklidir'})
       }


         try {
             const user = await prisma.user.delete({
                where: {
                    id: id
                }
             })
                
             if (!user) {
               return res.status(400).json({status:0, message:'Kullanıcı Bulunamadı'})
             }
             return res.status(200).json({status:1,message:'Kullanıcı Başarıyla Silindi', data: user})
         } catch (error) {
            console.error(error)
            return res.status(500).json({status:0, message:'Bir Hata Oluştu'})
         }
        
       }
}