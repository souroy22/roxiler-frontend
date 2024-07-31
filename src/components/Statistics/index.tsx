import { Box } from "@mui/material";
import "./style.css";
import { formatToIndianRupee } from "../../utils/formatPrice";

type PROP_TYPE = {
  month: string;
  data: {
    totalSale: number;
    soldItemsCount: number;
    unsoldItemsCount: number;
  };
};

const Statistics = ({ month, data }: PROP_TYPE) => {
  return (
    <Box className="statistics-container">
      <Box className="statistics-heading">Transctions Statistics - {month}</Box>
      <Box className="data-container">
        <Box className="data-title">Total sale:</Box>
        <Box>{formatToIndianRupee(data.totalSale)}</Box>
      </Box>
      <Box className="data-container">
        <Box className="data-title">Total sold items:</Box>
        <Box>{data.soldItemsCount}</Box>
      </Box>
      <Box className="data-container">
        <Box className="data-title">Total not sold items:</Box>
        <Box>{data.unsoldItemsCount}</Box>
      </Box>
    </Box>
  );
};

export default Statistics;
