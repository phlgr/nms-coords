import {
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Stack,
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
        <Image height={170} src={img} />
      </Card.Section>
      <Group
        position="apart"
        style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
      >
        <Title order={3}>{type}</Title>
        <Badge>{galaxy}</Badge>
      </Group>

      <Text>{desc}</Text>

      <Button variant="light" fullWidth style={{ marginTop: theme.spacing.md }}>
        Show Details
      </Button>
    </Card>
  );
};

export default CoordinateCard;
