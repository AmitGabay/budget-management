import React, { useState, useEffect } from "react";
import axios from "axios";

import Table from "../../components/Table/Table";

import style from "./Monthly.module.css";

const Monthly = ({ userLoggedIn, day }) => {
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(day);

  const [rawData, setRawData] = useState([]);
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

  const makeSum = () => {
    let sum = rawData.sort();
    let i = 0;
    while (sum.length !== 0) {
      if (sum[i].card === sum[i + 1].card) {
      }
    }
    console.log(rawData);
    setData(sum);
  };

  useEffect(() => {
    if (!userLoggedIn) return;

    const getData = async () => {
      const { data: expenses } = await axios(
        `${process.env.REACT_APP_SERVER_URL}/`
      );
      setExpenses(expenses);
      const expense = expenses.find(({ date }) => {
        const dbDate = new Date(date);
        return dbDate.getMonth() === day.getMonth();
      });
      setRawData(expense.data);
      makeSum();
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
