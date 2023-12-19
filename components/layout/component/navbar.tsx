"use client";

import { DataNavbar } from "@/constants/layout.constants";
import { Divider, Navbar, ScrollArea } from "@mantine/core";

import { LinksGroup } from "./link-group";
import { useNavbarStyles } from "./styles";

export function NavbarNested({
  isExpanded,
  expandMenu,
}: {
  isExpanded: boolean;
  expandMenu: () => void;
}) {
  const { classes } = useNavbarStyles();
  const navManageAccount = DataNavbar.manageAccount.map((item) => (
    <LinksGroup isExpanded={isExpanded} expandMenu={expandMenu} {...item} key={item.label} />
  ));

  const navManageKidTalkie = DataNavbar.manageKidTalkie.map((item, index) => (
    <>
      <LinksGroup isExpanded={isExpanded} expandMenu={expandMenu} {...item} key={item.label} />
      {index === 0 || index === 4 || index === 7 ? <Divider color="#E9EAF2" /> : <></>}
    </>
  ));

  return (
    <Navbar className={classes.navbar}>
      <Navbar.Section grow className={classes.links} p={15} component={ScrollArea}>
        {/* <p style={{ color: "#A5A8BB", margin: "5px 10px", fontSize: "13px", fontWeight: "600" }}>
          {isExpanded ? (
            "QUẢN LÝ TÀI KHOẢN"
          ) : (
            <div style={{ width: "100%", background: "#BFC1CF", height: "2px" }}></div>
          )}
        </p> */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {navManageKidTalkie}
        </div>

        {/* <br />

        <div
          style={{ color: "#A5A8BB", margin: "0px 10px 5px", fontSize: "13px", fontWeight: "600" }}
        >
          {isExpanded ? (
            "QUẢN LÝ KIDTALKIE"
          ) : (
            <div style={{ width: "100%", background: "#BFC1CF", height: "2px" }}></div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {navManageAccount}
        </div> */}
      </Navbar.Section>
    </Navbar>
  );
}
