import React, { useState, useEffect } from "react";
import { SimpleGrid, Box, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import axios from "../api/axios";
import StatisticsCard from "./StatisticsCard";
import { FiUsers, FiUserCheck, FiSmile, FiGrid } from "react-icons/fi";

const DashboardCards = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/report"); 
        setData(response.data);
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
        <StatisticsCard label={"Total Employees"} icon={FiUsers} quantity={data.totalEmployees} />
        <StatisticsCard label={"Active Employees"} icon={FiUserCheck} quantity={data.activeEmployees} />
        <StatisticsCard label={"On Leave"} icon={FiSmile} quantity={data.onLeave} />
        <StatisticsCard label={"Onboarding"} icon={FiGrid} quantity={data.onboarding} />
      </SimpleGrid>
    </Box>
  );
};

export default DashboardCards;
