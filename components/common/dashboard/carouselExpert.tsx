"use client";

import { BLOG_TYPE } from "@/types/blog.type";
import { BlogApi } from "@/utils/blogApi";
import Image from "next/image";
import Link from "next/link";
// import { Carousel } from "@mantine/carousel";
import { useEffect, useState } from "react";

export default function CarouselExpert({ month, year }: { month: number; year: number }) {
  const [listBlog, setListBlog] = useState<BLOG_TYPE[]>([]);

  useEffect(() => {
    BlogApi.getListBlog(0, 10)
      .then((res) => {
        setListBlog(res.data.items);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex justify-between mt-5 mb-3">
      {listBlog?.slice(month % 5, (month % 5) + 5).map((item, index) => (
        <Link
          href={`/blog/${item.id}`}
          key={index}
          className="w-[17%] cursor-pointer rounded-lg hover:scale-[1.02] transition-all"
          style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        >
          <div
            className="w-full h-20 bg-cover bg-center rounded-lg bg-gray-400"
            style={{
              backgroundImage: `url(${item.imageUrl})`,
            }}
          >
            {/* <img src={item.imageUrl} alt="banner" className="w-full h-auto max-h-[100%] pt-1" /> */}
          </div>
          <p className="line-clamp-2 text-center m-2 text-sm">{item.title}</p>
        </Link>
      ))}
    </div>
  );
}
