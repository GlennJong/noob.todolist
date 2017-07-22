// General
var general = {
  globalID: 0,
  todos   : []
}

function TodoList() {
  this.$elem = this.buildElem()
  this.bindEvents() 
}
TodoList.prototype.buildElem = function() {
  var $ul        = document.createElement('ul'),
      $btn       = document.createElement('button'),
      $input     = document.createElement('input'),
      $container = document.createElement('div')

  $container.setAttribute('class', 'todo-list')
  $ul.setAttribute('class', 'todo-wrap')

  $input.setAttribute('type', 'text')
  $btn.textContent = 'New'

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
  var input     = this.$elem.querySelector('input')
  var ul        = this.$elem.querySelector('ul')
  var title     = input.value
  var id = general.globalID ++
  var newTodo   = new TodoItem(id, title)
  ul.appendChild(newTodo.$elem)
  general.todos.push(newTodo)
  input.value = ""
}
function TodoItem(id, title) {

  this.id = id
  this.title = title
  this.done = false
  this.clean = false
  this.$elem = this.buildElem(id, title)
  return this
}
TodoItem.prototype.buildElem = function(id, title) {
  var $li       = document.createElement('li'),
      $label    = document.createElement('label'),
      $checkbox = document.createElement('input')
  $label.textContent = title
  $label.setAttribute('for', id)
  $checkbox.setAttribute('type', 'checkbox')
  $checkbox.setAttribute('id', id)
  
  $li.append($checkbox)
  $li.append($label)

  return $li
}
// Run
var todoList = new TodoList()
document.body.appendChild(todoList.$elem)

