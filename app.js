var store = Redux.createStore(rootReducer);
var input = document.querySelector('input');
var list = document.querySelector('ul');

function render() {
    var todos = store.getState().todos;
    console.log(todos);
    var html = todos.map(function(todo) {
      return '<li id="' + todo.id + '" class="' + (todo.completed ? 'completed' : '') + '">' +
                '<input type="checkbox" ' + (todo.completed ? 'checked' : '') + '/>' + todo.text +
                '<span> x </span>'
              '</li>';
    });
    list.innerHTML = html;
}

input.addEventListener('change', function(e) {
	var value = e.target.value;
	store.dispatch(actions.addTodo(value));
  e.target.value = '';
});

list.addEventListener('click', function(e) {
  var target = e.target, id;

  switch (target.tagName) {
    case 'SPAN' :
      id = target.parentNode.id;
      store.dispatch(actions.deleteTodo(id));
      break;
    case 'INPUT' :
      console.log(target, target.parentNode);
      id = target.parentNode.id;
      store.dispatch(actions.completeTodo(id));
      break;
  }
});

render();
store.subscribe(render);