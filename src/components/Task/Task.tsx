import classNames from "classnames";
import TrashIcon from "assets/thrash-icon.svg";
import { useStore } from "store";
import "./Task.scss";

export const Task = ({ title, id }: { title: string; id: number }) => {
  const task = useStore((store) => store.tasks.find((task) => task.id === id));
  const deleteTask = useStore((store) => store.deleteTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);

  const deleteHandler = () => deleteTask(id);
  const startDragHandler = () => setDraggedTask(id);
  const stopDragHandler = () => setDraggedTask(null);

  return (
    <div
      className="task"
      draggable
      onDragStart={startDragHandler}
      onDragEnd={stopDragHandler}
    >
      <div>{title}</div>
      <div className="task__content">
        <div>
          <img className="task__icon" src={TrashIcon} onClick={deleteHandler} />
        </div>
        <div
          className={classNames(
            "task__status",
            `task__status--${task?.state || "planned"}`
          )}
        >
          {task?.state}
        </div>
      </div>
    </div>
  );
};
