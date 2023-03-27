import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

const Item = (props) => {
  const checkState = (id) => {
    props.onCheckState(id);
  };

  const editTodos = (id) => {
    props.onEditTodos(id);
  };

  const deleteTodos = (id) => {
    props.onDeleteTodos(id);
  };

  const dateEditor = (val) => {
    return JSON.stringify(val).slice(1, 11);
  };
  return (
    <React.Fragment key={props.id}>
      <div className="flex pt-5 gap-1 justify-between group">
        <div className="flex gap-3">
          <input
            checked={!props.status}
            onChange={() => checkState(props.id)}
            type="checkbox"
            className="accent-cyan-400 focus:accent-cyan-500 w-6 h-6 mt-3"
          />
          <p className={props.status ? "text-4xl" : "text-4xl line-through"}>
            {props.value}
          </p>
        </div>
        <div>
          <div className="flex gap-4 justify-end">
            <FontAwesomeIcon
              onClick={() => editTodos(props.id)}
              icon={faPen}
              className="text-cyan-500 text-xl my-auto cursor-pointer"
            />
            <FontAwesomeIcon
              onClick={() => deleteTodos(props.id)}
              icon={faTrash}
              className="text-cyan-500 text-xl my-auto cursor-pointer"
            />
          </div>
          <div className="flex gap-4 pt-3">
            <FontAwesomeIcon
              icon={faInfoCircle}
              className={`text-xl my-auto ${props.priority === 'High' ? 'text-red-500' : props.priority === 'Medium' ? 'text-orange-500' : 'text-slate-500'}`}
            />
            <p className="my-auto">{dateEditor(props.date)}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Item;
