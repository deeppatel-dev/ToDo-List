import {
  setupProjectForm,
  setupTaskForm,
  renderProjects,
  selectProject,
  selectTask,
  setupEditForm,
  setupProjectDeletion,
  setupTaskButtons,
} from "./ui.js";

import { loadProjects } from "./storage.js";

loadProjects();
renderProjects();

setupProjectForm();
setupTaskForm();
selectProject();
selectTask();
setupEditForm();
setupProjectDeletion();
setupTaskButtons();
