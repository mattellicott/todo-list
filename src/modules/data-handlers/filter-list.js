import { ProjectList } from "./project-list";
import { isToday, isThisWeek } from "date-fns";

export const FilterList = (function () {
  const filters = ["All", "Today", "Week", "High Priority", "Completed"];

  return filters.map((filter) => {
    function getTitle() {
      return filter;
    }

    function getTasks() {
      return filterTasks(filter);
    }

    return { getTitle, getTasks };
  });

  function filterTasks(filterType) {
    const _tasks = [];

    for (const project of Object.values(ProjectList.getProjects())) {
      for (const task of Object.values(project.getTasks())) {
        switch (filterType) {
          case "All":
            _tasks.push(task);
            break;
          case "Today": {
            const [month, day, year] = task.getDueDate().split("/");
            if (isToday(new Date(year, month - 1, day)) && !task.getCompleted())
              _tasks.push(task);
            break;
          }
          case "Week": {
            const [month, day, year] = task.getDueDate().split("/");
            if (
              isThisWeek(new Date(year, month - 1, day)) &&
              !task.getCompleted()
            )
              _tasks.push(task);
            break;
          }
          case "High Priority":
            if (task.getPriority() == "2") _tasks.push(task);
            break;
          case "Completed":
            if (task.getCompleted()) _tasks.push(task);
            break;
        }
      }
    }

    return _tasks;
  }
})();
