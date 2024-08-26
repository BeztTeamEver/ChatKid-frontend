"use client";

import TableFamily from "@/components/common/table/TableFamily";
import { useEffect, useState } from "react";

export default function Family() {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <TableFamily /> : <></>;
}
