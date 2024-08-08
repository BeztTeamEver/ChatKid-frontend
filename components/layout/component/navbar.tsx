"use client";

import { DataNavbar } from "@/constants/layout.constants";
import { Navbar, ScrollArea } from "@mantine/core";

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
  const navManageCustomer = DataNavbar.manageCustomer.map((item) => (
    <LinksGroup isExpanded={isExpanded} expandMenu={expandMenu} {...item} key={item.label} />
  ));

  const navManageKidTalkie = DataNavbar.manageKidTalkie.map((item, index) => (
    <>
      <LinksGroup isExpanded={isExpanded} expandMenu={expandMenu} {...item} key={item.label} />
      {/* {index === 5 ? <Divider color="#E9EAF2" /> : <></>} */}
    </>
  ));

  return (
    <Navbar className={classes.navbar}>
      <Navbar.Section grow className={classes.links} p={15} component={ScrollArea}>
        <p style={{ color: "#A5A8BB", margin: "5px 10px", fontSize: "12px", fontWeight: "500" }}>
          {isExpanded ? (
            "QUẢN LÝ KHÁCH HÀNG"
          ) : (
            <div style={{ width: "100%", background: "#BFC1CF", height: "2px" }}></div>
          )}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {navManageCustomer}
        </div>

        <br />

        <div
          style={{ color: "#A5A8BB", margin: "0px 10px 5px", fontSize: "12px", fontWeight: "500" }}
        >
          {isExpanded ? (
            "QUẢN LÝ KIDTALKIE"
          ) : (
            <div style={{ width: "100%", background: "#BFC1CF", height: "2px" }}></div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {navManageKidTalkie}
        </div>
      </Navbar.Section>
    </Navbar>
  );
}
