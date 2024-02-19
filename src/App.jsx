import "./App.css";
import { useState, useEffect } from "react";

export default function App() {
  const [input, SetInput] = useState(() => {
    const savedItem = localStorage.getItem("input");
    return savedItem ? JSON.parse(savedItem) : "";
  });
  const [category, SetCategory] = useState([]);

  useEffect(() => {
    localStorage.setItem("input", JSON.stringify(input));
  }, [input]);
  return (
    <main>
      <ExpenseInput
        input={input}
        SetInput={SetInput}
        category={category}
        SetCategory={SetCategory}
      />
      <ExpenseList input={input} SetInput={SetInput} />
      <ExpenseSummary input={input} />
      <Reset SetInput={SetInput} />
    </main>
  );
}

function ExpenseInput({ input, SetInput, category, SetCategory }) {
  const [selectedCategory, setSelectedCategory] = useState("food");
  const [amount, setAmount] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const newCategory = selectedCategory || "food";
    SetInput([...input, { category: newCategory, amount: amount }]);
    setAmount("");
    setSelectedCategory("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>How much did you spend</label>
      <input
        type="text"
        placeholder="enter your expense"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      ></input>
      <label>Choose your category of expense</label>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="food">Food</option>
        <option value="transport">Transportation</option>
        <option value="education">Education</option>
        <option value="housing">Housing</option>
        <option value="others">Others</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}

function ExpenseList({ input, SetInput }) {
  function handleClick(e, index) {
    e.preventDefault();
    const updateInput = [...input];
    updateInput.splice(index, 1);
    SetInput(updateInput);
  }

  return (
    <ul>
      {input.map((item, index) => (
        <li key={index}>
          {item.amount} - {item.category}{" "}
          <button onClick={(e) => handleClick(e, index)}>X</button>
        </li>
      ))}
    </ul>
  );
}

function ExpenseSummary({ input }) {
  const total = input.reduce((acc, curr) => acc + Number(curr.amount), 0);
  return (
    <div>
      <h2>Total Expenses</h2>
      {total}
    </div>
  );
}

function Reset({ SetInput }) {
  function handleReset(e) {
    e.preventDefault();
    SetInput([]);
  }
  return <button onClick={handleReset}>Reset</button>;
}
