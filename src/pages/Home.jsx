import React, { useContext, useEffect } from "react";
import SidebarWithHeader from "../components/SidebarWithHeader";
import authContext from "../context/AuthProvider";
import StatisticsCard from "../components/StatisticsCard";

export default function Home() {
  const { auth } = useContext(authContext);
  const user = {
    avatar: "https://bit.ly/broken-link",
    name: auth.employee.firstName + " " + auth.employee.lastName,
    accountType: auth.employee.role.roleName,
  };

  return (
    <div>
      {/* <SidebarWithHeader user={user} /> */}
      <StatisticsCard />
    </div>
  );
}
