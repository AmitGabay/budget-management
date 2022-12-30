import { useState } from "react";
import axios from "axios";

import style from "./Input.module.css";

const Input = ({ expenses, setExpenses, day, data, userLoggedIn }) => {
  const [inputs, setInputs] = useState({
    sum: 0,
    card: "",
    category: "",
  });

  const onKeyDown = (event) => {
    const {
      keyCode,
      target: { value },
    } = event;

    if (!value && keyCode === 32) event.preventDefault();
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    const capValue =
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

    setInputs((prevState) => ({
      ...prevState,
      [name]: capValue,
    }));
  };

  const onSubmit = async () => {
    if (!inputs.sum.length || !inputs.card.length || !inputs.category.length)
      return;

    const updatedData = [...data, inputs];

    setInputs({
      sum: 0,
      card: "",
      category: "",
    });

    if (userLoggedIn) {
      const { data: newExpenses } = await axios[
        expenses.length ? "put" : "post"
      ](`${process.env.REACT_APP_SERVER_URL}/daily`, {
        expenses: [{ date: day, data: updatedData }],
      });

      return setExpenses(newExpenses);
    }

    if (!expenses.length) {
      localStorage.setItem(
        "expenses",
        JSON.stringify([{ date: day, data: updatedData }])
      );
      return setExpenses([{ date: day, data: updatedData }]);
    }

    const updatedExpenses = expenses.filter(
      ({ date }) => new Date(date).toDateString() !== day.toDateString()
    );

    localStorage.setItem(
      "expenses",
      JSON.stringify([...updatedExpenses, { date: day, data: updatedData }])
    );

    setExpenses([...updatedExpenses, { date: day, data: updatedData }]);
  };

  return (
    <form
      className={style.inputs}
      onKeyDown={(e) => {
        if (e.keyCode === 13) onSubmit();
      }}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="number"
        name="sum"
        value={inputs.sum}
        placeholder="Sum"
        onChange={onChange}
        required
      />

      <input
        type="text"
        name="card"
        value={inputs.card}
        placeholder="Card"
        onKeyDown={onKeyDown}
        onChange={onChange}
        required
      />

      <input
        type="text"
        name="category"
        value={inputs.category}
        placeholder="Category"
        onKeyDown={onKeyDown}
        onChange={onChange}
        required
      />

      <button className={style.submit}>submit</button>
    </form>
  );
};

export default Input;
