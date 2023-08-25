import React, { useState } from "react";
import { Space, Table, Popconfirm, notification, Modal } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditDetails,
  resetEditState,
} from "../../../common/actions/CommonAction";
import { deleteSavingTransaction } from "../../apis/SavingManagementAPI";
import moment from "moment";
import AddForm from "../../../common/components/AddForm";
import "../../css/EditModalOverride.css";

const SavingsTable = ({ loading, setLoading }) => {
  const savingDetails = useSelector(state => state.SavingReducer);

  const [modal1Open, setModalOpen] = useState(false);
  const [addForm, setAddForm] = useState({});
  const [AddFormErrors, setAddFormErrors] = useState({});
  const dispatch = useDispatch();

  const columns = [
    {
      title: "",
      key: "id",
      render: record => (
        <Space
          size="middle"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <EditFilled
            style={{ color: "#1890ff", cursor: "pointer" }}
            onClick={() => handleEdit(record)}
          />
        </Space>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      filterSearch: true,
      filters:
        savingDetails?.savingTransactions.length > 0 &&
        savingDetails?.savingTransactions
          .map(d => d.description)
          .filter(
            (item, index) =>
              savingDetails?.savingTransactions
                .map(d => d.description)
                .indexOf(item) === index
          )
          .map(element => {
            return { text: element, value: element };
          }),
      onFilter: (value, record) => record.description.startsWith(value),
    },
    {
      title: "Category",
      key: "category",
      render: record => (
        <>
          {record.category === "Other"
            ? record.category_others
            : record.category}
        </>
      ),
      filterSearch: true,
      filters:
        savingDetails?.savingTransactions.length > 0 &&
        savingDetails?.savingTransactions
          .map(d => (d.category === "Other" ? d.category_others : d.category))
          .filter(
            (item, index) =>
              savingDetails?.savingTransactions
                .map(d =>
                  d.category === "Other" ? d.category_others : d.category
                )
                .indexOf(item) === index
          )
          .map(element => {
            return { text: element, value: element };
          }),
      onFilter: (value, record) =>
        record.category === "Other"
          ? record.category_others.startsWith(value)
          : record.category.startsWith(value),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) =>
        moment(a.date, "DD/MM/YYYY").unix() -
        moment(b.date, "DD/MM/YYYY").unix(),
    },
    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount",
    },
    {
      title: "Remarks",
      key: "remarks",
      dataIndex: "remarks",
    },
    {
      title: "",
      key: "id",
      render: record => (
        <Space
          size="middle"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Popconfirm
            title="Are you sure you want to Delete?"
            onConfirm={() => {
              handleDelete(record);
            }}
            okText="Yes"
            cancelText="No"
          >
            <DeleteFilled
              style={{ color: "#ff4d4f", cursor: "pointer" }}
            ></DeleteFilled>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleEdit = record => {
    // populate add form reducer state - editing
    setAddForm(record);
    dispatch(setEditDetails(record));
    setModalOpen(true);
  };
  const handleDelete = async record => {
    //update reducer state - deletion
    setLoading(true);
    try {
      await deleteSavingTransaction(savingDetails, record, dispatch);
    } catch (error) {
      notification.error({
        message: "Error",
        description: error ? error.message : "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }

    notification.success({
      message: "Deleted Successfully",
    });
  };
  return (
    <>
      <Modal
        title="Edit Savings"
        style={{
          top: 20,
        }}
        open={modal1Open}
        onCancel={() => setModalOpen(false)}
        footer={null}
        maskClosable={false}
        afterClose={() => {
          dispatch(resetEditState());
          setAddForm({});
        }}
      >
        <AddForm
          reducer={savingDetails}
          formType={"Saving"}
          setModal={setModalOpen}
          addForm={addForm}
          setAddForm={setAddForm}
          AddFormErrors={AddFormErrors}
          setAddFormErrors={setAddFormErrors}
        />
      </Modal>
      <Table
        bordered={true}
        columns={columns}
        dataSource={savingDetails?.savingTransactions}
        style={{ margin: "20px" }}
        loading={loading}
        rowKey={record => record.t_id}
      />
    </>
  );
};
export default SavingsTable;
