import { Skeleton } from "@mantine/core";

export default function SkeletonFunction({ col, row }: { col: number; row: number }) {
  return (
    <>
      {new Array(col).fill("").map((val, index) => (
        <tr
          key={index}
          className={
            index % 2 === 1
              ? "bg-[#FFFBF5] [&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
              : "[&>td]:!p-4 [&>td]:!border-none [&>td]:!pl-[10px]"
          }
        >
          {new Array(row).fill("").map((val2, index2) => (
            <td key={index2}>
              <Skeleton height={20} radius="sm" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
