let input = document.querySelector(".text");
let submit = document.querySelector(".submit");
let tasks = document.querySelector(".tasks");
let deletAll = document.querySelector(".delete-all");
let array = [];

// استرجاع البيانات المحفوظة فى اللوكال استورج اذ وجدت بيانات
if (localStorage.getItem("tasks")) {
    array = JSON.parse(localStorage.getItem("tasks"));
}

getLocalstorage();

submit.onclick = function () {
    if (input.value !== "") {
        addtoArray(input.value);
        input.value = "";
    }
}

// حذف العنصر عند الضغط على زر دليت سيتم حذفو من الصفحه
tasks.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        e.target.parentElement.remove();
        // الفانكشن اللى بتحذف العنصر من اللوكال استورج
        deleteTask(e.target.parentElement.getAttribute("data-id"));
    }
    // العنصر هيبقا ضن لما تضغط عليه
    if (e.target.classList.contains("task")) {
        e.target.classList.toggle("done");
    }
});


function addtoArray(taskText) {
    const task = {
        id: Date.now(),
        title: input.value,
        combleted: false,
    }
    // اضافة الاوبجكت فى الاراى
    array.push(task);
    // اضافة العناصر فى التاسك
    addElemntPage(array);
    // حفظ العناصر فى اللوكال استورج
    addLocalstorage(array);
}

// اضافة العناصر فى الديف
function addElemntPage(array) {
    tasks.innerHTML = "";
    array.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        if (task.combleted) {
           div.className = "task done"; 
        }
        div.setAttribute("data-id", task.id)
        div.appendChild(document.createTextNode(task.title));
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        tasks.appendChild(div);
    });
}

// حفظ العناصر فى اللوكال استورج
function addLocalstorage(array) {
    window.localStorage.setItem("tasks", JSON.stringify(array));
}

// استرجاع البيانات المحفوظة فى اللوكال استورج اذ وجدت بيانات
function getLocalstorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
       let tasks = JSON.parse(data);
       addElemntPage(tasks);
    }
}

// حذف العنصر من اللوكال استورج
function deleteTask(taskid) {
    array = array.filter((task) => task.id != taskid);
    addLocalstorage(array);
}

// زرار الدليت ال بيحذف كل التسكات
deletAll.onclick = function () {
    window.localStorage.removeItem("tasks");
    tasks.innerHTML = "";
    array = [];
}