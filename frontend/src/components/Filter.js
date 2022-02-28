import React from "react";
import { useSetRecoilState } from "recoil";
import { todoListFilterState } from "../recoil/atoms";

const Filter = () => {
  const setFilter = useSetRecoilState(todoListFilterState);

  const updateFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  return (
    <div className="filter-wrapper">
      <form>
        <label htmlFor="filter">Filter </label>
        <select name="filter" id="filter" onChange={updateFilter}>
          <option value="Show All">All Todos</option>
          <option value="Show Completed">Completed</option>
          <option value="Show Uncompleted">Not Completed</option>
        </select>
      </form>
    </div>
  );
};

export default Filter;
