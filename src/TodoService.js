// Owns the task list and the rules for changing it.
// Knows nothing about the DOM, and nothing about where tasks are stored:
// it receives its storage through the constructor.
export class TodoService {
  constructor(storage) {
    this.storage = storage;
    this.tasks = storage.load();
  }

  // Returns the new task, or null if the description is too short.
  // Telling the user about it is the renderer's job, not this class's.
  addTask(description, type) {
    const trimmed = description.trim();
    if (trimmed.length < 3) {
      return null;
    }

    if (this.tasks.length >= 20) {
      console.warn('This list is getting long - consider clearing completed tasks.');
    }

    const task = {
      id: Date.now(),
      desc: trimmed,
      completed: false,
      priority: 'normal',
      createdAt: new Date().toLocaleTimeString()
    };

    if (type === 'urgent') {
      task.priority = 'high';
      task.desc = `[URGENT] ${trimmed}`;
    }

    this.tasks.push(task);
    this.storage.save(this.tasks);
    return task;
  }

  toggleComplete(id) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;
    task.completed = !task.completed;
    this.storage.save(this.tasks);
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.storage.save(this.tasks);
  }
}
