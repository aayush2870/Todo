angular.module('todoApp', [])
  .controller('TodoListController', function () {
    var todoList = this;
    
    // Retrieve tasks from localStorage if available
    var storedTodos = localStorage.getItem('todos');
    todoList.todos = storedTodos ? JSON.parse(storedTodos) : [];
    
    todoList.todoText = '';
    
    todoList.addTodo = function () {
      if (todoList.todoText.trim() !== '') {
        todoList.todos.push({ text: todoList.todoText, done: false });
        todoList.todoText = '';
        // Save tasks to localStorage after adding a new task
        localStorage.setItem('todos', JSON.stringify(todoList.todos));
      }
    };
    
    todoList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

    todoList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
      // Save tasks to localStorage after archiving
      localStorage.setItem('todos', JSON.stringify(todoList.todos));
    };
    
    todoList.deleteTodo = function(todo) {
      var index = todoList.todos.indexOf(todo);
      if (index !== -1) {
        todoList.todos.splice(index, 1);
        // Save tasks to localStorage after deletion
        localStorage.setItem('todos', JSON.stringify(todoList.todos));
      }
    };

    todoList.clearAll = function() {
      todoList.todos = [];
      // Clear localStorage when clearing all tasks
      localStorage.removeItem('todos');
    };
  });
