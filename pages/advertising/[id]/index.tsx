"use client";

import { ADS_TYPE } from "@/types/ads.type";
import { AdsApi } from "@/utils/adsApi";
import { Breadcrumbs, Image, Skeleton } from "@mantine/core";
import parse from "html-react-parser";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "react-h5-audio-player/lib/styles.css";

import DetailAdsCard from "./components/cardInfo";

export default function DetailAds() {
  const router = useRouter();
  const { id } = router.query;
  const [infoAds, setInfoAds] = useState<ADS_TYPE>();
  const [status, setStatus] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      AdsApi.getDetailAds(id as string)
        .then((res) => {
          setInfoAds(res.data);
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
          href="/advertising"
          className="text-[#0000008c] hover:text-black transition-all hover:no-underline"
        >
          Danh sách quảng cáo
        </Link>
        <Link href="" className="text-black hover:no-underline">
          Chi tiết quảng cáo
        </Link>
      </Breadcrumbs>
      <div className="flex mt-5 gap-5">
        <DetailAdsCard infoAds={infoAds} setInfoAds={setInfoAds} toggleStatus={toggleStatus} />
        <div
          className="w-full h-fit bg-white p-8 rounded-lg"
          style={{
            boxShadow:
              "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
          }}
        >
          {infoAds?.content ? (
            <div>
              <Image src={infoAds.imageUrl} className="rounded-md mb-5" />
              <h3 className="text-center text-[#252937] text-2xl font-semibold my-5">
                {infoAds.title}
              </h3>
              <div>
                {parse(infoAds.content.replaceAll("<img", "<img className='mx-auto my-3'"))}
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
