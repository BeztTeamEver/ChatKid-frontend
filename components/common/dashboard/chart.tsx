import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";

type DATA_CHART_BE = Array<{
  advertising: Number;
  basicSubcription: Number;
  premiumSubcription: Number;
  premiumSuperSubcription: Number;
}>;

type DATA_CHART = {
  basicSubcription: Array<number>;
  premiumSubcription: Array<number>;
  premiumSuperSubcription: Array<number>;
  advertising: Array<number>;
};

export default function Chart({ className, data }: { className: string; data?: DATA_CHART_BE }) {
  const [dataChart, setDataChart] = useState<DATA_CHART>({
    basicSubcription: [],
    premiumSubcription: [],
    premiumSuperSubcription: [],
    advertising: [],
  });

  useEffect(() => {
    console.log(data);
    if (data?.length) {
      const newData: DATA_CHART = {
        basicSubcription: [],
        premiumSubcription: [],
        premiumSuperSubcription: [],
        advertising: [],
      };
      for (let i = 0; i < 12; i += 1) {
        newData.basicSubcription.push(data[i].basicSubcription as number);
        newData.premiumSubcription.push(data[i].premiumSubcription as number);
        newData.premiumSuperSubcription.push(data[i].premiumSuperSubcription as number);
        newData.advertising.push(data[i].advertising as number);
      }
      console.log(newData);
      setDataChart(newData);
    }
  }, [data]);

  return (
    <div>
      {data?.length && (
        <BarChart
          sx={{ padding: "1.5rem" }}
          className={className}
          height={400}
          xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], scaleType: "band" }]}
          series={[
            {
              data:
                dataChart.basicSubcription?.length === 12
                  ? dataChart.basicSubcription
                  : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
              color: "#FB8F04",
              label: "Gói cơ bản",
              stack: "total",
            },
            {
              data:
                dataChart.premiumSubcription?.length === 12
                  ? dataChart.premiumSubcription
                  : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
              color: "#775FFC",
              label: "Gói tiết kiệm",
              stack: "total",
            },
            {
              data:
                dataChart.premiumSuperSubcription?.length === 12
                  ? dataChart.premiumSuperSubcription
                  : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
              color: "#84D9FD",
              label: "Gói siêu tiết kiệm",
              stack: "total",
            },
            {
              id: "ads_rect",
              data:
                dataChart.advertising?.length === 12
                  ? dataChart.advertising
                  : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
              color: "#E9EAF2",
              label: "Quảng cáo",
              stack: "total",
            },
          ]}
        />
      )}
    </div>
  );
}
