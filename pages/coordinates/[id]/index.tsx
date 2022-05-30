/* eslint-disable @next/next/no-img-element */
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
import { ObjectId } from "mongodb";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { ArrowLeft, ExternalLink } from "tabler-icons-react";
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
        size="100%"
        opened={openend}
        onClose={() => setOpenend(false)}
        title="Gallery"
      >
        <img
          style={{
            objectFit: "contain",
            width: "100%",
            maxHeight: "80vh",
            borderRadius: theme.radius.sm,
          }}
          src={coordinate.images[currentActiveImage - 1]}
          alt=""
        />

        {coordinate.images.length > 1 && (
          <Group
            position="center"
            style={{ zIndex: 1, marginTop: theme.spacing.md }}
          >
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
          <Group position="apart" style={{ textTransform: "capitalize" }}>
            <Group>
              <Title order={2}>{coordinate.type}</Title>
              <Badge>
                {coordinate.sub_types[0]
                  ? coordinate.sub_types[0]
                  : coordinate.galaxy}
              </Badge>
            </Group>
            <Group>
              <Badge>Version: {coordinate.version}</Badge>
              <Link href={coordinate.permalink} passHref>
                <Button
                  target="_blank"
                  component="a"
                  compact
                  radius="sm"
                  color="blue"
                  variant="light"
                  rightIcon={<ExternalLink size="14" />}
                >
                  Original Post
                </Button>
              </Link>
            </Group>
          </Group>
          <Group spacing="xs">
            {coordinate.colors.map((color) => (
              <Badge key={color} color={color}>
                {color}
              </Badge>
            ))}
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
      permalink: coordinate.permalink,
      id: coordinate._id.toString(),
      galaxy: coordinate.galaxy,
      thumbnail: coordinate.images[0],
      version: coordinate.version,
      images: coordinate.images,
      title: coordinate.title,
      type: coordinate.type,
      colors: coordinate.colors,
      sub_types: coordinate.sub_types,
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
