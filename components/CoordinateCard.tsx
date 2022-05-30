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
  subTypes: string[];
};

const CoordinateCard = ({
  type,
  desc,
  img,
  galaxy,
  id,
  subTypes,
}: CoordinateCardProps) => {
  const theme = useMantineTheme();

  return (
    <Link href={`/coordinates/${id}`} passHref>
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
          style={{
            marginBottom: 5,
            marginTop: theme.spacing.sm,
            textTransform: "capitalize",
          }}
        >
          <Title order={3}>{type}</Title>
          <Badge>{subTypes[0] ? subTypes[0] : galaxy}</Badge>
        </Group>

        <Text style={{ flexGrow: 1 }}>{desc}</Text>

        <Button
          variant="light"
          fullWidth
          style={{ marginTop: theme.spacing.md }}
        >
          Show Details
        </Button>
      </Card>
    </Link>
  );
};

export default CoordinateCard;
