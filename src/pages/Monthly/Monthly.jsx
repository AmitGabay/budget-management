import React, { useState, useEffect } from "react";
import axios from "axios";

import Table from "../../components/Table/Table";

import style from "./Monthly.module.css";

const Monthly = ({ userLoggedIn, current }) => {
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    current
  );

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
  ];

  useEffect(() => {
    if (!userLoggedIn) return;

    const getData = async () => {
      const { data: expenses } = await axios(
        `${process.env.REACT_APP_SERVER_URL}/`
      );
      setExpenses(expenses);
      const expense = expenses.find(({ date }) => {
        const dbDate = new Date(date);
        console.log(date, dbDate.getMonth(), current);
        return dbDate.getMonth() === current.getMonth();
      });
      setData(expense.data);
      console.log(data);
    };

    getData();
  }, [userLoggedIn]);

  return (
    <div className={style.container}>
      <h2>Monthly Expense Summary of</h2>
      <h3>{month}</h3>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Monthly;
