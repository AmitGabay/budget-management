import React from "react";

import Table from "../../components/Table/Table";
import Input from "../../components/Input/Input";

import style from "./Daily.module.css";

const Daily = ({ data, setData }) => {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const columns = [
    {
      Header: "Sum",
      accessor: "sum",
    },
    {
      Header: "Card",
      accessor: "card",
    },
    {
      Header: "Category",
      accessor: "category",
    },
  ];

  return (
    <div className={style.container}>
      <h2>Summary of Expenses</h2>
      <h3>{date}</h3>
      <Table columns={columns} data={data} />
      <Input data={data} setData={setData} />
    </div>
  );
};

export default Daily;
