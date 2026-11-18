// src/main.js
import { TodoRenderer } from './TodoRenderer.js';
import { TodoController } from './TodoController.js';
import { LocalStorageFactory } from './StorageFactory.js';
import { LoggingTodoServiceDecorator } from './LoggingTodoServiceDecorator.js';
import { IdeaBox } from './IdeaBox.js';
import { IdeaBoxAdapter } from './IdeaBoxAdapter.js';
import { TaskCounter } from './TaskObservers.js';
import { AddTaskCommand, CommandHistory } from './Commands.js';

const factory     = new LocalStorageFactory();
const todoService = factory.createService();                       // the real one: it has subscribe()
const service     = new LoggingTodoServiceDecorator(todoService);  // what the rest of the app uses
const renderer    = new TodoRenderer('task-container');
const controller  = new TodoController(service, renderer);
controller.start();

const input        = document.getElementById('task-input');
const addBtn       = document.getElementById('add-task-btn');
const addUrgentBtn = document.getElementById('add-urgent-btn');

const history = new CommandHistory();
addBtn.addEventListener('click', () => {
  history.run(new AddTaskCommand(controller, input.value));
  input.value = '';
});

document.getElementById('undo-btn').addEventListener('click', () => {
  history.undo();
});

addUrgentBtn.addEventListener('click', () => {
  if (controller.addUrgentTask(input.value)) {
    input.value = '';
  }
});

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addBtn.click();
  }
});

const suggestions = new IdeaBoxAdapter(new IdeaBox());
const suggestBtn  = document.getElementById('suggest-btn');
suggestBtn.addEventListener('click', () => {
  controller.addTask(suggestions.getSuggestion());
});

const counter = new TaskCounter();
todoService.subscribe(counter);
counter.update(todoService.tasks);   // show the count at the start
