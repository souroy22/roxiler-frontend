import { PieChart } from "@mui/x-charts";

type PROP_TYPE = {
  data: any[];
};

const CustomPieChart = ({ data }: PROP_TYPE) => {
  return (
    <PieChart
      series={[
        {
          data,
        },
      ]}
      width={450}
      height={200}
    />
  );
};

export default CustomPieChart;
