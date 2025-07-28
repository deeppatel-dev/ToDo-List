import Project from "./project.js";
import Task from "./task.js";

let projects = [];

function loadProjects() {
  const saved = localStorage.getItem("projects");
  if (saved) {
    const raw = JSON.parse(saved);

    projects = [];

    for (const project of raw) {
      const newProject = new Project(project.name);
      newProject.id = project.id;

      newProject.tasks = [];

      for (const task of project.tasks) {
        const newTask = new Task(
          task.title,
          task.description,
          task.dueDate,
          task.priority,
          task.isComplete,
        );
        newTask.id = task.id;

        newProject.tasks.push(newTask);
      }
      projects.push(newProject);
    }
  } else {
    projects = [];
  }
}

function saveProjects() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function getProjects() {
  return projects;
}

export { getProjects, loadProjects, saveProjects };
