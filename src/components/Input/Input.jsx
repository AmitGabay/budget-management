import { useState } from "react";

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
    <div>
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
      <button onClick={onSubmit}>V</button>
    </div>
  );
};

export default Input;
