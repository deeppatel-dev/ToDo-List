import "./style.css";
import Task from "./task";
import Project from "./project";

console.log("test");

let projects = [];

let projectOne = new Project("example");

projects.push(projectOne);

projectOne.addTask(
  "Example Task",
  "This is an Example Task",
  "9/15/25",
  "Low",
  "N/A",
  false,
);

projectOne.addTask(
  "example two",
  "This is another example task",
  "9/16/25",
  "High",
  "N/A",
  false,
);

for (const project of projects) {
  for (const task of project.tasks) {
    console.log(task);
  }
}
