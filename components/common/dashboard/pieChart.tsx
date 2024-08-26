import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";

type DATA_CHART_BE = Array<{
  id: string;
  name: string;
  total: number;
}>;

type DATA_CHART = {
  basicSubcription: number;
  premiumSubcription: number;
  premiumSuperSubcription: number;
};

export default function PieChartComponent({ data }: { data?: DATA_CHART_BE }) {
  const [dataChart, setDataChart] = useState<DATA_CHART>();
  const newData: DATA_CHART = {
    basicSubcription: -1,
    premiumSubcription: -1,
    premiumSuperSubcription: -1,
  };

  useEffect(() => {
    console.log("DATA:", data);
    if (data) {
      newData.basicSubcription = data[0].total as number;
      newData.premiumSubcription = data[1].total as number;
      newData.premiumSuperSubcription = data[2].total as number;
    }
    setDataChart(newData);
  }, [data]);

  return (
    <div>
      {dataChart && dataChart?.basicSubcription !== -1 ? (
        <PieChart
          sx={{ padding: "10px" }}
          height={180}
          series={[
            {
              innerRadius: 50,
              outerRadius: 80,
              paddingAngle: 1,
              cornerRadius: 6,
              cx: 80,
              cy: 80,
              data: [
                {
                  id: 0,
                  value: dataChart.basicSubcription,
                  label: "Bụi kim cương",
                  color: "#2D9AFF",
                },
                {
                  id: 1,
                  value: dataChart.premiumSubcription,
                  label: "Túi kim cương",
                  color: "#00CB2F",
                },
                {
                  id: 2,
                  value: dataChart.premiumSuperSubcription,
                  label: "Rương kim cương",
                  color: "#FEA623",
                },
              ],
            },
          ]}
        ></PieChart>
      ) : (
        <p>Không có</p>
      )}
    </div>
  );
}
