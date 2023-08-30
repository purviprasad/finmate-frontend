import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Dropdown } from "antd";
import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { logout } from "../../apis/AuthManagementAPI";
import { useDispatch, useSelector } from "react-redux";

const ProfileRoot = () => {
  const userDetails = useSelector(state => state.UserReducer.userDetails);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await logout(dispatch);
  };

  const items = [
    {
      label: <Link to={"/settings"}>Settings</Link>,
      key: "1",
      icon: <SettingOutlined />,
    },
    {
      label: (
        <button
          style={{
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      ),
      key: "2",
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Avatar
          style={{
            color: "#f56a00",
            backgroundColor: "#fde3cf",
            position: "absolute",
            right: "30px",
            top: "25px",
            cursor: "pointer",
            textTransform: "uppercase",
          }}
          src={
            process.env.PUBLIC_URL + "/images/avatars/" + userDetails?.avatar
          }
        >
          {userDetails?.name?.charAt(0)}
        </Avatar>
      </Dropdown>
    </>
  );
};

export default ProfileRoot;
