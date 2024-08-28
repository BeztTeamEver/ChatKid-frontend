import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";

type DATA_CHART_BE = Array<{
  date: string;
  packages: Array<{
    id: string;
    name: string;
    amount: number;
  }>;
}>;

type DATA_CHART = {
  basicSubcription: Array<number>;
  premiumSubcription: Array<number>;
  premiumSuperSubcription: Array<number>;
};

export default function Chart({ className, data }: { className: string; data?: DATA_CHART_BE }) {
  const [dataChart, setDataChart] = useState<DATA_CHART>({
    basicSubcription: [],
    premiumSubcription: [],
    premiumSuperSubcription: [],
  });
  const newData: DATA_CHART = {
    basicSubcription: [],
    premiumSubcription: [],
    premiumSuperSubcription: [],
  };

  useEffect(() => {
    console.log("DATA:", data);
    if (data?.length) {
      for (let i = 0; i < data.length; i += 1) {
        newData.basicSubcription.push(data[i].packages[2].amount as number);
        newData.premiumSubcription.push(data[i].packages[0].amount as number);
        newData.premiumSuperSubcription.push(data[i].packages[1].amount as number);
      }
      console.log("NEW DATA", newData.basicSubcription.length);
      setDataChart(newData);
    }
  }, [data]);

  return (
    <div>
      {dataChart.basicSubcription.length === 30 ? (
        <BarChart
          sx={{ padding: "10px" }}
          height={300}
          xAxis={[
            {
              data: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
                24, 25, 26, 27, 28, 29, 30,
              ],
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: dataChart.basicSubcription,
              color: "#2D9AFF",
              label: "Bụi kim cương",
              stack: "total",
            },
            {
              data: dataChart.premiumSubcription,
              color: "#00CB2F",
              label: "Túi kim cương",
              stack: "total",
            },
            {
              data: dataChart.premiumSuperSubcription,
              color: "#FEA623",
              label: "Rương kim cương",
              stack: "total",
            },
          ]}
        />
      ) : dataChart.basicSubcription.length === 31 ? (
        <BarChart
          sx={{ padding: "10px" }}
          height={240}
          xAxis={[
            {
              data: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
                24, 25, 26, 27, 28, 29, 30, 31,
              ],
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: dataChart.basicSubcription,

              color: "#2D9AFF",
              label: "Bụi kim cương",
              stack: "total",
            },
            {
              data: dataChart.premiumSubcription,
              color: "#00CB2F",
              label: "Túi kim cương",
              stack: "total",
            },
            {
              data: dataChart.premiumSuperSubcription,
              color: "#FEA623",
              label: "Rương kim cương",
              stack: "total",
            },
          ]}
        />
      ) : (
        <p>Dữ liệu đang được cập nhật</p>
      )}
    </div>
  );
}
