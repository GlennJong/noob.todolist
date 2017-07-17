// General
var general = {
  globalID: 0,
  todos   : [],
  todoTemp: []
}
function recoverLocalStorage() {
  if (localStorage.todoSave) {
    var recoverTodo = JSON.parse(localStorage.todoSave)
    general.todoTemp = recoverTodo
    general.globalID = recoverTodo.length
  }
}

function TodoList() {
  // this.$elem = this.buildElem()
  this.$construct = this.construct()
  this.bindEvents() 
}
TodoList.prototype.construct = function() {
  this.$elem    = this.buildElem()
  this.$stroage = this.localStorage()
}

TodoList.prototype.localStorage = function() {
  // recoverLocalStorage
  recoverLocalStorage()
  console.log(general.todoTemp)

  var temp = general.todoTemp
  for (var i = 0; i < temp.length; i ++) {

    if (temp[i].clean == false) {
      var id     = temp[i].id,
          title  = temp[i].title

      var newTemp = new TodoItem(id, title)
      general.todos.push(newTemp)

      var $ul  = this.$elem.querySelector('ul')
      $ul.append(newTemp.$elem)
      console.log(general.todos)
    }
  }
}

TodoList.prototype.buildElem = function() {
  var $ul        = document.createElement('ul'),
      $btn       = document.createElement('button'),
      $input     = document.createElement('input'),
      $container = document.createElement('div'),
      $todoNew   = document.createElement('div')

  $container.setAttribute('class', 'todo-list')
  $todoNew.setAttribute('class', 'todo-new')
  $ul.setAttribute('class', 'todo-wrap')

  $input.setAttribute('type', 'text')
  $input.setAttribute('placeholder', 'Typing your Todo-list.')
  $btn.textContent = 'New'
  $todoNew.append($input)
  $todoNew.append($btn)

  $container.append($todoNew)
  $container.append($ul)

  return $container
}
TodoList.prototype.bindEvents = function() {
  var button = this.$elem.querySelector('button')
  button.addEventListener('click', this.onCreateTodo.bind(this))
}
TodoList.prototype.onCreateTodo = function() {
  // 建立 newTodo
  var input     = this.$elem.querySelector('input')
  var ul        = this.$elem.querySelector('ul')
  var title     = input.value
  var id = general.globalID ++
  var newTodo   = new TodoItem(id, title)
  ul.appendChild(newTodo.$elem)

  // 將新 Todo 推到 todos 陣列 
  general.todos.push(newTodo)

  console.log(general.todos)

  // reset input value
  input.value = ""
}
function TodoItem(id, title) {

  this.id = id
  this.title = title
  this.done = false
  this.clean = false
  this.$elem = this.buildElem(id, title)
  this.bindEvents()
  return this
}
TodoItem.prototype.buildElem = function(id, title) {
  var $li       = document.createElement('li'),
      $label    = document.createElement('label'),
      $checkbox = document.createElement('input'),
      $btn      = document.createElement('button')
  $label.textContent = title
  $label.setAttribute('for', id)
  $checkbox.setAttribute('type', 'checkbox')
  $checkbox.setAttribute('id', id)
  $btn.textContent = 'delete'
  
  $li.append($checkbox)
  $li.append($label)
  $li.append($btn)

  return $li
}
TodoItem.prototype.bindEvents = function() {
  var button = this.$elem.querySelector('button')
  button.addEventListener('click', this.onRemoveTodo.bind(this))
}
TodoItem.prototype.onRemoveTodo = function() {
  var todoArray = general.todos,
      todoIndex = todoArray.indexOf(this)

  todoArray[todoIndex].$elem.remove()
  todoArray[todoIndex].clean = true
  console.log(todoArray[todoIndex])
  console.log(todoArray)
}
// Begin this APP
function App() {
  this.createItem()
}
// Save to LocalStorage
function LocalStorage() {
  var todoSave = JSON.stringify(general.todos)
  localStorage.setItem('todoSave', todoSave)
}
App.prototype.createItem = function () {
  var item = new TodoList()
  document.body.appendChild(item.$elem)
}
window.app = new App()

window.onbeforeunload = LocalStorage