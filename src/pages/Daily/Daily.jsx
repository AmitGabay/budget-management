import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
  const changeDay = new Date(day.toISOString());
  const dayBack = new Date(
    changeDay.setDate(changeDay.getDate() - 1)
  ).toLocaleDateString("de-DE");

  useEffect(() => {
    if (!userLoggedIn) return;

    const getData = async () => {
      const { data: expenses } = await axios(
        `${process.env.REACT_APP_SERVER_URL}/`
      );
      setExpenses(expenses);
      const expense = expenses.find(({ date }) => {
        const dbDate = new Date(date).toDateString();
        return dbDate === day.toDateString();
      });
      setData(expense.data);
    };

    getData();
  }, [userLoggedIn]);

  return (
    <div className={style.container}>
      <h2>Summary of Expenses</h2>
      <h3>{day.toLocaleDateString("de-DE")}</h3>
      <Table columns={columns} data={data} />
      <Input day={day} expenses={expenses} data={data} setData={setData} />
      <Link to={`/${dayBack}`}>
        <span>{dayBack}</span>
      </Link>
    </div>
  );
};

export default Daily;
