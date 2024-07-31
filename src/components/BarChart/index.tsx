import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import "./style.css";

type PROP_TYPE = {
  data: number[];
};

const CustomBarChart = ({ data }: PROP_TYPE) => {
  const generateData = (rangeGap: number = 100, maxRange: number = 900) => {
    const arr = [];
    for (let i = 0; i < maxRange; i += rangeGap) {
      const start = i;
      const end = i + rangeGap;
      const rangeStart = i === 0 ? start : start + 1;
      arr.push(`${rangeStart}-${end}`);
    }
    return arr;
  };
  return (
    <Box>
      <BarChart
        yAxis={[
          {
            label: "Price Range",
            min: 0,
            max: 80,
            valueFormatter: (value) => `${value}`,
            tickNumber: 5,
          },
        ]}
        xAxis={[{ scaleType: "band", data: generateData() }]}
        series={[{ data }]}
        width={500}
        height={400}
      />
    </Box>
  );
};

export default CustomBarChart;
