import Task from "./task";
import Project from "./project";
import { projects } from "./storage.js";
import { format } from "date-fns";

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

    renderProjects();
  });
}

function setupTaskForm() {
  let dialog = document.querySelector(".addDialog");
  document.querySelector(".newTask").addEventListener("click", () => {
    if (!selectedProject) {
      return;
    }
    dialog.showModal();
  });
  const form = document.querySelector(".addDialog form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const taskTitle = document.querySelector("#taskTitle");
    const title = taskTitle.value;

    const taskDescription = document.querySelector("#taskDescription");
    const description = taskDescription.value;

    const taskDueDate = document.querySelector("#taskDueDate");
    const dueDate = new Date(taskDueDate.value);
    const formattedDueDate = format(dueDate, "MMMM do, yyyy");

    const taskPriority = document.querySelector("#taskPriority");
    const priority = taskPriority.value;

    const taskCompletion = document.querySelector("#taskCompletion");
    const isComplete = taskCompletion.checked;

    selectedProject.addTask(
      title,
      description,
      formattedDueDate,
      priority,
      isComplete,
    );
    renderTasks(selectedProject);
    form.reset();
    dialog.close();
  });
}

function selectProject() {
  const projectList = document.querySelector(".project-list");

  projectList.addEventListener("click", (e) => {
    if (e.target.classList.contains("project-list")) {
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
        selectedProject = project;
      }
    }
    renderTasks(selectedProject);
  });
}

function renderTasks(project) {
  const taskContainer = document.querySelector(".task-section");
  taskContainer.innerHTML = "";
  for (const task of project.tasks) {
    const card = document.createElement("div");
    card.classList.add("task");

    switch (task.priority) {
      case "low":
        card.classList.add("low");
        break;
      case "medium":
        card.classList.add("medium");
        break;
      case "high":
        card.classList.add("high");
        break;
    }

    const title = document.createElement("h1");
    title.textContent = task.title;
    card.appendChild(title);

    const description = document.createElement("p");
    description.textContent = task.description;
    description.classList.add("description");
    card.appendChild(description);

    const dueDate = document.createElement("p");
    dueDate.textContent = task.dueDate;
    card.appendChild(dueDate);

    const completionStatus = document.createElement("h5");
    completionStatus.textContent = `Completion Status: ${task.isComplete}`;
    card.appendChild(completionStatus);

    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("buttonGroup");

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove");
    removeButton.textContent = "Remove";
    buttonGroup.appendChild(removeButton);

    const toggleButton = document.createElement("button");
    toggleButton.classList.add("toggle");
    toggleButton.textContent = "Toggle Completed";
    buttonGroup.appendChild(toggleButton);

    card.appendChild(buttonGroup);

    card.dataset.id = task.id;
    taskContainer.appendChild(card);
  }
}

function renderProjects() {
  const projectList = document.querySelector(".project-list");
  projectList.innerHTML = "";
  for (const project of projects) {
    const projectName = document.createElement("li");
    if (project === selectedProject) {
      projectName.classList.add("active");
    }
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

export {
  setupProjectForm,
  setupTaskForm,
  renderProjects,
  selectedProject,
  selectProject,
};
