import "./style.css";
import Task from "./task";
import Project from "./project";
import { projects } from "./storage.js";
import { setupProjectForm } from "./ui.js";

console.log("test");

let projectOne = new Project("example");

projects.push(projectOne);

for (const project of projects) {
  for (const task of project.tasks) {
    console.log(task);
  }
}

setupProjectForm();
