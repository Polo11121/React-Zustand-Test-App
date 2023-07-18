import { useState, ComponentProps } from "react";
import { shallow } from "zustand/shallow";
import { useStore } from "store";
import { Task } from "components";
import classnames from "classnames";
import "./Column.scss";

export const Column = ({ state }: { state: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDrop, setIsDrop] = useState(false);

  const tasks = useStore(
    (store) => store.tasks.filter((task) => task.state === state),
    shallow
  );
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const addTask = useStore((store) => store.addTask);
  const moveTask = useStore((store) => store.moveTask);

  const submitHandler: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();

    const title = new FormData(event.currentTarget).get("title") as string;

    addTask({ title, state });
    setIsOpen(false);
  };

  const dropHandler = () => {
    moveTask(state);
    setIsDrop(false);
    setDraggedTask(null);
  };

  return (
    <div
      className={classnames("column", { "column--drop": isDrop })}
      onDragOver={(event) => {
        setIsDrop(true);
        event.preventDefault();
      }}
      onDragLeave={(event) => {
        setIsDrop(false);
        event.preventDefault();
      }}
      onDrop={dropHandler}
    >
      <div className="column__header">
        <div className="column__state">{state}</div>
        <button onClick={() => setIsOpen(true)} className="column__button">
          Add
        </button>
      </div>
      {tasks.map(({ id, title }) => (
        <Task id={id} key={id} title={title} />
      ))}
      {isOpen && (
        <div className="column__modal">
          <form onSubmit={submitHandler} className="column__modal-content">
            <input
              placeholder="Task title..."
              autoFocus
              name="title"
              type="text"
            />
            <button>Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};
