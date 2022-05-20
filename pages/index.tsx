import {
  Button,
  Container,
  Group,
  LoadingOverlay,
  SimpleGrid,
  useMantineTheme,
} from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import type { NextPage } from "next";
import { Fragment, useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { MoonStars, Sun } from "tabler-icons-react";
import CoordinateCard from "../components/CoordinateCard";
import AppLayout from "../layout/AppLayout";
import { Coordinate } from "../types/coordinates";
import { PaginatedResult } from "../types/types";

const Home: NextPage = () => {
  const containerRef = useRef();
  const theme = useMantineTheme();
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
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  useEffect(() => {
    if (!hasNextPage || !observedEntry) {
      return;
    }
    if (observedEntry.isIntersecting) {
      fetchNextPage();
    }
  }, [observedEntry]);

  return (
    <AppLayout>
      <Container>
        <LoadingOverlay visible={isLoading} />
        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: theme.breakpoints.xs, cols: 1 },
            { maxWidth: theme.breakpoints.sm, cols: 2 },
          ]}
        >
          {data?.pages.map((page) => (
            <Fragment key={page.currentPage}>
              {page.results.map(({ id, title, galaxy, images, type }) => (
                <CoordinateCard
                  key={id}
                  desc={title}
                  galaxy={galaxy}
                  id={id}
                  img={images[0]}
                  type={type}
                />
              ))}
            </Fragment>
          ))}
        </SimpleGrid>
        {!isLoading && (
          <Group position="center" style={{ marginTop: theme.spacing.xl }}>
            {hasNextPage ? (
              <Button
                ref={ref}
                onClick={() => fetchNextPage()}
                loading={isFetchingNextPage}
                disabled={!hasNextPage}
              >
                Load More
              </Button>
            ) : (
              <></>
            )}
          </Group>
        )}
      </Container>
    </AppLayout>
  );
};

export default Home;
