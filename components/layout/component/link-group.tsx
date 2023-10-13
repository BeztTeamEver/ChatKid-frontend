"use client";

import { Group, Box, Collapse, UnstyledButton, rem } from "@mantine/core";
import { IconChevronLeft, IconChevronRight, IconPointFilled } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useLinkGroupStyles } from "./styles";

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
  const { classes, theme } = useLinkGroupStyles();
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
                background: "#FFEDD1 !important",
                pointerEvents: "none",
              }
            : {}
        }
      >
        <Group position="apart" spacing={0} onClick={() => router.push(link ?? "")}>
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
