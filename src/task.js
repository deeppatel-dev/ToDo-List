class Task {
  constructor(
    title = "",
    description = "",
    dueDate = "",
    priority = "low",
    isComplete = false,
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isComplete = isComplete;
    this.id = crypto.randomUUID();
  }
  toggleCompletion() {
    this.isComplete = !this.isComplete;
  }
}

export default Task;
