import {
  Badge,
  Button,
  Card,
  Container,
  Group,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { ObjectId } from "mongodb";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Activity, ArrowLeft, GitMerge, Versions } from "tabler-icons-react";
import clientPromise from "../../../lib/mongodb";
import { Coordinate } from "../../../types/coordinates";

type CoordinatePageProps = {
  coordinate: Coordinate;
};

const CoordinatePage = ({ coordinate }: CoordinatePageProps) => {
  const router = useRouter();
  const theme = useMantineTheme();
  return (
    <Container>
      <Button
        variant="subtle"
        onClick={() => router.back()}
        style={{ marginBottom: theme.spacing.md }}
      >
        <ArrowLeft />
        Back to Home
      </Button>
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
        <Stack style={{ marginTop: theme.spacing.md }}>
          <Group position="apart">
            <Group>
              <Title order={3}>{coordinate.type}</Title>
              <Badge>{coordinate.galaxy}</Badge>
            </Group>
            <Badge>
              <Activity size={14} /> {coordinate.version}
            </Badge>
          </Group>
          <Text>{coordinate.title}</Text>
        </Stack>
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
