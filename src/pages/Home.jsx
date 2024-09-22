import React from "react";
import SidebarWithHeader from "../components/SidebarWithHeader";

const testUser = {
  avatar: "https://bit.ly/dan-abramov",
  name: "Rojae Smith",
  accountType: "Member",
};

export default function Home() {
  return (
    <div>
      <SidebarWithHeader user={testUser} />
    </div>
  );
}
