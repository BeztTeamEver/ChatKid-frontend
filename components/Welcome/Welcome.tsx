import { Title, Text, Anchor } from "@mantine/core";

import useStyles from "./Welcome.styles";

export function Welcome() {
  const { classes } = useStyles();

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ minHeight: "calc(100vh - 150px" }}
    >
      <Title className={classes.title} align="center">
        Welcome to{" "}
        <Text inherit variant="gradient" component="span">
          Kid Talkie
        </Text>
      </Title>
      <Text color="dimmed" align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt="xl">
        This starter Next.js project includes a minimal setup for server side rendering, if you want
        to learn more on Kid Talkie + Next.js integration follow{" "}
        <Anchor href="https://mantine.dev/guides/next/" size="lg">
          this guide
        </Anchor>
        . To get started edit index.tsx file.
      </Text>
    </div>
  );
}
