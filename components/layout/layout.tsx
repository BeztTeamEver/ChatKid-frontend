"use client";

import { Grid } from "@mantine/core";
import { useEffect, useState } from "react";
import utils from "utils";

import HeaderLayout from "./component/header";
import { NavbarNested } from "./component/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const expandStatus = !(utils.LocalStorage.get("expandMenu") === "false");
  const [isExpanded, setIsExpanded] = useState<boolean>(expandStatus);

  const toggleMenu = () => {
    setIsExpanded((o) => !o);
  };

  const expandMenu = () => {
    setIsExpanded(true);
  };

  useEffect(() => {
    utils.LocalStorage.set("expandMenu", isExpanded.toString());
  }, [isExpanded]);

  return (
    <>
      <HeaderLayout isExpanded={isExpanded} toggleMenu={toggleMenu} />
      <Grid sx={{ margin: 0 }}>
        <Grid.Col
          p={0}
          span="content"
          sx={{
            overflow: "hidden",
            boxShadow: "rgba(99, 99, 99, 0.2) 2px 0px 8px 0px",
          }}
        >
          <NavbarNested isExpanded={isExpanded} expandMenu={expandMenu} />
        </Grid.Col>
        <Grid.Col span="auto" p={20} sx={{ overflow: "hidden" }}>
          {children}
        </Grid.Col>
      </Grid>
    </>
  );
}
