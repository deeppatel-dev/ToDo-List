class Task {
  constructor(
    title = "",
    description = "",
    dueDate = "",
    priority = "Low",
    notes = "",
    isComplete = false,
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.isComplete = isComplete;
  }
}

export default Task;
