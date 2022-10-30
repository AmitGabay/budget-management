import React, { useState } from "react";
import Table from "../../components/Table/Table";
import Input from "../../components/Input/Input";

const Daily = () => {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const [add, setAdd] = useState(true);
  const [data, setData] = useState([
    {
      sum: 500,
      card: "hever",
      category: "food",
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
    {
      Header: "Category",
      accessor: "category",
    },
  ];

  const onClick = () => {
    setAdd(!add);
  };

  return (
    <div>
      <h2>Summary of expenses</h2>
      <h3>{date}</h3>
      <Table columns={columns} data={data} />
      {!add && <Input setData={setData} />}
      <button onClick={onClick}>{add ? "(+)" : "(-)"}</button>
    </div>
  );
};

export default Daily;
