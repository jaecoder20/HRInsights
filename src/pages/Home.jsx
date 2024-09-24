import React, { useContext, useEffect } from "react";
import SidebarWithHeader from "../components/SidebarWithHeader";
import authContext from "../context/AuthProvider";
import StatisticsCard from "../components/StatisticsCard";
import Cookies from "js-cookie";

export default function Home() {
  const employee = Cookies.get("employee")
    ? JSON.parse(Cookies.get("employee"))
    : null;
  console.log(employee);
  const currUser = {
    avatar: "https://bit.ly/broken-link",
    name: employee.firstName + " " + employee.lastName,
    accountType: employee.role,
  };

  return (
    <div>
      <SidebarWithHeader user={currUser} />
    </div>
  );
}
