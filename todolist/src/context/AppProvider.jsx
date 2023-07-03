import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { STORAGE_LIST_TASK, typeToListType } from "../lib/constants";
import { local } from "../lib/storage";

const AppContext = React.createContext();

export const useAppContext = () => useContext(AppContext);

function AppProvider({ children }) {
  const [data, setData] = React.useState({
    listTodo: [],
    listInProgress: [],
    listCompleted: [],
    listOverdue: [],
  });
  const [filterFormData, setFilterFormData] = React.useState({
    type: "all",
    searchName: "",
  });

  const textSearch =
    filterFormData?.searchName.length <= 0
      ? ""
      : filterFormData.searchName.trim();

  const filterByData = (type) =>
    data[`${type}`].filter((item) => item?.title.trim().includes(textSearch));
  const listTask = JSON.parse(local.getItem(STORAGE_LIST_TASK));
  const listTodo = filterByData("listTodo");

  const listInProgress = filterByData("listInProgress");

  const listCompleted = filterByData("listCompleted");

  const listOverdue = filterByData("listOverdue");

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
    const newData = { ...data };
    switch (value.type) {
      case "Todo": {
        newData["listTodo"].push(value);
        break;
      }
      case "In Progress": {
        newData["listInProgress"].push(value);
        break;
      }
      case "Completed": {
        newData["listCompleted"].push(value);
        break;
      }
      case "Overdue": {
        newData["listOverdue"].push(value);
        break;
      }
      default:
        return "";
    }
    setData(newData);
    notifySuccess("Add success");
  };

  const deleteTaskWithId = (id, type) => {
    const itemType = typeToListType(type);
    const cloneData = { ...data };
    const index = cloneData[`${itemType}`].findIndex((t) => t.id === id);
    if (index === -1) return;
    cloneData[`${itemType}`].splice(index, 1);
    updateData(cloneData);
    notifyDeleteSuccess("Delete success");
  };

  const updateTask = (item, oldType) => {
    const itemOldType = typeToListType(oldType);
    const itemNewType = typeToListType(item.type);
    updateData((prevData) => {
      if (item.type === oldType) {
        const cloneData = { ...prevData };
        const itemIndex = cloneData[`${itemOldType}`].findIndex(
          (t) => t.id === item.id
        );
        if (itemIndex === -1) {
          // Item not found
          return;
        }
        const updatedItem = {
          ...cloneData[`${itemOldType}`][itemIndex],
          title: item.title,
          tag: item.tag,
          description: item.description,
          type: item.type,
          priority: item.priority,
        };
        cloneData[`${itemOldType}`][itemIndex] = updatedItem;
        return cloneData;
      } else {
        const listRemoved = removeTaskById(prevData[`${itemOldType}`], item.id);
        const existId =
          prevData[`${itemNewType}`].length > 0 &&
          prevData[`${itemNewType}`].filter((i) => i?.id === item.id);
        if (!existId || existId.length < 1) {
          prevData[`${itemNewType}`].push(item);
        }
        prevData[`${itemOldType}`] =
          listRemoved.length > 0 && listRemoved[0] ? listRemoved : [];
        return { ...prevData };
      }
    });

    notifySuccess("Update success");
  };

  const removeTaskById = (arr, id) => {
    const arrCopy = Array.from(arr);

    const taskWithIdIndex = arrCopy.findIndex((obj) => obj?.id === id);
    arrCopy.splice(taskWithIdIndex, 1);
    return arrCopy;
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
