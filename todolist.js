const addbtn = document.querySelector(".add");
const list = document.querySelector(".todo-list");
const input = document.querySelector("#todo-input")

const saved = localStorage.getItem("todos")
const todos = saved ? JSON.parse(saved) : [];
//  save current todos array to local storage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
// Create a dom node for a todo object and append it to the list 
function createTodo(todo, index) {
    const li = document.createElement("li")

    const checkBox = document.createElement("input")
    checkBox.type = "checkbox"
    checkBox.checked = !!todo.completed;
    checkBox.addEventListener("change", () => {
        todo.completed = checkBox.checked
        saveTodos();
        render();
    })

    const textSpan = document.createElement("span")
    textSpan.textContent = todo.text;
    // textSpan.style.margin = "0.8px"
    if (todo.completed) {
        textSpan.style.textDecoration = "line-through"
    }

    textSpan.addEventListener("dblclick", () => {
        const newText = prompt("Edit todo", todo.text);
        if (newText !== null && newText.trim() !== "") {
            todo.text = newText.trim();
        }
        textSpan.textContent = todo.text;
        saveTodos();
        render();
    })
    const delbtn = document.createElement("button");
    delbtn.textContent = "Delete";
    delbtn.classList.add("delete");

    delbtn.addEventListener("click", () => {

        todos.splice(index, 1);   // remove from array

        localStorage.setItem("todos", JSON.stringify(todos));
        saveTodos(); 
        render();
    });
    li.appendChild(checkBox);
    li.appendChild(textSpan);
    li.appendChild(delbtn);
    return li;

}

// Render the whole todo list from todos array 
function render() {
    list.innerHTML = ""

    // recreate each item 
    todos.forEach((todo, index) => {
        const node = createTodo(todo, index);
        list.appendChild(node);
    });
}
function addTodo() {
    const text = input.value.trim();
    if (!text) {
        return;
    }
    todos.push({ text, completed: false })
    input.value = "";
    render();
    saveTodos();
}
addbtn.addEventListener("click", addTodo);
input.addEventListener("keydown", (e)=>{
    if(e.key =="Enter"){
        addTodo();
    }
})
render();