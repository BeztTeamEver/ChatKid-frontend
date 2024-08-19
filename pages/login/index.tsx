"use client";

import { GOOGLE_CLIENT_ID } from "@/config";
import BgLogin from "@/public/backgrounds/bg_login.png";
import BotImage from "@/public/images/bot_login.png";
import { Image } from "@mantine/core";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

import GoogleButton from "./components/googleButtonLogin";

export default function Login() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div
        className="w-screen h-screen absolute top-0 left-0 bg-cover bg-center flex justify-center items-center z-[-1]"
        style={{
          backgroundImage: `url(${BgLogin.src})`,
        }}
      >
        <div
          className="w-[30rem] rounded-3xl flex gap-8 flex-col justify-center items-center bg-white p-10"
          style={{
            boxShadow:
              "0px 6px 12px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.04), 0px 2px 4px 0px rgba(117, 43, 1, 0.08)",
          }}
        >
          <p
            style={{
              color: "#FB8F04",
              fontSize: "32px",
              fontStyle: "normal",
              fontWeight: "800",
              lineHeight: "normal",
            }}
          >
            Đăng nhập
          </p>
          <Image src={BotImage.src} px="20%" width="120%" />
          <GoogleButton content="Đăng nhập KidTalkie với Google" />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
