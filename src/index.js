import "./style.css";
import Task from "./task";
import Project from "./project";
import { projects } from "./storage.js";
import {
  setupProjectForm,
  selectProject,
  setupTaskForm,
  selectTask,
  setupEditForm,
  setupProjectDeletion,
  setupTaskButtons,
} from "./ui.js";

console.log("test");

setupProjectForm();
setupTaskForm();
selectProject();
selectTask();
setupEditForm();
setupProjectDeletion();
setupTaskButtons();
