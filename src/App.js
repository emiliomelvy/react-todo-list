import React, { useEffect, useState } from "react";
import "./App.css";
import Title from "./components/Title";
import Input from "./components/Input";
import Item from "./components/Item";
import FilterSort from "./components/FilterSort";
import LoggedIn from "./components/LoggedIn";

function App() {
  const [filter, setFilter] = useState("All");
  const [newTask, setNewTask] = useState("");
  const [toggleAdd, setToggleAdd] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);
  const [itemPriority, setItemPriority] = useState('')
  const [dateValue, setDateValue] = useState(new Date());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [buttonLogin, setButtonLogin] = useState(false);
  const [todo, setTodo] = useState([
    {
      id: Math.random(),
      value: "testk",
      status: true,
      priority: 'High',
      date: new Date(),
    },
    {
      id: Math.random(),
      value: "yow",
      status: true,
      priority: 'Medium',
      date: new Date(),
    },
  ]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  const newItem = JSON.parse(localStorage.getItem("todos"));

  const userLogin = localStorage.getItem('login')

  useEffect(() => {
    if (userLogin === '1') setIsLoggedIn(true)
    if (newItem) {
      setTodo(newItem);
    }
  }, []);

  const addTask = () => {
    if (newTask && toggleAdd === false) {
      return setTodo(
        todo.map((val) => {
          if (isEditItem && val.id === isEditItem) {
            return { ...val, value: newTask, priority: itemPriority, date: new Date(dateEditor(dateValue)) };
          }
          setNewTask("");
          setDateValue(new Date());
          setToggleAdd(true);
          setItemPriority('Low')
          return val;
        })
      );
    }
    let num = Math.random();
    if (dateValue === "" || newTask === "") return;
    let newTodo = {
      id: num,
      value: newTask,
      status: true,
      priority: itemPriority,
      date: new Date(dateEditor(dateValue)),
    };
    setTodo([...todo, newTodo]);
    setNewTask("");
    setDateValue(new Date());
    setItemPriority('Low')
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
    setDateValue(new Date(dateEditor(newEdit.date)));
    setToggleAdd(false);
    setItemPriority(newEdit.priority)
  };

  const dateEditor = (val) => {
    return JSON.stringify(val).slice(1, 11);
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="xl:max-w-5xl container mx-auto">
          <Title setIsLoggedIn={setIsLoggedIn} />
          <Input
            newTask={newTask}
            dateValue={dateValue}
            itemPriority={itemPriority}
            onUpdateTask={(val) => updateTask(val)}
            onSetDateValue={(val) => setDateValue(val)}
            onSetItemPriority={(val) => setItemPriority(val)}
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
                    priority={x.priority}
                    date={x.date}
                    key={index}
                    onCheckState={(id) => checkState(id)}
                    onEditTodos={(id) => editTodos(id)}
                    onDeleteTodos={(id) => deleteTodos(id)}
                    onAddTask={() => addTask}
                  />
                );
              })}
          </section>
        </div>
      ) : (
        <LoggedIn
          buttonLogin={buttonLogin}
          setButtonLogin={(val) => setButtonLogin(val)}
          isValidEmail={isValidEmail}
          setValidEmail={(val) => setIsValidEmail(val)}
          isValidPassword={isValidPassword}
          setIsValidPassword={(val) => setIsValidPassword(val)}
          setIsLoggedIn={() => setIsLoggedIn(true)}
        />
      )}
    </>
  );
}

export default App;
