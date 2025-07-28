import Task from "./task";
import Project from "./project";
import { projects } from "./storage.js";
import { parse, format, parseISO } from "date-fns";

let selectedProject;
let currentlyEditingTask = null;

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

function setupProjectDeletion() {
  const projectContainer = document.querySelector(".project-list");
  projectContainer.addEventListener("click", (event) => {
    console.log(event.target);
    if (!event.target.classList.contains("delete-project")) {
      return;
    }
    let id = event.target.parentElement.dataset.id;
    if (
      (selectedProject && selectedProject.id === id) ||
      projects.length === 1
    ) {
      selectedProject = null;
    }
    const index = projects.findIndex((project) => project.id === id);
    if (index !== -1) {
      projects.splice(index, 1);
    }
    renderProjects();
    renderTasks(selectedProject);
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
    const formattedDueDate = format(dueDate, "PPPP");

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
    if (
      e.target.classList.contains("project-list") ||
      e.target.classList.contains("delete-project")
    ) {
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

function selectTask() {
  const taskContainer = document.querySelector(".task-section");

  taskContainer.addEventListener("click", (event) => {
    if (
      event.target.textContent === "Please Select a Project" ||
      event.target.classList.contains("task-section")
    ) {
      return;
    }

    const id = event.target.dataset.id || event.target.parentElement.dataset.id;
    if (!id) return;

    const task = selectedProject.tasks.find((curr) => curr.id === id);
    if (!task) return;

    currentlyEditingTask = task;

    const dialog = document.querySelector(".editDialog");
    dialog.showModal();

    document.querySelector(".editDialog #taskTitle").value = task.title;
    document.querySelector(".editDialog #taskDescription").value =
      task.description;

    const taskDueDate = document.querySelector(".editDialog #taskDueDate");
    const cleaned = task.dueDate.replace(/(\d+)(st|nd|rd|th)/, "$1");
    const parsedDate = parse(cleaned, "EEEE, MMMM d, yyyy", new Date());
    taskDueDate.value = format(parsedDate, "yyyy-MM-dd");
    document.querySelector(".editDialog #taskPriority").value = task.priority;
    document.querySelector(".editDialog #taskCompletion").checked =
      task.isComplete;
  });
}

function setupEditForm() {
  const form = document.querySelector(".editDialog form");
  const dialog = document.querySelector(".editDialog");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!currentlyEditingTask) return;

    const taskTitle = document.querySelector(".editDialog #taskTitle");
    const taskDescription = document.querySelector(
      ".editDialog #taskDescription",
    );
    const taskDueDate = document.querySelector(".editDialog #taskDueDate");
    const taskPriority = document.querySelector(".editDialog #taskPriority");
    const taskCompletion = document.querySelector(
      ".editDialog #taskCompletion",
    );

    const dueDate = parseISO(taskDueDate.value);

    currentlyEditingTask.title = taskTitle.value || currentlyEditingTask.title;
    currentlyEditingTask.description =
      taskDescription.value || currentlyEditingTask.description;
    currentlyEditingTask.dueDate = format(dueDate, "PPPP");
    currentlyEditingTask.priority =
      taskPriority.value || currentlyEditingTask.priority;
    currentlyEditingTask.isComplete = taskCompletion.checked;

    renderTasks(selectedProject);
    form.reset();
    dialog.close();
  });
}
function renderTasks(project) {
  const taskContainer = document.querySelector(".task-section");
  taskContainer.innerHTML = "";
  if (!project) {
    const warning = document.createElement("h1");
    warning.textContent = "Please Select a Project";
    taskContainer.appendChild(warning);
    return;
  }
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
    completionStatus.textContent = `Completion Status: ${task.isComplete ? "True" : "False"}`;
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
  selectTask,
  setupEditForm,
  setupProjectDeletion,
};
