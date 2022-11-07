import React, { useState, useEffect } from "react";
import axios from "axios";

import Table from "../../components/Table/Table";
import Input from "../../components/Input/Input";

import style from "./Daily.module.css";

const Daily = ({ userLoggedIn, day }) => {
  const [data, setData] = useState([]);
  const [expenses, setExpenses] = useState([]);
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

  useEffect(() => {
    if (!userLoggedIn) return;

    const getData = async () => {
      const { data: expenses } = await axios(
        `${process.env.REACT_APP_SERVER_URL}/`
      );
      setExpenses(expenses);
      const expense = expenses.find(({ date }) => date === day);
      setData(expense.data);
    };

    getData();
  }, [userLoggedIn]);

  return (
    <div className={style.container}>
      <h2>Summary of Expenses</h2>
      <h3>{day}</h3>
      <Table columns={columns} data={data} />
      <Input day={day} expenses={expenses} data={data} setData={setData} />
    </div>
  );
};

export default Daily;
