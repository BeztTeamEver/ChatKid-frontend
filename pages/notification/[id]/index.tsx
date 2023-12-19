"use client";

import { NOTIFICATION_TYPE } from "@/types/notification.type";
import { NotificationApi } from "@/utils/notificationApi ";
import { Breadcrumbs, Skeleton } from "@mantine/core";
import parse from "html-react-parser";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "react-h5-audio-player/lib/styles.css";

import DetailNotificationCard from "./components/cardInfo";

export default function DetailNotification() {
  const router = useRouter();
  const { id } = router.query;
  const [infoNotification, setInfoNotification] = useState<NOTIFICATION_TYPE>();
  const [status, setStatus] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      NotificationApi.getDetailNotification(id as string)
        .then((res) => {
          setInfoNotification(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [id, status]);

  const toggleStatus = () => {
    setStatus((state) => !state);
  };

  return (
    <div>
      <Breadcrumbs
        className="bg-white p-8 rounded-lg w-fit"
        sx={{
          boxShadow:
            "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
        }}
      >
        <Link
          href="/notification"
          className="text-[#0000008c] hover:text-black transition-all hover:no-underline"
        >
          Danh sách thông báo
        </Link>
        <Link href="" className="text-black hover:no-underline">
          Chi tiết thông báo
        </Link>
      </Breadcrumbs>
      <div className="flex mt-5 gap-5">
        <DetailNotificationCard infoNotification={infoNotification} />
        <div
          className="w-full h-fit bg-white p-8 rounded-lg"
          style={{
            boxShadow:
              "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
          }}
        >
          {infoNotification?.content ? (
            <div>
              <h3 className="text-center text-[#252937] text-2xl font-semibold mb-5">
                {infoNotification.title}
              </h3>
              <div>
                {parse(
                  infoNotification.content.replaceAll("<img", "<img className='mx-auto my-3'"),
                )}
              </div>
            </div>
          ) : (
            <>
              <Skeleton height={20} radius="xl" mb={40} mx="auto" width="30%" />
              <Skeleton height={20} radius="xl" mb={20} />
              <Skeleton height={20} radius="xl" mb={20} />
              <Skeleton height={20} radius="xl" mb={20} />
              <Skeleton height={20} radius="xl" mb={20} />
              <Skeleton height={20} radius="xl" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
