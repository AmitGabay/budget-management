import React, { useState, useMemo, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Table from "../../components/Table/Table";
import style from "./Monthly.module.css";

const makeSum = (expenses, mode) => {
  const cardsMap = expenses.reduce((acc, expense) => {
    if (acc[expense[mode]]) acc[expense[mode]] += expense.sum;
    else acc[expense[mode]] = expense.sum;

    return acc;
  }, {});

  const groupedExpenses = [];

  for (const mode in cardsMap) {
    groupedExpenses.push({ mode, sum: cardsMap[mode] });
  }

  return groupedExpenses;
};

const Monthly = ({ userLoggedIn }) => {
  const [data, setData] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [mode, setMode] = useState("Card");

  const { pick } = useParams();

  const day = useMemo(
    () => (pick ? new Date(`${pick} "1"`) : new Date()),
    [pick]
  );

  useEffect(() => {
    const getExpenses = async () => {
      if (userLoggedIn) {
        const { data: expenses } = await axios(
          `${process.env.REACT_APP_SERVER_URL}/`
        );
        setExpenses(expenses);
      } else {
        setExpenses(JSON.parse(localStorage.expenses || "[]"));
      }
    };

    getExpenses();
  }, [userLoggedIn]);

  useEffect(() => {
    const expense = expenses
      ?.filter(({ date }) => {
        const dbDate = new Date(date);

        return (
          dbDate.getMonth() === day.getMonth() &&
          dbDate.getYear() === day.getYear()
        );
      })
      .map(({ data }) => data)
      .flat();

    setData(makeSum(expense, mode.toLowerCase()));
  }, [expenses, mode, pick, day]);

  const columns = [
    {
      Header: "Sum",
      accessor: "sum",
    },
    {
      Header: mode,
      accessor: "mode",
    },
  ];

  const option = { month: "long", year: "numeric" };

  const monthBack = new Intl.DateTimeFormat("en-US", option).format(
    new Date(day).setMonth(day.getMonth() - 1)
  );

  const monthForward = new Intl.DateTimeFormat("en-US", option).format(
    new Date(day).setMonth(day.getMonth() + 1)
  );

  const month = new Intl.DateTimeFormat("en-US", option).format(day);

  return (
    <div className={style.container}>
      <h2>Monthly Expense Summary of</h2>

      <h3>{month} by</h3>

      <h4
        onClick={() => setMode(mode === "Card" ? "Category" : "Card")}
        className={style.mode}
      >
        {mode}
      </h4>

      <Table columns={columns} data={data} />

      <div className={style.flipping}>
        <Link className={style.link} to={`/month/${monthBack}`}>
          <span>{monthBack}</span>
        </Link>

        <Link className={style.link} to={`/month/${monthForward}`}>
          <span>{monthForward}</span>
        </Link>
      </div>
    </div>
  );
};

export default Monthly;
