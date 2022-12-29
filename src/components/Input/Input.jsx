import { useState } from "react";
import axios from "axios";

import style from "./Input.module.css";

const Input = ({ expenses, day, data, setData, userLoggedIn }) => {
  const [inputs, setInputs] = useState({
    sum: "",
    card: "",
    category: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    const capValue =
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

    setInputs((prevState) => ({
      ...prevState,
      [name]: capValue,
    }));
  };
  const onSubmit = () => {
    if (!inputs.sum.length || !inputs.card.length || !inputs.category.length)
      return;

    const updatedData = [...data, inputs];
    setData(updatedData);
    if (!expenses.length) {
      const updatedExpenses = [{ date: day, data: updatedData }];
      userLoggedIn
        ? axios.post(`${process.env.REACT_APP_SERVER_URL}/daily`, {
            expenses: updatedExpenses,
          })
        : localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    } else {
      if (!userLoggedIn) {
        const expense = expenses.find(({ date }) => {
          const dbDate = new Date(date).toDateString();
          return dbDate === day.toDateString();
        });
        expense && localStorage.removeItem("expenses", JSON.stringify(expense));
        const updatedExpenses = [...expenses, { date: day, data: updatedData }];
        localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
        return;
      }
      axios.put(`${process.env.REACT_APP_SERVER_URL}/daily`, {
        date: day,
        data: updatedData,
      });
    }
    setInputs({
      sum: "",
      card: "",
      category: "",
    });
  };

  return (
    <form
      className={style.inputs}
      onKeyDown={(e) => {
        if (e.keyCode === 13) {
          onSubmit();
        }
      }}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        name="sum"
        value={inputs.sum}
        placeholder="Sum"
        onChange={onChange}
        required
      ></input>
      <input
        type="text"
        name="card"
        value={inputs.card}
        placeholder="Card"
        onChange={onChange}
        required
      ></input>
      <input
        type="text"
        name="category"
        value={inputs.category}
        placeholder="Category"
        onChange={onChange}
        required
      ></input>
      <button className={style.submit}>submit</button>
    </form>
  );
};

export default Input;
