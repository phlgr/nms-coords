import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const page = +(req.query.page as string) || 1;
    console.log(page);

    const step = 10;
    const client = await clientPromise;
    const collection = client.db("nms").collection("coordinates");
    const total = await collection.countDocuments();
    const results = await collection
      .find()
      .skip(step * (page - 1))
      .limit(step)
      .toArray();

    const totalPages = Math.ceil(total / step);

    res.status(200).json({
      totalPages: totalPages,
      currentPage: page,
      nextPage: page + 1 <= totalPages ? page + 1 : undefined,
      results,
    });
  }
};

export default handler;
