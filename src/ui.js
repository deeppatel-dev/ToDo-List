import Task from "./task";
import Project from "./project";
import { projects } from "./storage.js";

let selectedProject;

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

function selectProject() {
  const projectList = document.querySelector(".project-list");

  projectList.addEventListener("click", (e) => {
    if (e.target.classList[0] === "project-list") {
      return;
    }
    const projectsList = document.querySelectorAll(".project-list li");

    for (const element of projectsList) {
      element.classList.remove("active");
    }

    const projectId = e.target.dataset.id;
    e.target.classList.add("active");
    for (const project of projects) {
      if (project.id === projectId) {
        console.log(`The Project Is: ${project.name}`);
        selectedProject = project;
        console.log(selectedProject);
      }
    }
    // renderTasks(selectedProject);
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

export { setupProjectForm, renderProjects, selectedProject, selectProject };
