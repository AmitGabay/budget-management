import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

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
  const { pick } = useParams();
  if (pick) {
    day = new Date(pick);
  }
  const changeDay = new Date(day.toISOString());
  const dayBack = new Date(changeDay.setDate(changeDay.getDate() - 1));
  const dayForward = new Date(changeDay.setDate(changeDay.getDate() + 2));

  useEffect(() => {
    const getData = async () => {
      if (userLoggedIn) {
        const { data: expenses } = await axios(
          `${process.env.REACT_APP_SERVER_URL}/`
        );
        setExpenses(expenses);
      } else {
        setExpenses(JSON.parse(localStorage.expenses || "[]"));
      }

      const expense =
        expenses &&
        expenses.find(({ date }) => {
          const dbDate = new Date(date).toDateString();
          return dbDate === day.toDateString();
        });
      setData(expense ? expense.data : []);
    };

    getData();
  }, [userLoggedIn, pick]);

  return (
    <div className={style.container}>
      <h2>Summary of Expenses</h2>
      <h3>{day.toLocaleDateString("de-DE")}</h3>
      <Table columns={columns} data={data} />
      <Input
        day={day}
        expenses={expenses}
        data={data}
        setData={setData}
        userLoggedIn={userLoggedIn}
      />
      <div className={style.flipping}>
        <Link className={style.link} to={`/${dayBack.toISOString()}`}>
          <span>{dayBack.toLocaleDateString("de-DE")}</span>
        </Link>
        <Link className={style.link} to={`/${dayForward.toISOString()}`}>
          <span>{dayForward.toLocaleDateString("de-DE")}</span>
        </Link>
      </div>
    </div>
  );
};

export default Daily;
