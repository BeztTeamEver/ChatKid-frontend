"use client";

import { ReduxProviders } from "@/redux/provider";
import localStore from "@/utils/localStore";
import { Grid, Image } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import utils from "utils";

import HeaderLayout from "./component/header";
import { NavbarNested } from "./component/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const expandStatus = !(utils.LocalStorage.get("expandMenu") === "false");
  const [isExpanded, setIsExpanded] = useState<boolean>(expandStatus);
  const [isClient, setIsClient] = useState<boolean>(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsExpanded((o) => !o);
  };

  const expandMenu = () => {
    setIsExpanded(true);
  };

  useEffect(() => {
    utils.LocalStorage.set("expandMenu", isExpanded.toString());
    setIsClient(true);
  }, [isExpanded]);

  useEffect(() => {
    const token = localStore.get("token");
    if (token && router.pathname.startsWith("/login")) {
      router.push("/");
    }
    if (!token && !router.pathname.startsWith("/login")) {
      router.push("/login");
    }
  }, [router.pathname]);

  return isClient ? (
    router.pathname.startsWith("/login") ? (
      <ReduxProviders>
        <div className="bg-white h-[67px] w-full z-50 flex items-center justify-center">
          <Image src="logos/logo.svg" alt="Logo" width={120} />
        </div>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </ReduxProviders>
    ) : (
      <ReduxProviders>
        <HeaderLayout isExpanded={isExpanded} toggleMenu={toggleMenu} />
        <Grid sx={{ margin: 0 }}>
          <Grid.Col p={0} span="content" className="relative">
            <div
              className="w-full h-full absolute"
              style={{
                overflow: "hidden",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
            ></div>
            <NavbarNested isExpanded={isExpanded} expandMenu={expandMenu} />
          </Grid.Col>
          <Grid.Col span="auto" p={20} sx={{ overflow: "hidden" }} bg="#FFFBF5">
            {children}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </Grid.Col>
        </Grid>
      </ReduxProviders>
    )
  ) : (
    <></>
  );
}
