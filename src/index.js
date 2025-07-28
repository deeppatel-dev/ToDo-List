import "./style.css";
import Task from "./task";
import Project from "./project";
import { projects } from "./storage.js";
import { setupProjectForm, selectProject } from "./ui.js";

console.log("test");

setupProjectForm();
selectProject();
