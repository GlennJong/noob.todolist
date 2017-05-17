// General
general = {
  globalID: 0,
  todos: []
}
function recoverLocalStorage() {
  if (localStorage.todoSave) {
    var recoverTodo = JSON.parse(localStorage.todoSave)
    general.todos = recoverTodo
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

  var temp = general.todos
  for (var i = 0; i < temp.length; i ++) {
    var id     = temp[i].id,
        title  = temp[i].title,
        done   = temp[i].done,
        clean  = temp[i].clean

    var temp = new TempItem(id, title, done, clean)
    var $ul  = this.$elem.querySelector('ul')
    $ul.append(temp.$elem)
  }
}

function TempItem(id, title, done, clean) {
  this.id = id
  this.title = title
  this.done = false
  this.clean = false
  this.$elem = this.buildElem(id, title)
  this.bindEvents()
  return this
}
TempItem.prototype.buildElem = function(id, title) {
  var $li       = document.createElement('li'),
      $label    = document.createElement('label'),
      $checkbox = document.createElement('input'),
      $btn      = document.createElement('button')
  $label.textContent = title
  $label.setAttribute('for', id)
  $checkbox.setAttribute('type', 'checkbox')
  $checkbox.setAttribute('id', id)
  $btn.textContent = '刪除'
  
  $li.append($checkbox)
  $li.append($label)
  $li.append($btn)

  return $li
}
TempItem.prototype.bindEvents = function() {
  var button = this.$elem.querySelector('button')
  button.addEventListener('click', this.onRemoveTodo.bind(this))
}
TempItem.prototype.onRemoveTodo = function() {
  var todoArray = general.todos,
      todoIndex = todoArray.indexOf(this)

  todoArray[todoIndex].$elem.remove()
  todoArray[todoIndex].clean = true
}

TodoList.prototype.buildElem = function() {
  var $ul        = document.createElement('ul'),
      $btn       = document.createElement('button'),
      $input     = document.createElement('input'),
      $container = document.createElement('div')
  $input.setAttribute('type', 'text')
  $btn.textContent = '新增項目'
  $container.append($input)
  $container.append($btn)
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
  var newTodo   = new TodoItem(title)
  ul.appendChild(newTodo.$elem)

  // 將新 Todo 推到 todos 陣列 
  general.todos.push(newTodo)

  console.log(general.todos)

  // reset input value
  input.value = ""
}
function TodoItem(title) {
  var id = general.globalID ++

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
  $btn.textContent = '刪除'
  
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


// window.onbeforeunload = function (event) {
//     var message = 'Important: Please click on \'Save\' button to leave this page.';
//     event.returnValue = message;
//     return message;
//     console.log('work')
// };