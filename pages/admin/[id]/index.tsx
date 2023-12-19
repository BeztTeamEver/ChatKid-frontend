"use client";

import { ADMIN_TYPE } from "@/types/admin.type";
import { AdminApi } from "@/utils/adminApi";
import { Breadcrumbs } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import DetailAdminCard from "./components/cardInfo";

export default function DetailAdmin() {
  const router = useRouter();
  const { id } = router.query;
  const [infoAdmin, setInfoAdmin] = useState<ADMIN_TYPE>();

  useEffect(() => {
    if (id) {
      AdminApi.getDetailAdmin(id as string)
        .then((res) => {
          setInfoAdmin(res.data);
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
            "0px 4px 8px 0px rgba(78, 41, 20, 0.08), 0px -1px 2px 0px rgba(78, 41, 20, 0.01);",
        }}
      >
        <Link
          href="/admin"
          className="text-[#0000008c] hover:text-black transition-all hover:no-underline"
        >
          Danh sách admin
        </Link>
        <Link href="" className="text-black hover:no-underline">
          Chi tiết admin
        </Link>
      </Breadcrumbs>

      <DetailAdminCard infoAdmin={infoAdmin} setInfoAdmin={setInfoAdmin} />
    </div>
  );
}
