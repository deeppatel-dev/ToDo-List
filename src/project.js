import Task from "./task";

class Project {
  constructor(name = "") {
    this.name = name;
    this.tasks = [];
    this.id = crypto.randomUUID();
  }
  addTask(
    title = "",
    description = "",
    dueDate = "",
    priority = "Low",
    isComplete = false,
  ) {
    this.tasks.push(
      new Task(title, description, dueDate, priority, isComplete),
    );
  }
}

export default Project;
