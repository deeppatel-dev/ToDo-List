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
    notes = "",
    isComplete = false,
  ) {
    this.tasks.push(
      new Task(title, description, dueDate, priority, notes, isComplete),
    );
  }
}

export default Project;
