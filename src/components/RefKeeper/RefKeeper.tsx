import { useRef, useEffect } from "react";
import { useStore } from "store";
import { Task } from "types";

export const RefKeeper = () => {
  const ref = useRef<Task[]>();

  useEffect(() => {
    useStore.subscribe(
      (store) => store.tasks,
      (tasks) => (ref.current = tasks)
    );
  }, []);

  return ref.current;
};
