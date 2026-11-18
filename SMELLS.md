# Code Smells

## 1. Long Method
The `render()` method is too long and has too many responsibilities.
It builds HTML, adds event listeners, handles animations, and updates the document title.
It should be divided into smaller methods.

## 2. Duplicate Code
The methods `renderPendingRows()` and `renderCompletedRows()` contain very similar code.
The duplicated logic should be extracted into one reusable method.

## 3. Security Smell
User input is inserted directly into `innerHTML`.
This can cause an XSS vulnerability because HTML or JavaScript could be injected through the task description.
The input should be escaped or inserted using safer DOM methods.

## 4. Mixed Responsibilities
The `TodoManager` class handles both application logic and UI operations.
For example, `addTask()` uses `alert()`, while `render()` modifies the page.
These responsibilities should be separated.

## 5. Primitive Obsession
The `addTask()` method uses string values such as `"simple"` and `"urgent"` to determine the task type.
Using clearer constants or a dedicated task type structure would make the code easier to maintain.