import React, { useState, useEffect, useContext } from "react";
import { SimpleGrid, Box, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import axios from "../api/axios";
import StatisticsCard from "./StatisticsCard";
import { FiUsers, FiUserCheck, FiSmile, FiGrid } from "react-icons/fi";
import authContext from "../context/AuthProvider";
import Cookies from "js-cookie";
const DashboardCards = () => {
  const { auth } = useContext(authContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/report", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        setData(response.data.report);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        There was an error fetching data: {error}
      </Alert>
    );
  }

  return (
    <Box p="8">
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="10">
        <StatisticsCard
          label={"Total Employees"}
          icon={FiUsers}
          quantity={data.totalEmployees}
        />
        <StatisticsCard
          label={"Active Employees"}
          icon={FiUserCheck}
          quantity={data.totalActive}
        />
        <StatisticsCard
          label={"On Leave"}
          icon={FiSmile}
          quantity={data.totalOnLeave}
        />
        <StatisticsCard
          label={"Hired 30 Days Ago"}
          icon={FiGrid}
          quantity={data.thirtyDayHires}
        />
      </SimpleGrid>
    </Box>
  );
};

export default DashboardCards;
