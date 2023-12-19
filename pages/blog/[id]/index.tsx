"use client";

import { BLOG_TYPE } from "@/types/blog.type";
import { BlogApi } from "@/utils/blogApi";
import { Breadcrumbs, Skeleton } from "@mantine/core";
import parse from "html-react-parser";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import DetailBlogCard from "./components/cardInfo";

export default function DetailBlog() {
  const router = useRouter();
  const { id } = router.query;
  const [infoBlog, setInfoBlog] = useState<BLOG_TYPE>();
  const [status, setStatus] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      BlogApi.getDetailBlog(id as string)
        .then((res) => {
          setInfoBlog(res.data);
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
          href="/blog"
          className="text-[#0000008c] hover:text-black transition-all hover:no-underline"
        >
          Danh sách bài đăng
        </Link>
        <Link href="" className="text-black hover:no-underline">
          Chi tiết bài đăng
        </Link>
      </Breadcrumbs>
      <div className="flex mt-5 gap-5">
        <DetailBlogCard infoBlog={infoBlog} setInfoBlog={setInfoBlog} toggleStatus={toggleStatus} />
        <div
          className="w-full h-fit bg-white p-8 rounded-lg"
          style={{
            boxShadow:
              "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
          }}
        >
          {infoBlog?.content ? (
            <div>
              <h3 className="text-center text-[#252937] text-2xl font-semibold mb-5">
                {infoBlog.title}
              </h3>
              <AudioPlayer src={infoBlog.voiceUrl} className="rounded-md mb-5" />
              <div>
                {parse(infoBlog.content.replaceAll("<img", "<img className='mx-auto my-3'"))}
              </div>
            </div>
          ) : (
            <>
              <Skeleton height={20} radius="xl" mb={40} mx="auto" width="30%" />
              <Skeleton height={40} radius="xl" mb={20} width="40%" />
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
