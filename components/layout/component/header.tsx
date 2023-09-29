"use client";

import { createStyles, Header, Group, Button, Image } from "@mantine/core";
import MenuIcon from "icons/MenuIcon";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

export default function HeaderLayout({
  isExpanded,
  toggleMenu,
}: {
  isExpanded: boolean;
  toggleMenu: () => void;
}) {
  const { classes, theme } = useStyles();
  const router = useRouter();

  return (
    <Header height={60} px="md" sx={{ position: "relative", border: "none" }}>
      <Group position="apart" sx={{ height: "100%" }}>
        <Group>
          <Button
            variant="subtle"
            color="yellow"
            sx={
              isExpanded
                ? { transition: "linear 0.1s", background: "#FFEDD1" }
                : { transition: "linear 0.1s" }
            }
            onClick={toggleMenu}
          >
            <MenuIcon color={isExpanded ? "#752B01" : "#252937"} />
          </Button>
          <a href="/">
            <Image src="/logos/logo.png" alt="Logo" />
          </a>
        </Group>

        <Group className={classes.hiddenMobile}>
          <Button variant="outline" color="yellow" onClick={() => router.push("/login")}>
            Log in
          </Button>
        </Group>
      </Group>
      <div
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          left: 0,
          height: "100%",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          zIndex: -1,
        }}
      ></div>
    </Header>
  );
}
