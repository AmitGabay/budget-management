import { useState } from "react";
import axios from "axios";

import style from "./Input.module.css";

const Input = ({ expenses, day, data, setData }) => {
  const [inputs, setInputs] = useState({
    sum: "",
    card: "",
    category: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };
  const onSubmit = () => {
    const updatedData = [...data, inputs];
    setData(updatedData);
    if (!expenses.length) {
      axios.post(`${process.env.REACT_APP_SERVER_URL}/daily`, {
        expenses: [{ date: day, data: updatedData }],
      });
    } else {
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
    <div className={style.inputs}>
      <input
        type="text"
        name="sum"
        value={inputs.sum}
        placeholder="Sum"
        onChange={onChange}
      ></input>
      <input
        type="text"
        name="card"
        value={inputs.card}
        placeholder="Card"
        onChange={onChange}
      ></input>
      <input
        type="text"
        name="category"
        value={inputs.category}
        placeholder="Category"
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            onSubmit();
          }
        }}
      ></input>
    </div>
  );
};

export default Input;
