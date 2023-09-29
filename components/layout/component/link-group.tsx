"use client";

import { Group, Box, Collapse, UnstyledButton, createStyles, rem } from "@mantine/core";
import { IconChevronLeft, IconChevronRight, IconPointFilled } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,
    transition: "all 0.2s",

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: "flex",
    gap: rem(10),
    alignItems: "center",
    textDecoration: "none",
    padding: rem(8),
    paddingLeft: rem(20),
    margin: rem(10),
    marginLeft: rem(20),
    borderRadius: rem(8),
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: "transform 200ms ease",
  },
}));

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  link?: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  isExpanded: boolean;
  expandMenu: () => void;
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  link,
  links,
  isExpanded,
  expandMenu,
}: LinksGroupProps) {
  const { classes, theme } = useStyles();
  const router = useRouter();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === "ltr" ? IconChevronRight : IconChevronLeft;
  const items = (hasLinks ? links : []).map((item) => (
    <Link
      className={classes.link}
      href={item.link}
      key={item.label}
      style={router.pathname === item.link ? { background: "#FFEDD1", color: "#752B01" } : {}}
    >
      <IconPointFilled
        style={router.pathname === item.link ? { color: "#752B01" } : { color: "#E9EAF2" }}
        size="1.2rem"
      />
      {item.label}
    </Link>
  ));

  useEffect(() => {
    !isExpanded && setOpened(isExpanded);
  }, [isExpanded]);

  return (
    <>
      <UnstyledButton
        onClick={() => {
          isExpanded ? setOpened((o) => !o) : setOpened(true);
          expandMenu();
        }}
        className={classes.control}
        sx={
          router.pathname === link
            ? {
                borderRadius: rem(8),
                color: "#752B01",
                background: "#FFEDD1",
                pointerEvents: "none",
              }
            : {}
        }
      >
        <Group position="apart" spacing={0}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Icon size="1.1rem" />
            {isExpanded ? <Box ml="md">{label}</Box> : ""}
          </Box>
          {hasLinks && isExpanded && (
            <ChevronIcon
              className={classes.chevron}
              size="1rem"
              stroke={1.5}
              style={{
                transform: opened ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)` : "none",
                marginLeft: "1.5rem",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
