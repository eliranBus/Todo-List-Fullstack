import { atom } from "recoil";

export const todosState = atom({
  key: "todosState",
  default: [],
});

export const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "Show All",
});

export const statusChangeFlagState = atom({
  key: "statusChangeFlagState",
  default: true,
});
