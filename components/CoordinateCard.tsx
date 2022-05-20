import {
  Badge,
  Button,
  Card,
  Group,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

type CoordinateCardProps = {
  type: string;
  desc: string;
  img: string;
  galaxy: string;
  id: string;
};

const CoordinateCard = ({
  type,
  desc,
  img,
  galaxy,
  id,
}: CoordinateCardProps) => {
  const theme = useMantineTheme();

  return (
    <Card style={{ display: "flex", flexDirection: "column" }}>
      <Card.Section>
        <Image
          alt=""
          height={170}
          width={300}
          objectFit="cover"
          sizes="40vw"
          src={img}
        />
      </Card.Section>
      <Group
        position="apart"
        style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
      >
        <Title order={3}>{type}</Title>
        <Badge>{galaxy}</Badge>
      </Group>

      <Text style={{ flexGrow: 1 }}>{desc}</Text>
      <Link href={`/coordinates/${id}`} passHref>
        <Button
          component="a"
          variant="light"
          fullWidth
          style={{ marginTop: theme.spacing.md }}
        >
          Show Details
        </Button>
      </Link>
    </Card>
  );
};

export default CoordinateCard;
