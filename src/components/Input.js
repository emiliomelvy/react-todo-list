import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faAdd } from "@fortawesome/free-solid-svg-icons";

const Input = (props) => {
  const updateTask = (val) => {
    props.onUpdateTask(val);
  };

  const setDateValue = (val) => {
    props.onSetDateValue(val);
  };

  const dateEditor = (val) => {
    return JSON.stringify(val).slice(1, 11);
  };

  return (
    <div className="border-b max-w-6xl mx-auto pb-10">
      <div className="pt-14 flex justify-center gap-5">
        <input
          onChange={(e) => {
            updateTask(e);
          }}
          value={props.newTask}
          type="text"
          placeholder="Add New .."
          className="border border-pink-500 rounded h-14 px-6"
        />
        <input
          onClick={(e) => {
            setDateValue(e.target.value);
          }}
          onChange={(e) => setDateValue(e.target.value)}
          value={dateEditor(props.dateValue)}
          type="date"
          min="2023-03-16"
          className="rounded border border-pink-500 px-2"
        />
        {props.toggleAdd ? (
          <FontAwesomeIcon
            onClick={props.onAddTask}
            icon={faAdd}
            className="cursor-pointer text-cyan-500 text-2xl my-auto"
          />
        ) : (
          <FontAwesomeIcon
            onClick={props.onAddTask}
            icon={faEdit}
            className="cursor-pointer text-cyan-500 text-2xl my-auto"
          />
        )}
      </div>
    </div>
  );
};

export default Input;
