import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Button } from "antd";
import { RightOutlined } from "@ant-design/icons";
import BasicDetails from "./BasicDetails";
import UserAvatar from "./UserAvatar";
import UpdatePassword from "./UpdatePassword";

const Settings = () => {
  const userDetails = useSelector(state => state.UserReducer.userDetails);
  const [selectedMenu, setSelectedMenu] = useState("basicDetails");

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <Row style={{ padding: "20px" }}>
        <Col
          xs={{ span: 11 }}
          sm={{ span: 11 }}
          md={{ span: 8 }}
          lg={{ span: 8 }}
          style={{
            backgroundColor: "white",
            textAlign: "center",
            borderRadius: "20px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          {/*User avatar */}
          <UserAvatar name={userDetails?.name} avatar={userDetails?.avatar} />
          {/* Show User name */}
          <Row>
            <Col span={24} style={{ textAlign: "center", marginTop: "20px" }}>
              <span
                style={{
                  textTransform: "capitalize",
                  fontSize: "25px",
                  textAlign: "center",
                }}
              >
                @{userDetails?.username}
              </span>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ marginTop: "20px" }}>
              <Button
                type="ghost"
                block
                style={{
                  textAlign: "left",
                  fontSize: "20px",
                  lineHeight: "1",
                  border: "none",
                  backgroundColor:
                    selectedMenu === "basicDetails" ? "aliceblue" : "",
                  color: selectedMenu === "basicDetails" ? "dodgerblue" : "",
                }}
                icon={<RightOutlined style={{ float: "right" }} />}
                size="large"
                onClick={() => setSelectedMenu("basicDetails")}
              >
                {" "}
                Basic Details{" "}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ marginTop: "10px" }}>
              <Button
                type="ghost"
                block
                style={{
                  textAlign: "left",
                  fontSize: "20px",
                  lineHeight: "1",
                  border: "none",
                  backgroundColor:
                    selectedMenu === "changePassword" ? "aliceblue" : "",
                  color: selectedMenu === "changePassword" ? "dodgerblue" : "",
                }}
                icon={<RightOutlined style={{ float: "right" }} />}
                size="large"
                onClick={() => setSelectedMenu("changePassword")}
              >
                {" "}
                Change Password{" "}
              </Button>
            </Col>
          </Row>
        </Col>
        {selectedMenu === "basicDetails" && (
          <BasicDetails userDetails={userDetails} />
        )}
        {selectedMenu === "changePassword" && (
          <UpdatePassword userDetails={userDetails} />
        )}
      </Row>
    </div>
  );
};

export default Settings;
