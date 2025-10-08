const search = document.querySelector(".search");
const submit = document.querySelector(".submit");
const todos = document.querySelector(".todos");
const form = document.querySelector(".form");
const dones = document.querySelector(".dones");
let todo = document.createElement("div");
export async function createTodo() {
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    try {
      if (search.value.trim() !== "") {
        todos.style.visibility = "visible";
        todo = document.createElement("div");
        todo.className = "todo";
        todo.innerHTML = `
                <form>
                  <input class="checkbox" type="checkbox">
                  <label>${search.value}</label>
                </form>
                <svg class="trash" fill="#ffffff" height="24px" width="64px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 456.686 456.686" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M363.541,120.847H93.16c-8.005,0-15.623,3.367-21.04,9.263c-5.389,5.896-8.052,13.798-7.363,21.761l24.767,278.836 c1.303,14.71,13.619,25.98,28.39,25.98h220.874c14.772,0,27.073-11.271,28.391-25.98L391.93,151.87 c0.705-7.963-1.975-15.864-7.363-21.761C379.165,124.214,371.547,120.847,363.541,120.847z M155.896,382.248 c-0.48,0.029-0.929,0.045-1.378,0.045c-9.308,0-17.18-7.169-17.884-16.597l-9.651-127.207 c-0.749-9.876,6.644-18.496,16.537-19.244c9.921-0.778,18.512,6.643,19.26,16.536l9.638,127.206 C173.181,372.879,165.773,381.499,155.896,382.248z M246.003,372.535c0,9.922-8.038,17.944-17.944,17.944 c-9.922,0-17.959-8.022-17.959-17.944V205.012c0-9.922,8.036-17.944,17.959-17.944c9.906,0,17.944,8.022,17.944,17.944V372.535z M320.052,365.696c-0.705,9.428-8.576,16.597-17.884,16.597c-0.449,0-0.898-0.016-1.378-0.045 c-9.877-0.749-17.285-9.369-16.521-19.261l9.638-127.206c0.749-9.894,9.398-17.346,19.262-16.536 c9.892,0.748,17.284,9.368,16.536,19.244L320.052,365.696z"></path> </g> <g> <path d="M370.589,22.344h-52.887C314.889,9.578,303.544,0,289.912,0h-123.15c-13.619,0-24.964,9.578-27.791,22.344H86.097 c-16.941,0-30.649,13.723-30.649,30.648c0,16.927,13.708,30.649,30.649,30.649h284.493c16.941,0,30.649-13.723,30.649-30.649 C401.239,36.066,387.531,22.344,370.589,22.344z"></path> </g> </g> </g></svg>
                `;

        todos.append(todo);
        form.reset();
        const trash = todo.querySelector(".trash");
        trash.addEventListener("click", removeTask);
        const todoCheckbox = todo.querySelector(".checkbox");
        todoCheckbox.addEventListener("change", completeTask);

        return;
      }
      throw new Error("Veuillez svp mettre le nom de la tâche");
    } catch (error) {
      createError(error);
    }
  });
}

function removeError(element) {
  return element.remove();
}

function createError(e) {
  const p = document.createElement("p");
  const container = document.querySelector(".container");
  p.textContent = e;
  p.style.color = "red";
  container.prepend(p);
  setTimeout(() => {
    removeError(p);
  }, 3000);
}

function completeTask(e) {
  const currentTask = e.target.closest(".todo, .done");
  if (!currentTask) return;
  if (e.target.checked) {
    currentTask.classList.remove("todo");
    currentTask.classList.add("done");
    dones.append(currentTask);
  } else {
    currentTask.classList.remove("done");
    currentTask.classList.add("todo");
    todos.append(currentTask);
  }

  const todosTaks = todos.querySelectorAll(".todo").length;
  const donesTaks = dones.querySelectorAll(".done").length;

  todos.style.visibility = todosTaks > 0 ? "visible" : "hidden";
  dones.style.visibility = donesTaks > 0 ? "visible" : "hidden";
}

function removeTask(e) {
  const currentTask = e.target.closest(".todo, .done");
  if (!currentTask) return;
  currentTask.remove();
  todos.style.visibility = todos.querySelector(".todo") ? "visible" : "hidden";
  dones.style.visibility = dones.querySelector(".done") ? "visible" : "hidden";
}
