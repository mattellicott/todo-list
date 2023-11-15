import { Task } from "../data-handlers/task";
import { Page } from "./page";

export const FilterPage = (function () {
  let currentFilter;

  const publicMethods = {
    load: (filter) => {
      currentFilter = filter;

      Page.load(currentFilter, "filter");
    },
  };

  return publicMethods;
})();
