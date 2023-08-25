import React, { useState } from "react";
import { Space, Table, Popconfirm, notification, Modal } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import AddForm from "../../../common/components/AddForm";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditDetails,
  resetEditState,
} from "../../../common/actions/CommonAction";
import { deleteExpenseTransaction } from "../../apis/ExpenseManagementAPI";
import moment from "moment";
import "../../css/EditModalOverride.css";
const ExpenseTable = ({ loading, setLoading }) => {
  const expenseDetails = useSelector(state => state.ExpenseReducer);
  const [modal1Open, setModalOpen] = useState(false);

  const [addForm, setAddForm] = useState({});
  const [AddFormErrors, setAddFormErrors] = useState({});
  const dispatch = useDispatch();

  const columns = [
    {
      title: "",
      key: "t_id",
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
        expenseDetails?.expenseTransactions.length > 0 &&
        expenseDetails?.expenseTransactions
          .map(d => d.description)
          .filter(
            (item, index) =>
              expenseDetails?.expenseTransactions
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
        expenseDetails?.expenseTransactions.length > 0 &&
        expenseDetails?.expenseTransactions
          .map(d => (d.category === "Other" ? d.category_others : d.category))
          .filter(
            (item, index) =>
              expenseDetails?.expenseTransactions
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
    setLoading(true);
    try {
      await deleteExpenseTransaction(expenseDetails, record, dispatch);
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
        title="Edit Expense"
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
          reducer={expenseDetails}
          formType={"Expense"}
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
        dataSource={expenseDetails?.expenseTransactions}
        style={{ margin: "20px" }}
        loading={loading}
        rowKey={record => record.t_id}
      />
    </>
  );
};
export default ExpenseTable;
