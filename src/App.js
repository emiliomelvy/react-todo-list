import React, { useEffect } from "react";
import "./App.css";
import Title from "./components/Title";
import Input from "./components/Input";
import Item from "./components/Item";
import FilterSort from "./components/FilterSort";

function App() {
  const [todo, setTodo] = React.useState([
    {
      id: Math.random(),
      value: "testk",
      status: true,
      date: "2023-03-10",
    },
    {
      id: Math.random(),
      value: "yow",
      status: true,
      date: "2023-03-11",
    },
  ]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  const newItem = JSON.parse(localStorage.getItem("todos"));

  useEffect(() => {
    if (newItem) {
      setTodo(newItem);
    }
  }, []);

  const [newTask, setNewTask] = React.useState("");
  const [toggleAdd, setToggleAdd] = React.useState(true);

  const [isEditItem, setIsEditItem] = React.useState(null);

  const addTask = () => {
    if (newTask && toggleAdd === false) {
      return setTodo(
        todo.map((val) => {
          if (isEditItem && val.id === isEditItem) {
            return { ...val, value: newTask, date: dateValue };
          }
          setNewTask("");
          setDateValue("");
          setToggleAdd(true);
          return val;
        })
      );
    }
    let num = Math.random();
    if (dateValue === "" || newTask === "") return;
    let newTodo = {
      id: num.toString(),
      value: newTask,
      status: true,
      date: dateValue,
    };
    setTodo([...todo, newTodo]);
    setNewTask("");
    setDateValue("");
  };

  const checkState = (id) => {
    let newState = todo.map((x) => {
      if (x.id === id) {
        return { ...x, status: !x.status };
      }
      return x;
    });
    setTodo(newState);
  };

  const updateTask = (e) => {
    setNewTask(e.target.value);
  };

  const [dateValue, setDateValue] = React.useState("2023-03-16");

  const [filter, setFilter] = React.useState("All");

  const getSort = (e) => {
    const filteredTodos = todo.filter((x) => x.status === true);
    if (e.target.value === "-- Sort By --") return;
    let sortedTodos;
    if (e.target.value === "Ascending") {
      sortedTodos = [...filteredTodos].sort((a, b) => {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
      });
    } else if (e.target.value === "Descending") {
      sortedTodos = [...filteredTodos].sort((a, b) => {
        if (a.date > b.date) return -1;
        if (a.date < b.date) return 1;
        return 0;
      });
    }
    if (sortedTodos)
      return setTodo(
        sortedTodos.concat(todo.filter((x) => x.status === false))
      );
  };

  const deleteTodos = (id) => {
    const deletedTodo = [...todo].filter((val) => {
      return val.id !== id;
    });
    setTodo(deletedTodo);
  };

  const editTodos = (id) => {
    let newEdit = todo.find((el) => {
      return el.id === id;
    });
    setNewTask(newEdit.value);
    setIsEditItem(id);
    setDateValue(newEdit.date);
    setToggleAdd(false);
  };
  return (
    <div className="xl:max-w-5xl container mx-auto">
      <Title />
      <Input
        newTask={newTask}
        dateValue={dateValue}
        onUpdateTask={(val) => updateTask(val)}
        onSetDateValue={(val) => setDateValue(val)}
        toggleAdd={toggleAdd}
        onAddTask={addTask}
      />
      <section>
        <FilterSort
          filter={filter}
          onSetFilter={(val) => setFilter(val)}
          onGetSort={(val) => getSort(val)}
        />
        {todo
          .filter((x) => {
            return filter === "Completed"
              ? x.status === false
              : filter === "Has Due Date"
              ? x.status === true
              : true;
          })
          .map((x, index) => {
            return (
              <Item
                id={x.id}
                value={x.value}
                status={x.status}
                date={x.date}
                key={index}
                onCheckState={(id) => checkState(id)}
                onEditTodos={(id) => editTodos(id)}
                ondeleteTodos={(id) => deleteTodos(id)}
                onAddTask={() => addTask}
              />
            );
          })}
      </section>
    </div>
  );
}

export default App;
