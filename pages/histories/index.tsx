"use client";

import TableHistory from "@/components/common/table/TableHistory";
import { useEffect, useState } from "react";

export default function Histories() {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <TableHistory /> : <></>;
}
