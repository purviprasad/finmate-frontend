import React, { useState } from "react";
import {
  EditOutlined,
  PhoneOutlined,
  CalendarOutlined,
  UserOutlined,
  MailOutlined,
  HeartOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Input, Button, Row, Col, Select, Alert, message } from "antd";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../../apis/UserManagementAPI";
import "../../css/BasicUserDetailsOverride.css";

const BasicDetails = ({ userDetails }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editDetails, setEditDetails] = useState({ ...userDetails });
  const [errorDetails, setErrorDetails] = useState({
    name: "",
    mobile: "",
    dob: "",
    email: "",
  });
  const handleChange = e => {
    setEditDetails({ ...editDetails, [e.target.name]: e.target.value });
    setErrorDetails({ ...errorDetails, [e.target.name]: "" });
  };

  const handleSave = async () => {
    let err = { ...errorDetails };
    // Validation
    if (editDetails.name === "") {
      err = { ...err, name: "Please enter name" };
    } else if (editDetails.name.match(/^[a-zA-Z ]+$/) === null) {
      err = { ...err, name: "Please enter valid name" };
    }
    // valid mobile no. should be 10 digits
    if (editDetails.mobile && editDetails.mobile?.length !== 10) {
      err = { ...err, mobile: "Please enter valid mobile number" };
    }
    if (
      editDetails.dob?.match(
        /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/g
      ) === null
    ) {
      err = { ...err, dob: "Please enter valid date of birth" };
    }
    if (editDetails.email === "") {
      err = { ...err, email: "Please enter email address" };
    } else if (
      editDetails.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) === null
    ) {
      err = { ...err, email: "Please enter valid email address" };
    }
    setErrorDetails({ ...err });
    if (
      err.name === "" &&
      err.mobile === "" &&
      err.dob === "" &&
      err.email === ""
    ) {
      setLoading(true);
      //API call to save the details
      await updateUserDetails(editDetails, dispatch)
        .then(res => {
          message.success(res);
          setIsEdit(false);
        })
        .catch(err => {
          message.error(err || "Something went wrong! Please try again");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleCancel = () => {
    // reset fields
    setEditDetails({ ...userDetails });
    setErrorDetails({
      name: "",
      mobile: "",
      dob: "",
      email: "",
    });
    setIsEdit(false);
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
        <Col span={10} offset={1}>
          <div style={{ fontWeight: 500, textAlign: "left", color: "#7c7e8c" }}>
            <SmileOutlined /> NAME
          </div>
          <Input
            placeholder="Enter Name"
            name="name"
            style={{
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              color: "#000000",
              backgroundColor: "#ffffff",
              textTransform: "capitalize",
              padding: "0px",
              fontSize: "15px",
              marginTop: "5px",
              borderBottom:
                isEdit && errorDetails.name ? "1px solid rgb(255, 0, 0)" : "",
            }}
            value={isEdit ? editDetails?.name : userDetails?.name}
            disabled={!isEdit}
            onChange={handleChange}
          />
          {isEdit && errorDetails.name && (
            <Alert
              message={errorDetails.name}
              type="error"
              style={{ marginTop: "5px" }}
            />
          )}
        </Col>
        <Col span={10} offset={1}>
          <div style={{ fontWeight: 500, textAlign: "left", color: "#7c7e8c" }}>
            <PhoneOutlined /> MOBILE
          </div>
          <Input
            name="mobile"
            placeholder="Enter Mobile Number"
            type="number"
            style={{
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              color: "#000000",
              backgroundColor: "#ffffff",
              textTransform: "capitalize",
              padding: "0px",
              fontSize: "15px",
              marginTop: "5px",
              borderBottom:
                isEdit && errorDetails.mobile ? "1px solid rgb(255, 0, 0)" : "",
            }}
            value={isEdit ? editDetails?.mobile : userDetails?.mobile}
            disabled={!isEdit}
            onChange={handleChange}
          />
          {isEdit && errorDetails.mobile && (
            <Alert
              message={errorDetails.mobile}
              type="error"
              style={{ marginTop: "5px" }}
            />
          )}
        </Col>
      </Row>
      <Row style={{ marginTop: "40px" }}>
        <Col span={10} offset={1}>
          <div style={{ fontWeight: 500, textAlign: "left", color: "#7c7e8c" }}>
            <CalendarOutlined /> DATE OF BIRTH (DD/MM/YYYY)
          </div>
          <Input
            name="dob"
            placeholder="Enter Date of Birth"
            style={{
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              color: "#000000",
              backgroundColor: "#ffffff",
              textTransform: "capitalize",
              padding: "0px",
              fontSize: "15px",
              marginTop: "5px",
              borderBottom:
                isEdit && errorDetails.dob ? "1px solid rgb(255, 0, 0)" : "",
            }}
            value={isEdit ? editDetails?.dob : userDetails?.dob}
            disabled={!isEdit}
            onChange={handleChange}
          />
          {isEdit && errorDetails.dob && (
            <Alert
              message={errorDetails.dob}
              type="error"
              style={{ marginTop: "5px" }}
            />
          )}
        </Col>
        <Col span={10} offset={1} id="col-basic-user-details-selector">
          <div style={{ fontWeight: 500, textAlign: "left", color: "#7c7e8c" }}>
            <UserOutlined /> GENDER
          </div>
          <Select
            placeholder="Select Gender"
            style={{
              width: "100%",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              color: "#000000",
              backgroundColor: "#ffffff",
              textTransform: "capitalize",
              padding: "0px",
              fontSize: "15px",
              marginTop: "5px",
              textAlign: "left",
            }}
            onChange={value =>
              setEditDetails({ ...editDetails, gender: value })
            }
            defaultValue={userDetails?.gender}
            value={isEdit ? editDetails?.gender : userDetails?.gender}
            disabled={!isEdit}
            options={[
              {
                value: "Male",
                label: "Male",
              },
              {
                value: "Female",
                label: "Female",
              },
              {
                value: "Other",
                label: "Other",
              },
            ]}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "40px" }}>
        <Col span={10} offset={1}>
          <div style={{ fontWeight: 500, textAlign: "left", color: "#7c7e8c" }}>
            <MailOutlined /> EMAIL
          </div>

          <Input
            name="email"
            placeholder="Enter Email Address"
            style={{
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              color: "#000000",
              backgroundColor: "#ffffff",
              padding: "0px",
              fontSize: "15px",
              marginTop: "5px",
              borderBottom:
                isEdit && errorDetails.email ? "1px solid rgb(255, 0, 0)" : "",
            }}
            value={isEdit ? editDetails?.email : userDetails?.email}
            disabled={!isEdit}
            onChange={handleChange}
          />
          {isEdit && errorDetails.email && (
            <Alert
              message={errorDetails.email}
              type="error"
              style={{ marginTop: "5px" }}
            />
          )}
        </Col>
        <Col span={10} offset={1} id="col-basic-user-details-selector">
          <div style={{ fontWeight: 500, textAlign: "left", color: "#7c7e8c" }}>
            <HeartOutlined /> MARITAL STATUS
          </div>
          <Select
            placeholder="Select Marital Status"
            style={{
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              color: "#000000",
              backgroundColor: "#ffffff",
              textTransform: "capitalize",
              padding: "0px",
              fontSize: "15px",
              marginTop: "5px",
              width: "100%",
              textAlign: "left",
            }}
            onChange={value =>
              setEditDetails({ ...editDetails, marital: value })
            }
            defaultValue={userDetails?.marital}
            value={isEdit ? editDetails?.marital : userDetails?.marital}
            disabled={!isEdit}
            options={[
              {
                value: "Single",
                label: "Single",
              },
              {
                value: "Married",
                label: "Married",
              },
              {
                value: "Divorced",
                label: "Divorced",
              },
              {
                value: "Widowed",
                label: "Widowed",
              },
            ]}
          />
        </Col>
      </Row>
      <Row
        style={{
          marginTop: "40px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {!isEdit ? (
          <Col span={12}>
            <Button
              type="primary"
              size="large"
              icon={<EditOutlined />}
              block
              onClick={() => setIsEdit(true)}
            >
              Edit
            </Button>
          </Col>
        ) : (
          <>
            <Col span={11}>
              <Button
                type="primary"
                size="large"
                icon={<EditOutlined />}
                block
                onClick={handleSave}
                loading={loading}
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </Col>
            <Col span={11} offset={1}>
              <Button
                type="default"
                size="large"
                icon={<EditOutlined />}
                block
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Col>
          </>
        )}
      </Row>
    </Col>
  );
};

export default BasicDetails;
