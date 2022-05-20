import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import { Coordinate } from "../../types/coordinates";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const page = +(req.query.page as string) || 1;

    const step = 10;
    const client = await clientPromise;
    const collection = client.db("nms").collection("coordinates");
    const total = await collection.countDocuments();
    const results = await collection
      .find()
      .skip(step * (page - 1))
      .limit(step)
      .toArray();

    const formattedResults: Coordinate[] = results.map((result) => {
      return {
        id: result._id.toString(),
        thumbnail: result.images[0],
        images: result.images,
        title: result.title,
        galaxy: result.galaxy,
        type: result.type,
        version: result.version,
        permalink: result.permalink,
      };
    });

    const totalPages = Math.ceil(total / step);

    res.status(200).json({
      totalPages: totalPages,
      currentPage: page,
      nextPage: page + 1 <= totalPages ? page + 1 : undefined,
      results: formattedResults,
    });
  }
};

export default handler;
