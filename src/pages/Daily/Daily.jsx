import React from "react";
import Table from "../../components/Table/Table";

const Daily = () => {
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

  const data = [
    {
      sum: 500,
      card: "hever",
      category: "food",
    },
  ];
  return (
    <div>
      <h2>Summary of expenses</h2>
      <h3>{date}</h3>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Daily;
