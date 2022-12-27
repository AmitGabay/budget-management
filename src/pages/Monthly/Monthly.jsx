import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

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

const Monthly = ({ userLoggedIn, day }) => {
  const { pick } = useParams();
  if (pick) {
    day = new Date(`${pick} "1, 2022"`);
  }
  // const changeMonth = new Date(day).setMonth(day.getMonth() - 1);
  const monthBack = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    new Date(day).setMonth(day.getMonth() - 1)
  );
  const monthForward = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(new Date(day).setMonth(day.getMonth() + 1));

  const option = { month: "long" };
  const month = new Intl.DateTimeFormat("en-US", option).format(day);

  const [data, setData] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [mode, setMode] = useState("Card");

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

  const changeMode = () => {
    if (mode === "Card") {
      setMode("Category");
    } else {
      setMode("Card");
    }
  };

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
        expenses
          .filter(({ date }) => {
            const dbDate = new Date(date);
            return dbDate.getMonth() === day.getMonth();
          })
          .map(({ data }) => data)
          .flat();
      setData(makeSum(expense, mode.toLowerCase()));
    };

    getData();
  }, [userLoggedIn, mode, pick]);

  return (
    <div className={style.container}>
      <h2>Monthly Expense Summary of</h2>
      <h3>{month} by</h3>
      <h4 onClick={changeMode} className={style.mode}>
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
