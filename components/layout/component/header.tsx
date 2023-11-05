"use client";

import Logo from "@/icons/Logo";
import { login, logout } from "@/redux/features/userSlice";
import { useAppSelector } from "@/redux/hooks";
import { AuthApi } from "@/utils/authApi";
import { Header, Group, Button, Text } from "@mantine/core";
import MenuIcon from "icons/MenuIcon";
import Link from "next/link";
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
        dispatch(login(res.data));
      })
      .catch((err) => {
        dispatch(logout());
        router.push("/login");
        console.log(err);
      });
  }, []);

  return (
    <Header height={60} px="md" sx={{ position: "relative", border: "none", zIndex: 2 }}>
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
          <Link href="/">
            <Group className="text-primary-500 w-fit" spacing="xs" position="center">
              <Logo width={30} height={30} />
              <Text className="font-bold text-xl">KidTalkie</Text>
            </Group>
          </Link>
        </Group>

        {user && (
          <Group className="">
            <NotiDropdown />
            <UserDropdown user={user} />
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
