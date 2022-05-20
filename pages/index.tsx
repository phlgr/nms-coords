import { ThemeContext } from "@emotion/react";
import {
  ActionIcon,
  AppShell,
  Button,
  Container,
  Group,
  Header,
  LoadingOverlay,
  SimpleGrid,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import type { NextPage } from "next";
import { Fragment, useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { MoonStars, Sun } from "tabler-icons-react";
import CoordinateCard from "../components/CoordinateCard";
import { Coordinate } from "../types/coordinates";
import { PaginatedResult } from "../types/types";

const Home: NextPage = () => {
  const containerRef = useRef();
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [ref, observedEntry] = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery<PaginatedResult<Coordinate>>(
      ["coordinates"],
      ({ pageParam = 1 }) =>
        fetch(`/api/coordinates?page=${pageParam}`).then((res) => res.json()),
      {
        getNextPageParam: (lastPage, pages) => lastPage.nextPage,
      }
    );

  useEffect(() => {
    if (!hasNextPage) {
      return;
    }
    if (!observedEntry) {
      return;
    }
    if (observedEntry.isIntersecting) {
      fetchNextPage();
    }
  }, [observedEntry]);

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
        <LoadingOverlay visible={isLoading} />
        <SimpleGrid cols={3}>
          {data?.pages.map((page) => (
            <Fragment key={page.currentPage}>
              {page.results.map(({ postId, title, galaxy, images, type }) => (
                <CoordinateCard
                  key={postId}
                  desc={title}
                  galaxy={galaxy}
                  id={postId}
                  img={images[0]}
                  type={type}
                />
              ))}
            </Fragment>
          ))}
        </SimpleGrid>
        <Group position="center" style={{ marginTop: theme.spacing.xl }}>
          <Button
            ref={ref}
            onClick={() => fetchNextPage()}
            loading={isFetchingNextPage}
            disabled={!hasNextPage}
          >
            Load More
          </Button>
        </Group>
      </Container>
    </AppShell>
  );
};

export default Home;
