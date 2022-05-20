import {
  Badge,
  Button,
  Card,
  Group,
  Text,
  ThemeIcon,
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
    <Card>
      <Card.Section>
        <Image
          height={170}
          width={300}
          sizes="40vw"
          layout="responsive"
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

      <Text>{desc}</Text>
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
