import React, { useState } from "react";
import { Avatar, Button, Modal, message } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import { updateUserAvatar } from "../../apis/UserManagementAPI";
import { useDispatch } from "react-redux";

const UserAvatar = ({ name, avatar }) => {
  const dispatch = useDispatch();
  const [currentAvatar, setCurrentAvatar] = useState(avatar);
  const [selectedAvatar, setSelectedAvatar] = useState(avatar);
  const [loading, setLoading] = useState(false);
  const avatarLists = [
    {
      id: 1,
      avatar: "1.png",
    },
    {
      id: 2,
      avatar: "2.svg",
    },
    {
      id: 3,
      avatar: "3.svg",
    },
    {
      id: 4,
      avatar: "4.svg",
    },
    {
      id: 5,
      avatar: "5.svg",
    },
    {
      id: 6,
      avatar: "6.svg",
    },
    {
      id: 7,
      avatar: "7.png",
    },
    {
      id: 8,
      avatar: "8.png",
    },
    {
      id: 9,
      avatar: "9.png",
    },
    {
      id: 10,
      avatar: "10.png",
    },
    {
      id: 11,
      avatar: "11.png",
    },
    {
      id: 12,
      avatar: "12.png",
    },
    {
      id: 13,
      avatar: "13.png",
    },
    {
      id: 14,
      avatar: "14.png",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    if (selectedAvatar) {
      setLoading(true);
      // Update avatar at backend
      await updateUserAvatar(selectedAvatar, dispatch)
        .then(response => {
          message.success(response);
          setCurrentAvatar(selectedAvatar);
          setIsModalOpen(false);
        })
        .catch(error => {
          message.error(error || "Something went wrong! Please try again.");
        });
    } else {
      if (currentAvatar) {
        setLoading(true);
        setCurrentAvatar(null);
        // Remove avatar at backend
        await updateUserAvatar(null, dispatch)
          .then(() => {
            message.success("User avatar removed successfully!");
            setIsModalOpen(false);
          })
          .catch(error => {
            message.error(error || "Something went wrong! Please try again.");
          });
      }
    }
    setLoading(false);
  };
  const handleCancel = () => {
    setSelectedAvatar(currentAvatar);
    setIsModalOpen(false);
  };
  const handleDeleteAvatar = () => {
    setSelectedAvatar(null);
  };
  return (
    <>
      <Avatar
        style={{
          color: "#f56a00",
          backgroundColor: "rgb(251 231 255)",
          textTransform: "uppercase",
          fontSize: "40px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
        size={{
          xs: 70,
          sm: 80,
          md: 100,
          lg: 150,
          xl: 150,
          xxl: 100,
        }}
        src={process.env.PUBLIC_URL + "/images/avatars/" + currentAvatar}
      >
        {" "}
        {name?.charAt(0)}
      </Avatar>
      <Button
        type="primary"
        shape="circle"
        icon={<CameraOutlined />}
        style={{ position: "relative", right: "30px", top: "40px" }}
        onClick={showModal}
      />
      {/* Display avatars */}
      <Modal
        title="Select Your Avatar"
        open={isModalOpen}
        closable={false}
        width="60%"
        bodyStyle={{ height: "50vh", overflowY: "scroll" }}
        footer={[
          currentAvatar && (
            <Button type="danger" key="delete" onClick={handleDeleteAvatar}>
              Remove Avatar
            </Button>
          ),
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="ok" type="primary" onClick={handleOk} loading={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>,
        ]}
      >
        {avatarLists.map(a => (
          <Avatar
            key={a.id}
            onClick={() => {
              setSelectedAvatar(a.avatar);
            }}
            style={{
              color: "#f56a00",
              backgroundColor: "rgb(251 231 255)",
              textTransform: "uppercase",
              fontSize: "40px",
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
              margin: "5px",
              border:
                selectedAvatar === a.avatar ? "4px solid #52c41a " : "none",
            }}
            size={{
              xs: 70,
              sm: 80,
              md: 100,
              lg: 150,
              xl: 150,
              xxl: 100,
            }}
            src={process.env.PUBLIC_URL + "/images/avatars/" + a.avatar}
          />
        ))}
      </Modal>
    </>
  );
};

export default UserAvatar;
