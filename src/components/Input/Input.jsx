import { useState } from "react";

import style from "./Input.module.css";

const Input = ({ setData }) => {
  const [Input, setInput] = useState({
    sum: "",
    card: "",
    category: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  };
  const onSubmit = () => {
    setData((prevValue) => [...prevValue, Input]);
    setInput({
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
        value={Input.sum}
        placeholder="Sum"
        onChange={onChange}
      ></input>
      <input
        type="text"
        name="card"
        value={Input.card}
        placeholder="Card"
        onChange={onChange}
      ></input>
      <input
        type="text"
        name="category"
        value={Input.category}
        placeholder="Category"
        onChange={onChange}
      ></input>
      {document.addEventListener("keypress", (e) => {
        if (e.keyCode === 13) {
          onSubmit();
        }
      })}
    </div>
  );
};

export default Input;
