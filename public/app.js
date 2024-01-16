const appform = document.querySelector("#appform");

appform.addEventListener("submit", (event) => {
  event.preventDefault();
  if(!event.target.elements.fio||!event.target.elements.number||!event.target.elements.Phonetitle){
    const errorDiv = document.querySelector("#errorDiv");
    errorDiv.textContent = "Заполните все поля";
    errorDiv.style.display="block";
  }else {    
    const infoDiv = document.querySelector("#infoDiv");
    infoDiv.textContent = "Данные готовы к отправке";
    infoDiv.style.display="block";
}
  let infoErrorSpan = true;
  const errorSpan = document.querySelector(".error-message-block") || document.createElement("span");
  if(!errorSpan.className){
    errorSpan.className = "error-message-block";
    infoErrorSpan = false;
  }
  if(!event.target.elements.taskName.value){
    errorSpan.innerHTML += `<br>Заполните все поля`;
    if(!infoErrorSpan)appform.insertAdjacentElement("beforeend", errorSpan);
    return; 
  }
})






















async function update(newNote) {
  await fetch(`/${newNote.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newNote)
  })
}

async function remove(id) {
  await fetch(`/${id}`, {method: 'DELETE'})
}