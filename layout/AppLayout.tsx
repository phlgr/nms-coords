import {
  ActionIcon,
  AppShell,
  Group,
  Header,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import type { ReactNode } from "react";
import { MoonStars, Sun } from "tabler-icons-react";

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <AppShell
      header={
        <Header height={60} p="xs">
          <Group position="apart">
            <Title>NMS Coordinates</Title>
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
      {children}
    </AppShell>
  );
};

export default AppLayout;
