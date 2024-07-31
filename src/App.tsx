import { ChangeEvent, useEffect, useState } from "react";
import { Box, SelectChangeEvent } from "@mui/material";
import CustomTable, { COLUMN_TYPE } from "./components/CustomTable";
import CustomPagination from "./components/CustomPagination";
import Loader from "./components/Loader";
import axios from "axios";
import useDebounce from "./hooks/useDebounce";
import Navbar from "./components/Navbar";
import "./App.css";
import Statistics from "./components/Statistics";
import CustomBarChart from "./components/BarChart";
import CustomPieChart from "./components/CustomPieChart";

const options = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const columns: COLUMN_TYPE<TRANSACTION_TYPE>[] = [
  { label: "ID", value: "_id" },
  { label: "Title", value: "title" },
  { label: "Description", value: "description" },
  { label: "Category", value: "category" },
  { label: "Sold", value: "sold" },
  { label: "Date Of Sale", value: "dateOfSale" },
  { label: "Image", value: "image" },
];

export type TRANSACTION_TYPE = {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: {
    name: string;
  };
  image: string;
  sold: boolean;
  dateOfSale: Date;
};

const App = () => {
  const [rowsData, setRowsData] = useState<TRANSACTION_TYPE[] | null>(null);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(3);
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [statisticsData, setStatisticsData] = useState<{
    totalSale: number;
    soldItemsCount: number;
    unsoldItemsCount: number;
  }>({
    totalSale: 0,
    soldItemsCount: 0,
    unsoldItemsCount: 0,
  });
  const [barChartData, setBarChartData] = useState<number[]>([]);
  const [pieChartData, setPieChartData] = useState<
    { label: string; value: string }[]
  >([]);

  const fetchData = async (
    page: number = 1,
    searchValue: string = "",
    month?: number | null
  ) => {
    setLoading(true);
    const params: any = { page };
    if (searchValue?.trim()) {
      params["searchQuery"] = searchValue;
    }
    if (month) {
      params["month"] = month;
    }
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/transaction/all`,
        { params }
      );
      setRowsData(res.data.data);
      setTotalPage(res.data.totalPages);
      setLoading(false);
      return res.data;
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  const fetchStatisticsData = async (month: number) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/transaction/statistics`,
        { params: { month } }
      );
      setStatisticsData(res.data);
      return res.data;
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchBarChartData = async (month: number) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/transaction/bar-chart-data`,
        { params: { month } }
      );
      const arr = [];
      for (let data of res.data) {
        arr.push(data.count);
      }
      setBarChartData(arr);
      return res.data;
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchPieChartData = async (month: number) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/transaction/categorywise-count`,
        { params: { month } }
      );
      const arr = [];
      for (let key in res.data) {
        arr.push({ value: res.data[key], label: key });
      }
      setPieChartData(arr);
      return res.data;
    } catch (error) {
      console.log("error", error);
    }
  };

  const onLoad = async () => {
    await fetchData(currentPage, value, selectedMonth);
    if (selectedMonth) {
      await fetchStatisticsData(selectedMonth);
      await fetchBarChartData(selectedMonth);
      await fetchPieChartData(selectedMonth);
    }
  };

  const handleChange = async (_: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    await fetchData(page, "", selectedMonth);
  };

  const updateData = (value: string) => {
    setCurrentPage(1);
    fetchData(1, value, selectedMonth);
  };

  const debounceUpdateData = useDebounce(updateData, 400);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    debounceUpdateData(event.target.value);
  };

  const handleMonthChange = async (event: SelectChangeEvent) => {
    setSelectedMonth(Number(event.target.value));
    setValue("");
    setCurrentPage(1);
    fetchData(1, "", Number(event.target.value));
    if (event.target.value) {
      await fetchStatisticsData(Number(event.target.value));
      await fetchBarChartData(Number(event.target.value));
      await fetchPieChartData(Number(event.target.value));
    }
  };

  const onClear = () => {
    setSelectedMonth(null);
    setValue("");
    setCurrentPage(1);
    fetchData(1);
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <Box className="layout-container">
      {<Loader open={loading} />}
      <Navbar
        inputValue={value}
        handleInputChange={handleInputChange}
        selectedValue={selectedMonth}
        options={options}
        handleChange={handleMonthChange}
        onClear={onClear}
      />
      <Box className="main-layout">
        <Box className="table-section">
          <CustomTable rows={rowsData} columns={columns} />
        </Box>
        <Box className="pagination-layout">
          <CustomPagination
            currentPage={currentPage}
            totalPage={totalPage}
            handleChange={handleChange}
          />
        </Box>
        <Box className="data-section">
          <Box>
            <Statistics
              month={selectedMonth ? options[selectedMonth - 1] : "January"}
              data={statisticsData}
            />
          </Box>
          <Box>
            <CustomPieChart data={pieChartData} />
          </Box>
          <Box>
            <CustomBarChart data={barChartData} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
