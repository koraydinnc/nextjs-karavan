import prisma from "@/app/lib/prisma";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const list = await prisma.caravan.findMany(); 
      res.status(200).json(list); 
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
