import "./style.css";
import Task from "./task";
import Project from "./project";

console.log("test");

let Projects = [];

let projectOne = new Project("example");

Projects.push(projectOne);

projectOne.tasks = new Task(
  "Example Task",
  "This is an Example Task",
  "9/15/25",
  "Low",
  "N/A",
  false,
);

for (const project of Projects) {
  console.log(project.tasks);
}
