function TodoList() {
  this.$elem = this.buildElem()
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
  button.addEventListener('click', this.onClick.bind(this))
}
TodoList.prototype.onClick = function() {
  var input = this.$elem.querySelector('input')
  var value = input.value
  var todo = new TodoItem(value)

  var ul = this.$elem.querySelector('ul')
  ul.appendChild(todo)
  // reset input value
  input.value = ""

}
function TodoItem(value) {
  this.$elem = this.buildElem(value)
  this.bindEvents()
  return this.$elem
}
TodoItem.prototype.buildElem = function(value) {
  var $li   = document.createElement('li'),
      $span = document.createElement('span'),
      $btn  = document.createElement('button')
  $span.textContent = value
  $btn.textContent = '已完成'
  
  $li.append($span)
  $li.append($btn)
  return $li
}
TodoItem.prototype.bindEvents = function() {
  var button = this.$elem.querySelector('button')
  button.addEventListener('click', this.removeItem.bind(this))
}
TodoItem.prototype.removeItem = function() {
  console.log('remove')
}

function App() {
  this.createItem()
}
App.prototype.createItem = function () {
  var item = new TodoList()
  document.body.appendChild(item.$elem)
}
window.app = new App()