import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { produce } from "immer";
import { create } from "zustand";
import { KanbanState } from "types";

export const useStore = create<KanbanState>()(
  devtools(
    subscribeWithSelector(
      persist(
        (set) => ({
          tasks: [],
          tasksInOngoing: 0,
          addTask: ({ title, state }) =>
            set(
              produce((store: KanbanState) => {
                store.tasks.push({ id: store.tasks.length + 1, title, state });
              }),
              // (store) => ({
              //   tasks: [
              //     ...store.tasks,
              //     { id: store.tasks.length + 1, title, state },
              //   ],
              // }),
              false,
              "addTask"
            ),
          deleteTask: (id) =>
            set((store) => ({
              tasks: store.tasks.filter((task) => task.id !== id),
            })),
          setDraggedTask: (task) =>
            set((store) => ({ ...store, draggedTask: task })),
          draggedTask: null,
          moveTask: (state) =>
            set((store) => ({
              tasks: store.tasks.map((task) =>
                task.id === store.draggedTask ? { ...task, state } : task
              ),
            })),
        }),
        {
          name: "kanban",
        }
      )
    )
  )
);

useStore.subscribe(
  (store) => store.tasks,
  (newTasks) =>
    useStore.setState({
      tasksInOngoing: newTasks.filter(({ state }) => state === "ongoing")
        .length,
    })
);
