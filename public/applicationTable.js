let appTable;
let currentPage = 1;
let numRowPage = 4;
let allNumPages = 1;

const previouspage = document.querySelector("#previouspage");
const nextpage = document.querySelector("#nextpage");
const finishome = document.querySelector("#finishome");
const tbody = document.querySelector("tbody");

window.onload = async function () {
  let response = await fetch(`applicationTable/all`);
  // let response = await fetch(`applicationTable/${idNote}`);
  if (response.ok) {
    appTable = await response.json();
    // console.log(appTable);
    allNumPages = Math.round(appTable.length / numRowPage);
    appTable.sort((a, b) => a.date - b.date);
    viewNumPages();
    viewAppTable();
  }
};

document.addEventListener("click", (event) => {
  const id = event.target.id;
  switch (event.target.dataset.type) {
    case "nextpage": {
      currentPage = currentPage + 1;
      viewNumPages();
      viewAppTable();
      break;
    }
    case "previouspage": {
      currentPage = currentPage - 1;
      viewNumPages();
      viewAppTable();
      break;
    }
  }
});

function viewAppTable() {
  tbody.innerHTML = "";
  for (
    let index = (currentPage - 1) * numRowPage;
    index < currentPage * numRowPage && index < appTable.length;
    index++
  ) {
    const newTagTr = document.createElement("tr");
    const newTagTdCol1 = document.createElement("td");
    newTagTdCol1.textContent = appTable[index].date;
    const newTagTdCol2 = document.createElement("td");
    newTagTdCol2.textContent = appTable[index].fio;
    const newTagTdCol3 = document.createElement("td");
    newTagTdCol3.textContent = appTable[index].numberPhone;
    const newTagTdCol4 = document.createElement("td");
    newTagTdCol4.textContent = appTable[index].title;

    newTagTr.append(newTagTdCol1, newTagTdCol2, newTagTdCol3, newTagTdCol4);
    tbody.insertAdjacentElement("beforeend", newTagTr);
  }
}

function viewNumPages() {
  currentPage === 1
    ? previouspage.setAttribute("disabled", true)
    : previouspage.removeAttribute("disabled");
  if (currentPage === allNumPages) {
    nextpage.style.display = "none";
    finishome.style.display = "inline-block";
  } else {
    nextpage.style.display = "inline-block";
    finishome.style.display = "none";
  }

  document.querySelector("#numquastion").innerText =
    String(String(currentPage)) + "/" + String(allNumPages);
}
