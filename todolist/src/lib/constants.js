export const STORAGE_LIST_TASK = "storage_list_task";
export const OPTION_STATUS = ["Todo", "In Progress", "Completed", "Overdue"];
export const OPTION_PRIORITY = ["Low", "Medium", "High"];

export const typeToListType = (type) => {
  switch (type) {
    case "Todo": {
      return "listTodo";
    }
    case "In Progress": {
      return "listInProgress";
    }
    case "Completed": {
      return "listCompleted";
    }
    case "Overdue": {
      return "listOverdue";
    }
    default:
      return "";
  }
};
