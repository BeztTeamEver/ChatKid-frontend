"use client";

import TableAccountFamily from "@/components/common/table/TableAccountFamily";
import { FAMILY_TYPE } from "@/types/family.type";
import { FamilyApi } from "@/utils/familyApi";
import { Breadcrumbs } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "react-h5-audio-player/lib/styles.css";

import DetailFamilyCard from "./components/cardInfo";

export default function DetailFamily() {
  const router = useRouter();
  const { id } = router.query;
  const [infoFamily, setInfoFamily] = useState<FAMILY_TYPE>();

  useEffect(() => {
    if (id) {
      FamilyApi.getFamilyById(id as string)
        .then((res) => {
          setInfoFamily(res.data);
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
          href="/family"
          className="text-[#0000008c] hover:text-black transition-all hover:no-underline"
        >
          Danh sách tài khoản gia đình
        </Link>
        <Link href="" className="text-black hover:no-underline">
          Chi tiết tài khoản gia đình
        </Link>
      </Breadcrumbs>
      <div className="flex gap-5 h-fit p-8 rounded-lg mx-auto mt-10 w-full">
        <DetailFamilyCard infoFamily={infoFamily} setInfoFamily={setInfoFamily} />
        <TableAccountFamily listFamily={infoFamily?.users} />
      </div>
    </div>
  );
}
