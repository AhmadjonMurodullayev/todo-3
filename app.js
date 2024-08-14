const result = document.getElementById("result");
const save = document.getElementById("save")
const user_modal = document.getElementById("user-modal")
const close = document.getElementById("close")
let form = {}
let todos = JSON.parse(localStorage.getItem("todos")) || [
  { status: "open", tasks: [] },
  { status: "pending", tasks: [] },
  { status: "inproge", tasks: [] },
  { status: "complete", tasks: [] },
];
document.addEventListener("DOMContentLoaded", function () {
  save.addEventListener("click", addTask)
  displayTodos();
});

close.addEventListener("click",function(){
  toggelModal("none")
})
window.addEventListener("click", function(event){
  if(event.target === user_modal){
      toggelModal("none")
  }
})


function displayTodos() {
  result.innerHTML = "";
  todos.forEach((item) => {
    let col = document.createElement("div");
    col.classList.add("col-md-3");
    let task_list = item.tasks
      .map((task) => {
        return `<li>${task}</li>`;
      }).join("");
    col.innerHTML = `<div class="card d-flex">
        <div class="card-header ">
    <h3 class="text-center">${item.status.toUpperCase()}</h3>
        </div>
        <div class="card-body">
           <ol>${task_list}</ol>
        </div>
    
        <div class="card-footer">
           <div class="d-flex justify-content-center">
           <button onclick="openModal()" class"btn btn-primary">Add task</button>
           </div>
        </div>
    
        </div>`;
        result.appendChild(col)
  });
}
function openModal(){
  toggelModal("block")

}
function toggelModal(status){
    user_modal.style.display = status
}

function addTask(){
  console.log(form);
  
  const {task,status} = form
   todos.forEach(item =>{
    if(item.status === form.status){
      item.tasks.push(form.task)
    }
   })
   saveStroage()
   displayTodos()
   toggelModal("none")
}
function handleChange(event){
  const {name,value} = event.target
  form = {...form, [name]:value}
}function saveStroage(){
  localStorage.setItem("todos", JSON.stringify(todos))
}
