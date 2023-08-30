import React, { useState } from "react";
import { Input, Button, Row, Col, Alert, message } from "antd";
import {
  EditOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { updateUserPassword } from "../../apis/UserManagementAPI";
import "../../css/UpdatePasswordOverride.css";

const UpdatePassword = () => {
  const [password, setPassword] = useState({
    newpassword: "",
    confirmpassword: "",
  });
  const [error, setError] = useState({ newpassword: "", confirmpassword: "" });
  const handleChange = e => {
    setPassword({ ...password, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  const handleUpdatePassword = async () => {
    //TODO: Password Validation

    if (password.newpassword === "") {
      setError({ ...error, newpassword: "Please enter new password" });
    } else if (password.confirmpassword === "") {
      setError({ ...error, confirmpassword: "Please enter confirm password" });
    } else if (password.newpassword !== password.confirmpassword) {
      setError({
        ...error,
        confirmpassword: "Password and confirm password should be same",
      });
    } else if (password.newpassword === password.confirmpassword) {
      setError({ ...error, confirmpassword: "" });
      // Password update API call
      await updateUserPassword(password)
        .then(response => {
          if (response) {
            message.success(response);
            setPassword({ newpassword: "", confirmpassword: "" });
          }
        })
        .catch(error => {
          message.error(error);
        });
    }
  };
  return (
    <Col
      xs={{ span: 12, offset: 1 }}
      sm={{ span: 12, offset: 1 }}
      md={{ span: 15, offset: 1 }}
      lg={{ span: 15, offset: 1 }}
      style={{
        backgroundColor: "white",
        textAlign: "center",
        borderRadius: "20px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      <Row style={{ marginTop: "20px" }}>
        <Col span={10} offset={1} id={"col-password"}>
          <div style={{ fontWeight: 500, textAlign: "left", color: "#7c7e8c" }}>
            NEW PASSWORD
          </div>
          <Input.Password
            id="newpassword"
            placeholder="Password"
            name="newpassword"
            iconRender={visible =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            style={{
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              color: "#000000",
              backgroundColor: "#ffffff",
              textTransform: "capitalize",
              padding: "0px",
              fontSize: "20px",
              marginTop: "5px",
              borderBottom: error.newpassword ? "1px solid rgb(255, 0, 0)" : "",
            }}
            value={password.newpassword}
            onChange={handleChange}
          />
          {error.newpassword && (
            <Alert
              message={error.newpassword}
              type="error"
              style={{ marginTop: "5px" }}
            />
          )}
        </Col>
      </Row>
      <Row style={{ marginTop: "20px" }}>
        <Col span={10} offset={1}>
          <div style={{ fontWeight: 500, textAlign: "left", color: "#7c7e8c" }}>
            CONFIRM PASSWORD
          </div>
          <Input.Password
            placeholder="Password"
            name="confirmpassword"
            iconRender={visible =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            style={{
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              color: "#000000",
              backgroundColor: "#ffffff",
              textTransform: "capitalize",
              padding: "0px",
              fontSize: "20px",
              marginTop: "5px",
              borderBottomColor: error.confirmpassword ? "#ff0000" : "",
            }}
            value={password.confirmpassword}
            onChange={handleChange}
          />
          {error.confirmpassword && (
            <Alert
              message={error.confirmpassword}
              type="error"
              style={{ marginTop: "5px" }}
            />
          )}
        </Col>
      </Row>
      <Row
        style={{
          marginTop: "40px",
        }}
      >
        <Col span={12}>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={handleUpdatePassword}
          >
            Update Password
          </Button>
        </Col>
      </Row>
    </Col>
  );
};

export default UpdatePassword;
