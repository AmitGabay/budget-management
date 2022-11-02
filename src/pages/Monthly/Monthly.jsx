import React, { useState } from "react";

import Table from "../../components/Table/Table";

import style from "./Monthly.module.css";

const Monthly = () => {
  const current = new Date();
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    current
  );

  const [data, setData] = useState([
    {
      sum: "500",
      card: "hever",
    },
  ]);

  const columns = [
    {
      Header: "Sum",
      accessor: "sum",
    },
    {
      Header: "Card",
      accessor: "card",
    },
  ];

  return (
    <div className={style.container}>
      <h2>Monthly Expense Summary of</h2>
      <h3>{month}</h3>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Monthly;
