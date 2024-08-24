"use client";

import { Group, Box, UnstyledButton, rem } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
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
          router.pathname.includes(link && link !== "/" ? link : "#") || router.pathname === link
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
            {isExpanded ? (
              <Box ml="md" className="font-medium">
                {label}
              </Box>
            ) : (
              ""
            )}
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
    </>
  );
}
