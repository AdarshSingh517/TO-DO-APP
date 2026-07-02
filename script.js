const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(e){
    if(e.key==="Enter"){
        addTask();
    }
});

function addTask(){

    let text = taskInput.value.trim();

    if(text===""){
        alert("Enter a task");
        return;
    }

    tasks.push({
        text:text,
        completed:false
    });

    saveTasks();

    taskInput.value="";

    displayTasks();
}

function displayTasks(){

    taskList.innerHTML="";

    tasks.forEach((task,index)=>{

        let li=document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }

        let span=document.createElement("span");
        span.innerText=task.text;

        let div=document.createElement("div");
        div.className="buttons";

        let completeBtn=document.createElement("button");
        completeBtn.innerText="✓";
        completeBtn.className="complete";

        completeBtn.onclick=function(){

            tasks[index].completed=!tasks[index].completed;

            saveTasks();

            displayTasks();

        };

        let deleteBtn=document.createElement("button");

        deleteBtn.innerText="Delete";

        deleteBtn.className="delete";

        deleteBtn.onclick=function(){

            tasks.splice(index,1);

            saveTasks();

            displayTasks();

        };

        div.appendChild(completeBtn);

        div.appendChild(deleteBtn);

        li.appendChild(span);

        li.appendChild(div);

        taskList.appendChild(li);

    });

}

function saveTasks(){

    localStorage.setItem("tasks",JSON.stringify(tasks));

}