"use client";

import { login } from "@/redux/features/userSlice";
import { useAppSelector } from "@/redux/hooks";
import { AuthApi } from "@/utils/authApi";
import { Header, Group, Button, Image } from "@mantine/core";
import MenuIcon from "icons/MenuIcon";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import NotiDropdown from "./notiDropdown";
import UserDropdown from "./userDropdown";

export default function HeaderLayout({
  isExpanded,
  toggleMenu,
}: {
  isExpanded: boolean;
  toggleMenu: () => void;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.UserReducer.user);

  useEffect(() => {
    AuthApi.getInfoUser()
      .then((res) => {
        res.data.data.role = "SUPER_ADMIN";
        res.data.data.avatar =
          "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4";
        dispatch(login(res.data.data));
      })
      .catch((err) => console.log(err.data));
  }, []);

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
            <Image src="logos/logo.svg" alt="Logo" />
          </a>
        </Group>

        {user && (
          <Group className="">
            <NotiDropdown />
            <UserDropdown user={user} />{" "}
          </Group>
        )}
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
