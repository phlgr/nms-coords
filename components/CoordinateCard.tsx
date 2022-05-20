import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme,
} from "@mantine/core";

type CoordinateCardProps = {
  type: string;
  desc: string;
  img: string;
  galaxy: string;
};

const CoordinateCard = ({ type, desc, img, galaxy }: CoordinateCardProps) => {
  const theme = useMantineTheme();

  return (
    <Card>
      <Card.Section>
        <Image src={img} />
      </Card.Section>
      <Group
        position="apart"
        style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
      >
        <Title order={3}>{type}</Title>
        <Badge>{galaxy}</Badge>
      </Group>
      <Text>{desc}</Text>
      <Button variant="light" fullWidth style={{ marginTop: theme.spacing.sm }}>
        Show Details
      </Button>
    </Card>
  );
};

export default CoordinateCard;
