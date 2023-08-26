import React from "react";

import { Pie } from "@ant-design/plots";

const CashInsights = ({ data }) => {
  const config = {
    appendPadding: 10,
    data,
    angleField: "amount",
    colorField: "category",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} Rs. {value}",
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],
  };
  return data.length > 0 ? <Pie {...config} /> : <NoDataFound />;
};

const NoDataFound = () => {
  const data = [
    {
      type: "N/A",
      value: 0,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,

    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "No Data Found!",
      },
    },
  };

  return <Pie {...config} />;
};

export default CashInsights;
