// Composition root: the only place that decides which storage the app uses.
import { TodoService } from './TodoService.js';
import { TodoRenderer } from './TodoRenderer.js';
import { LocalStorageHandler } from './LocalStorageHandler.js';

const storage = new LocalStorageHandler();
const service = new TodoService(storage);
const renderer = new TodoRenderer('task-container', service);

renderer.bindAddControls('task-input', 'add-task-btn', 'add-urgent-btn');
renderer.render();
