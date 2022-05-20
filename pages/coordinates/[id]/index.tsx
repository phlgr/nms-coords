import {
  Badge,
  Button,
  Card,
  Container,
  Group,
  Modal,
  Pagination,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { ObjectId } from "mongodb";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Activity, ArrowLeft } from "tabler-icons-react";
import clientPromise from "../../../lib/mongodb";
import { Coordinate } from "../../../types/coordinates";

type CoordinatePageProps = {
  coordinate: Coordinate;
};

const CoordinatePage = ({ coordinate }: CoordinatePageProps) => {
  const router = useRouter();
  const theme = useMantineTheme();
  const [currentActiveImage, setCurrentActiveImage] = useState(1);
  const [openend, setOpenend] = useState(false);
  return (
    <Container>
      <Modal
        opened={openend}
        size="90%"
        onClose={() => setOpenend(false)}
        title="Gallery"
        centered
      >
        <Container p="xl" style={{ height: "60vw", position: "relative" }}>
          <Image
            src={coordinate.images[currentActiveImage - 1]}
            layout="fill"
            objectFit="contain"
            alt=""
          />
        </Container>
        {coordinate.images.length > 1 && (
          <Group position="center">
            <Pagination
              page={currentActiveImage}
              onChange={setCurrentActiveImage}
              total={coordinate.images.length}
            />
          </Group>
        )}
      </Modal>

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
            onClick={() => setOpenend(true)}
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
