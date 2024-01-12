const list = document.getElementById("list");
const createBtn = document.getElementById("create-btn");

let todos = [];

createBtn.addEventListener('click', createNewTodo);

function createNewTodo() {
    //새로운 아이템 객체 생성
    const item = {
        id: new Date().getTime(),
        text: "",
        complete: false
    }

    //배열 처음에 새로운 아이템 추가
    todos.unshift(item);

    //요소 생성하기
    const {itemEl, inputEl} = createTodoElement(item);

    //리스트 안에 방금 생성한 아이템 요소 추가
    list.prepend(itemEl);

    inputEl.removeAttribute("disabled");
    inputEl.focus();

    saveToLocalStorage();
}

function createTodoElement(item) {
    const itemEl = document.createElement("div");
    itemEl.classList.add("item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.complete;

    if(item.complete) {
        itemEl.classList.add("complete");
    }

    const inputEl = document.createElement("input");
    inputEl.type = "text";
    inputEl.value = item.text;
    inputEl.setAttribute("disabled", "");

    const actionsEl = document.createElement("div");
    actionsEl.classList.add("actions");

    const editBtnEl = document.createElement("button");
    editBtnEl.classList.add("material-icons");
    editBtnEl.innerText = "edit";

    const removeBtnEl = document.createElement("button");
    removeBtnEl.classList.add("material-icons", "remove-btn");
    removeBtnEl.innerText = "remove_circle";

    checkbox.addEventListener("change", () => {
        item.complete = checkbox.checked;
    
        if(item.complete) {
            itemEl.classList.add("complete");
        } else {
            itemEl.classList.remove("complete");
        }
    
        saveToLocalStorage();
    });

    inputEl.addEventListener("input", () => {
        item.text = inputEl.value;
    });
    
    //요소가 포커스를 잃었을 때 == 다른 부분으로 포커스를 옮겼을 때
    inputEl.addEventListener("blur", () => {
        inputEl.setAttribute("disabled", "");
        saveToLocalStorage();
    });

    editBtnEl.addEventListener("click", () => {
        inputEl.removeAttribute("disabled");
        inputEl.focus();
    });
    
    removeBtnEl.addEventListener("click", () => {
        todos = todos.filter(t => t.id != item.id); //id가 같은 것은 todos에 포함시키지 않는 것(같은 것은 삭제하고 싶은 거니까)
        itemEl.remove();
        saveToLocalStorage();
    });

    actionsEl.append(editBtnEl);
    actionsEl.append(removeBtnEl);

    itemEl.append(checkbox);
    itemEl.append(inputEl);
    itemEl.append(actionsEl);

    return { itemEl, inputEl, editBtnEl, removeBtnEl }
}

function saveToLocalStorage() {
    const data = JSON.stringify(todos);
    localStorage.setItem("my_todos", data);
}

function loadFromLocalStorage() {
    const data = localStorage.getItem("my_todos");

    if(data) {
        todos = JSON.parse(data); //json sting을 object로 변환해주는 것
    }
}

function displayTodos() {
    loadFromLocalStorage();

    for(let i = 0; i < todos.length; i++) {
        const item = todos[i];

        const { itemEl } = createTodoElement(item);

        list.append(itemEl);
    }
}

displayTodos();