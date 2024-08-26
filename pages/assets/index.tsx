"use client";

import TableAsset from "@/components/common/table/TableAsset";
import { useEffect, useState } from "react";

export default function Asset() {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <TableAsset /> : <></>;
}
