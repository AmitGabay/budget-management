import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import Table from "../../components/Table/Table";
import Input from "../../components/Input/Input";
import style from "./Daily.module.css";

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

const Daily = ({ userLoggedIn }) => {
  const [data, setData] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const { pick } = useParams();

  const day = useMemo(() => (pick ? new Date(pick) : new Date()), [pick]);

  useEffect(() => {
    const getExpenses = async () => {
      if (userLoggedIn) {
        const { data: expenses } = await axios(
          `${process.env.REACT_APP_SERVER_URL}/`
        );
        setExpenses(expenses);
      } else setExpenses(JSON.parse(localStorage.expenses || "[]"));
    };

    getExpenses();
  }, [userLoggedIn]);

  useEffect(() => {
    const expense = expenses?.find(
      ({ date }) => new Date(date).toDateString() === day.toDateString()
    );

    setData(expense?.data || []);
  }, [expenses, pick, day]);

  const changeDay = new Date(day.toISOString());
  const dayBack = new Date(changeDay.setDate(changeDay.getDate() - 1));
  const dayForward = new Date(changeDay.setDate(changeDay.getDate() + 2));

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
