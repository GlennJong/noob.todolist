function TodoList() {
  this.$elem = this.buildElem()
  this.todos = []
  this.bindEvents() 
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
  var title     = input.value
  var newTodo = new TodoItem(title)

  var ul = this.$elem.querySelector('ul')
  ul.appendChild(newTodo.$elem)

  // 將新 Todo 推到 todos 陣列 
  this.todos.push(newTodo)

  // 增加新屬性 form，所屬的 TodoList
  newTodo.father = this
  // console.log(todoChild)

  // reset input value
  input.value = ""
}

// General
general = {
  globalID: 0
}
function TodoItem(title) {
  var id = general.globalID ++

  this.id    = id
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
  $btn.textContent = '已完成'
  
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
  var todoArray = this.father.todos,
      todoId    = this.id

  todoArray[todoId].$elem.remove()
}

function App() {
  this.createItem()
}
App.prototype.createItem = function () {
  var item = new TodoList()
  document.body.appendChild(item.$elem)
}
window.app = new App()