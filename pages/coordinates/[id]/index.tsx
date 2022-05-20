import { Card, Container } from "@mantine/core";
import { ObjectId } from "mongodb";
import { GetServerSideProps } from "next";
import Image from "next/image";
import clientPromise from "../../../lib/mongodb";
import { Coordinate } from "../../../types/coordinates";

type CoordinatePageProps = {
  coordinate: Coordinate;
};

const CoordinatePage = ({ coordinate }: CoordinatePageProps) => {
  return (
    <Container>
      <Card>
        <Card.Section>
          <Image
            src={coordinate.thumbnail}
            width={1000}
            height={600}
            objectFit="cover"
            alt=""
          />
        </Card.Section>
      </Card>
    </Container>
  );
};

export default CoordinatePage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const id = query.id as string;
    const client = await clientPromise;
    const db = client.db("nms");
    const collection = db.collection("coordinates");
    const coordinate = await collection.findOne({ _id: new ObjectId(id) });
    if (!coordinate) {
      throw new Error("Coordinate not found");
    }

    const formattedCoordinate: Coordinate = {
      id: coordinate._id.toString(),
      galaxy: coordinate.galaxy,
      thumbnail: coordinate.images[0],
      version: coordinate.version,
      images: coordinate.images,
      title: coordinate.title,
      type: coordinate.type,
    };

    return {
      props: {
        coordinate: formattedCoordinate,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { coordinate: null },
    };
  }
};
