import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "./style.css";
import { TRANSACTION_TYPE } from "../../App";
import { formatDate } from "../../utils/formatDate";

export type ROW_TYPE = {
  [key: string]: any;
};

export type COLUMN_TYPE<T extends ROW_TYPE> = {
  label: string;
  value: keyof T;
};

type PROP_TYPES = {
  columns: COLUMN_TYPE<TRANSACTION_TYPE>[];
  rows: ROW_TYPE[] | null;
};

const CustomTable = ({ columns, rows }: PROP_TYPES) => {
  return (
    <Box>
      <TableContainer component={Paper} style={{ maxHeight: "450px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
          <TableHead
            sx={{
              "& th": {
                color: "white",
                backgroundColor: "#454545",
                fontSize: "17px",
              },
            }}
          >
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.value}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ maxHeight: "350px !important", overflowY: "auto" }}>
            {rows?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {columns.map((column, index) => (
                  <TableCell key={index}>
                    {column.value === "image" ? (
                      <img src={row[column.value]} width={90} height={90} />
                    ) : column.value === "dateOfSale" ? (
                      formatDate(row[column.value])
                    ) : column.value === "sold" ? (
                      <Box>{row[column.value] ? "SOLD" : "NOT SOLD"}</Box>
                    ) : (
                      row[column.value]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomTable;
