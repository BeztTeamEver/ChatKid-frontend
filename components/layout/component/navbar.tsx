"use client";

import { Navbar, ScrollArea, createStyles } from "@mantine/core";

import { DataNavbar } from "../data/data";
import { LinksGroup } from "./link-group";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
    zIndex: 1,
    border: "none",
    width: "100%",
    padding: "0 10px",
    height: "fit-content",
    minHeight: "calc(100vh - 60px)",
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    height: "fit-content",
  },
}));

export function NavbarNested({
  isExpanded,
  expandMenu,
}: {
  isExpanded: boolean;
  expandMenu: () => void;
}) {
  const { classes } = useStyles();
  const navManageAccount = DataNavbar.manageAccount.map((item) => (
    <LinksGroup isExpanded={isExpanded} expandMenu={expandMenu} {...item} key={item.label} />
  ));

  const navManageKidTalkie = DataNavbar.manageKidTalkie.map((item) => (
    <LinksGroup isExpanded={isExpanded} expandMenu={expandMenu} {...item} key={item.label} />
  ));

  return (
    <Navbar className={classes.navbar}>
      <Navbar.Section grow className={classes.links} p={10} component={ScrollArea}>
        <p style={{ color: "#A5A8BB", margin: "5px 10px", fontSize: "13px", fontWeight: "600" }}>
          {isExpanded ? (
            "QUẢN LÝ TÀI KHOẢN"
          ) : (
            <div style={{ width: "100%", background: "#BFC1CF", height: "2px" }}></div>
          )}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {navManageAccount}
        </div>

        <br />

        <p
          style={{ color: "#A5A8BB", margin: "0px 10px 5px", fontSize: "13px", fontWeight: "600" }}
        >
          {isExpanded ? (
            "QUẢN LÝ KIDTALKIE"
          ) : (
            <div style={{ width: "100%", background: "#BFC1CF", height: "2px" }}></div>
          )}
        </p>
        <div>{navManageKidTalkie}</div>
      </Navbar.Section>
    </Navbar>
  );
}
