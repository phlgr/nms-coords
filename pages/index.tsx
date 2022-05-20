import {
  ActionIcon,
  AppShell,
  Container,
  Group,
  Header,
  SimpleGrid,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import type { NextPage } from "next";
import { MoonStars, Sun } from "tabler-icons-react";
import CoordinateCard from "../components/CoordinateCard";

const Home: NextPage = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <AppShell
      header={
        <Header height={60} p="xs">
          <Group position="apart">
            <Title>No Man's Sky Coordinates</Title>
            <ActionIcon
              variant="default"
              onClick={() => toggleColorScheme()}
              size={30}
            >
              {colorScheme === "dark" ? (
                <Sun size={16} />
              ) : (
                <MoonStars size={16} />
              )}
            </ActionIcon>
          </Group>
        </Header>
      }
    >
      <Container>
        <SimpleGrid cols={3}>
          <CoordinateCard
            type="Ship"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            galaxy="Euclid"
            img="https://images.unsplash.com/photo-1652990972729-d2f9b4ad5eda"
          />
          <CoordinateCard
            type="Ship"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            galaxy="Euclid"
            img="https://images.unsplash.com/photo-1652990972729-d2f9b4ad5eda"
          />
          <CoordinateCard
            type="Ship"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            galaxy="Euclid"
            img="https://images.unsplash.com/photo-1652990972729-d2f9b4ad5eda"
          />
          <CoordinateCard
            type="Ship"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            galaxy="Euclid"
            img="https://images.unsplash.com/photo-1652990972729-d2f9b4ad5eda"
          />
        </SimpleGrid>
      </Container>
    </AppShell>
  );
};

export default Home;
