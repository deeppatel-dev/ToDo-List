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

    renderProjects();
  });
}

function renderProjects() {
  const projectList = document.querySelector(".project-list");
  projectList.innerHTML = "";
  for (const project of projects) {
    const projectName = document.createElement("li");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";
    deleteButton.classList.add("delete-project");
    projectName.dataset.id = project.id;
    projectName.classList.add("project-item");
    projectName.textContent = project.name;
    projectName.appendChild(deleteButton);
    projectList.appendChild(projectName);
  }
}

export { setupProjectForm };
