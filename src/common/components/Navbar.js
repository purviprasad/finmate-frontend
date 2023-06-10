import React from "react";
import { Menu, Affix } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  FolderViewOutlined,
  PieChartOutlined,
  RiseOutlined,
  FallOutlined,
  BankOutlined,
  ScissorOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  const location = useLocation();

  const menuKeys = {
    "/": "1",
    "/transactions": "2",
    "/incomes": "3",
    "/expenses": "4",
    "/savings": "5",
    "/budget": "6",
  };

  const menuItems = [
    {
      label: <Link to={"/"}>Dashboard</Link>,
      key: "1",
      icon: <PieChartOutlined />,
    },
    {
      label: <Link to={"/transactions"}>All Transactions</Link>,
      key: "2",
      icon: <FolderViewOutlined />,
    },
    {
      label: <Link to="/incomes">Manage Incomes</Link>,
      key: "3",
      icon: <RiseOutlined />,
    },
    {
      label: <Link to="/expenses">Manage Expenses</Link>,
      key: "4",
      icon: <FallOutlined />,
    },
    {
      label: <Link to="/savings">Manage Savings</Link>,
      key: "5",
      icon: <BankOutlined />,
    },
    {
      label: <Link to="/budget">Manage Budget</Link>,
      key: "6",
      icon: <ScissorOutlined />,
    },
  ];

  return (
    <Affix offsetTop={0}>
      <Menu
        mode="inline"
        selectedKeys={menuKeys[location.pathname]}
        items={menuItems}
        style={{ borderRadius: "20px", marginTop: "20px" }}
      />
    </Affix>
  );
};

export default Navbar;
