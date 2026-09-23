// Owns every localStorage call. Anything with load() and save(tasks)
// can stand in for it, and TodoService will not notice the difference.
export class LocalStorageHandler {
  constructor(key = 'todo-tasks') {
    this.key = key;
  }

  load() {
    const raw = localStorage.getItem(this.key);
    return raw ? JSON.parse(raw) : [];
  }

  save(tasks) {
    localStorage.setItem(this.key, JSON.stringify(tasks));
  }
}
