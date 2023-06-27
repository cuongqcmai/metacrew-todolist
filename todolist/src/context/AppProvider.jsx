import React, { useContext, useEffect, useMemo } from "react";
import { STORAGE_LIST_TASK } from "../lib/constants";
import { local } from "../lib/storage";

const AppContext = React.createContext();

export const useAppContext = () => useContext(AppContext);

function AppProvider({ children }) {
  const [data, setData] = React.useState([]);

  const listTask = JSON.parse(local.getItem(STORAGE_LIST_TASK));
  const listTodo = useMemo(
    () => data.length > 0 && data.filter((item) => item.type === "Todo"),
    [data]
  );
  const listInProgress = useMemo(
    () => data.length > 0 && data.filter((item) => item.type === "In Progress"),
    [data]
  );

  const listCompleted = useMemo(
    () => data.length > 0 && data.filter((item) => item.type === "Completed"),
    [data]
  );
  const listOverdue = useMemo(
    () => data.length > 0 && data.filter((item) => item.type === "Overdue"),
    [data]
  );

  const updateData = (newData) => {
    setData(newData);
  };

  const addTask = (value) => {
    setData((current) => [...current, value]);
  };

  const deleteTaskWithId = (id) => {
    const cloneData = [...data];
    const index = cloneData.findIndex((t) => t.id === id);
    if (index === -1) return;
    cloneData.splice(index, 1);
    updateData(cloneData);
  };

  const updateTask = (item) => {
    const cloneData = [...data];
    cloneData.map((t) => {
      if (t.id === item.id) {
        return { ...item };
      }
    });
    console.log("data", cloneData);

    updateData(cloneData);
  };

  useEffect(() => {
    if (!listTask || listTask & (listTask.length < 1)) return;
    setData(listTask);
  }, []);

  useEffect(() => {
    local.setItem(STORAGE_LIST_TASK, JSON.stringify(data));
  }, [data]);

  return (
    <AppContext.Provider
      value={{
        data,
        updateData,
        listTodo,
        addTask,
        listInProgress,
        listCompleted,
        listOverdue,
        deleteTaskWithId,
        updateTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
