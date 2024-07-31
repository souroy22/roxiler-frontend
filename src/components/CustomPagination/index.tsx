import { Box, Pagination } from "@mui/material";
import "./style.css";
import { ChangeEvent } from "react";

type PROP_TYPE = {
  currentPage: number;
  totalPage: number;
  handleChange: (event: ChangeEvent<unknown>, page: number) => void;
};

const CustomPagination = ({
  currentPage,
  totalPage,
  handleChange,
}: PROP_TYPE) => {
  return (
    <Box>
      <Pagination
        page={currentPage}
        count={totalPage}
        color="primary"
        onChange={(event, page) => handleChange(event, page)}
      />
    </Box>
  );
};

export default CustomPagination;
