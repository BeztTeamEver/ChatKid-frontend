"use client";

import { HISTORY_TYPE } from "@/types/history.type";
import { HistoryApi } from "@/utils/historyApi";
import { Breadcrumbs, Skeleton } from "@mantine/core";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default function DetailHistory() {
  const router = useRouter();
  const { id } = router.query;
  const [infoHistory, setInfoHistory] = useState<HISTORY_TYPE>();

  useEffect(() => {
    if (id) {
      HistoryApi.getHistoryById(id as string)
        .then((res) => {
          setInfoHistory(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

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
          href="/histories"
          className="text-[#0000008c] hover:text-black transition-all hover:no-underline"
        >
          Danh sách lịch sử hoạt động
        </Link>
        <Link href="" className="text-black hover:no-underline">
          Chi tiết lịch sử
        </Link>
      </Breadcrumbs>
      <div
        className="h-fit p-8 rounded-lg bg-white w-fit mx-auto mt-10"
        style={{
          boxShadow:
            "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
        }}
      >
        {infoHistory ? (
          <div className="w-fit">
            <div className="h-0 border-[1px] border-[#E9EAF2] relative my-4 mb-8">
              <p className="absolute uppercase bg-white top-0 -translate-y-1/2 p-2 text-[#5B607C]">
                Thông tin chung
              </p>
            </div>
            {infoHistory.voiceUrl && <AudioPlayer src={infoHistory.voiceUrl} />}
            <div
              className="[&>div]:flex [&>div]:gap-5 [&>div]:mb-4 [&>div>*:first-child]:w-40 [&>div>*:last-child]:max-w-[820px]
              [&>div>*:first-child]:font-semibold [&>div>*:first-child]:text-[#252937] [&>div>*:last-child]:font-normal [&>div>*:last-child]:text-[#464C62]"
            >
              <div>
                <p>Mã tài khoản</p>
                <p>{infoHistory.userId}</p>
              </div>
              <div>
                <p>Hình thức</p>
                <p>{infoHistory.serviceName}</p>
              </div>
              <div>
                <p>Thời gian</p>
                <p>{moment(infoHistory.createdTime).format("HH:mm, DD/MM/YYYY")}</p>
              </div>
              <div>
                <p>Câu hỏi</p>
                <p>{infoHistory.content}</p>
              </div>
              <div>
                <p>Câu trả lời</p>
                <p>{infoHistory.answer}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-[1000px]">
            <Skeleton height={120} radius="md" mb="xl" mx="auto" />
            <Skeleton height={10} radius="xl" />
            <Skeleton height={10} mt={12} radius="xl" />
            <Skeleton height={10} mt={12} width="70%" radius="xl" />
            <br />
            <Skeleton height={10} radius="xl" />
            <Skeleton height={10} mt={12} radius="xl" />
            <Skeleton height={10} mt={12} radius="xl" />
          </div>
        )}
      </div>
    </div>
  );
}
