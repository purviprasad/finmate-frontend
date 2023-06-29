import React from "react";
import { Drawer } from "antd";
import "../css/DrawerNavbarOverride.css";
import Navbar from "./Navbar";
const DrawerNavbar = ({ collapsed, setCollapsed }) => {
  const onClose = () => {
    setCollapsed(false);
  };
  console.log(collapsed);
  return (
    <Drawer
      placement={"left"}
      closable={true}
      onClose={onClose}
      open={collapsed}
      key="left"
    >
      <Navbar />
    </Drawer>
  );
};

export default DrawerNavbar;
