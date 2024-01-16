const appform = document.querySelector("#appform");
const errorDiv = document.querySelector("#errorDiv");
const infoDiv = document.querySelector("#infoDiv");

appform.addEventListener("submit", (event) => {
  if (
    !event.target.elements.fio.value ||
    !event.target.elements.numberPhone.value ||
    !event.target.elements.title.value
  ) {
    event.preventDefault();
    infoDiv.style.display = "none";
    errorDiv.textContent = "Заполните все поля";
    errorDiv.style.display = "block";
  } else {
    errorDiv.style.display = "none";
    infoDiv.textContent = "Идет отправка данных";
    infoDiv.style.display = "block";
    event.target.elements.submit.disabled = true;
    // event.preventDefault();
  }
});

async function update(newNote) {
  await fetch(`/${newNote.id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote),
  });
}

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}
