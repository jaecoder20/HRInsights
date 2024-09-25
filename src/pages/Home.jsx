import React, { useContext, useEffect } from "react";
import SidebarWithHeader from "../components/SidebarWithHeader";
import authContext from "../context/AuthProvider";
import StatisticsCard from "../components/StatisticsCard";
import Cookies from "js-cookie";
import Image from "../../public/uploads/man1.jpg";
export default function Home() {
  const employee = Cookies.get("employee")
    ? JSON.parse(Cookies.get("employee"))
    : null;
  console.log(employee);

  const currUser = {
    avatar: Image,
    name: employee.firstName + " " + employee.lastName,
    accountType: employee.role,
  };

  return (
    <div>
      <SidebarWithHeader user={currUser} />
    </div>
  );
}
