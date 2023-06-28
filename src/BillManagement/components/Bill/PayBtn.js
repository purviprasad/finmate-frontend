import React from "react";

import { Button, Popconfirm } from "antd";
import AddBillFormCss from "../../css/AddBillForm.module.css";

const PayBtn = ({ record, handlePay }) => {
  const [btnLoading, setBtnLoading] = React.useState(false);
  return (
    <Popconfirm
      title="Are you sure the bill is Paid?"
      onConfirm={async () => {
        setBtnLoading(true);
        await handlePay(record);
        setBtnLoading(false);
      }}
      okText="Yes"
      cancelText="No"
    >
      <Button className={AddBillFormCss.payButton} loading={btnLoading}>
        {btnLoading ? <>Paying ...</> : <>Pay</>}
      </Button>
    </Popconfirm>
  );
};

export default PayBtn;
