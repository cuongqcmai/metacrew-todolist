import React, { useContext, useEffect, useMemo } from "react";
import { STORAGE_LIST_TASK } from "../lib/constants";
import { local } from "../lib/storage";
import { NearMe } from "@mui/icons-material";
import { toast } from "react-toastify";

const AppContext = React.createContext();

export const useAppContext = () => useContext(AppContext);

function AppProvider({ children }) {
  const [data, setData] = React.useState([]);
  const [filterFormData, setFilterFormData] = React.useState({
    type: "all",
    searchName: "",
  });

  const textSearch =
    filterFormData?.searchName.length <= 0
      ? ""
      : filterFormData.searchName.trim();

  const filterByData = (type) =>
    data.filter(
      (item) => item.type === type && item.title.trim().includes(textSearch)
    );
  const listTask = JSON.parse(local.getItem(STORAGE_LIST_TASK));
  const listTodo = filterByData("Todo");

  const listInProgress = filterByData("In Progress");

  const listCompleted = filterByData("Completed");

  const listOverdue = filterByData("Overdue");

  const updateData = (newData) => {
    setData(newData);
  };

  const notifySuccess = (title) =>
    toast.success(title, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifyDeleteSuccess = (title) =>
    toast.warning(title, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const addTask = (value) => {
    setData((current) => [...current, value]);
    notifySuccess("Add success");
  };

  const deleteTaskWithId = (id) => {
    const cloneData = [...data];
    const index = cloneData.findIndex((t) => t.id === id);
    if (index === -1) return;
    cloneData.splice(index, 1);
    updateData(cloneData);
    notifyDeleteSuccess("Delete success");
  };

  const updateTask = (item) => {
    const itemIndex = data.findIndex((t) => t.id === item.id);
    if (itemIndex === -1) {
      // Item not found
      return;
    }
    const updatedItem = {
      ...data[itemIndex],
      title: item.title,
      tag: item.tag,
      description: item.description,
      type: item.type,
      priority: item.priority,
    };
    const updatedItems = [...data];
    updatedItems[itemIndex] = updatedItem;

    updateData(updatedItems);
    notifySuccess("Update success");
  };

  const updateFilterFormData = (form) => {
    setFilterFormData(form);
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
        filterFormData,
        updateFilterFormData,
        notifySuccess,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
