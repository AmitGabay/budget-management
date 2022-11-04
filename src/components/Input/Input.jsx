import { useState } from "react";

import style from "./Input.module.css";

const Input = ({ data, setData }) => {
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
    setData((prevValue) => [...prevValue, inputs]);
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
