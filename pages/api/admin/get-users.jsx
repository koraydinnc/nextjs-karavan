import prisma from "@/app/lib/prisma";

export default async function handler(req,res) {
    if (req.method === "GET") {
        try {
            const users = await prisma.user.findMany()
            

             return res.status(200).json({status:1, data: users})

        } catch (error) {
             console.error(error)
             return res.status(500).json({message:'Bir Hata oluştu'})
        }
        
    }
    else {
        res.setHeader("Allow", ["GET"]); 
        return res.status(405).end(`Method ${method} Not Allowed`);
    }

}