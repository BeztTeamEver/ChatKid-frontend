"use client";

import TableHistoryAdvise from "@/components/common/table/TableHistoryAdvise";
import { EXPERT_TYPE } from "@/types/expert.type";
import { ExpertApi } from "@/utils/expertApi";
import { Anchor, Breadcrumbs } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import DetailExpertCard from "./components/expertCard";

export default function DetailExpert() {
  const router = useRouter();
  const { id } = router.query;
  const [infoExpert, setInfoExpert] = useState<EXPERT_TYPE>();

  useEffect(() => {
    if (id) {
      ExpertApi.getDetailExpert(id as string)
        .then((res) => {
          setInfoExpert(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  return (
    <div>
      <Breadcrumbs
        className="bg-white p-4 rounded-lg w-fit"
        sx={{
          boxShadow:
            "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01)",
        }}
      >
        <Anchor
          href="/expert"
          className="text-[#0000008c] hover:text-black transition-all hover:no-underline"
        >
          Danh sách expert
        </Anchor>
        <Anchor href="" className="text-black hover:no-underline">
          Chi tiết expert
        </Anchor>
      </Breadcrumbs>
      <div className="grid grid-cols-4 mt-5 gap-5">
        <DetailExpertCard infoExpert={infoExpert} setInfoExpert={setInfoExpert} />
        <TableHistoryAdvise />
      </div>
    </div>
  );
}
