import Task from "./task";
import Project from "./project";
import { projects } from "./storage.js";

function setupProjectForm() {
  const projectInput = document.querySelector("#projectName");
  const projectForm = document.querySelector(".sidebar form");
  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = projectInput.value;
    let newProject = new Project(name);
    projectInput.value = "";
    projects.push(newProject);
    console.log(projects);
  });
}

export { setupProjectForm };
