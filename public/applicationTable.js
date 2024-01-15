let appTable;
let currentPage = 0;
let allNumPages = 0;

const previouspage = document.querySelector("#previouspage");
const nextpage = document.querySelector("#nextpage");
const tbody = document.querySelector("tbody");

window.onload = async function () {
  let response = await fetch(`applicationTable/all`);
  // let response = await fetch(`applicationTable/${idNote}`);
  if (response.ok) {
    appTable = await response.json();
    // console.log(test);
    allNumPages = appTable.length;

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
  appTable.forEach((el, index) => {
    const newTagTr = document.createElement("tr");
    const newTagTdCol1 = document.createElement("td")
     newTagTdCol1.textContent = appTable.date
    const newTagTdCol2 = document.createElement("td");
    newTagTdCol2.textContent = appTable.fio
    const newTagTdCol3 = document.createElement("td");
    newTagTdCol3.textContent = appTable.numberPhone
    const newTagTdCol4 = document.createElement("td");
    newTagTdCol4.textContent = appTable.title

    newTagTr.insertAdjacentElement("beforeend", newTagTd);
    tbody.insertAdjacentElement("beforeend", newTagTr);
  });
}

function viewNumPages() {
  currentPage === 0
    ? previouspage.setAttribute("disabled", true)
    : previouspage.removeAttribute("disabled");
  if (currentPage === allNumPages - 1) {
    nextpage.style.display = "none";
    finishome.style.display = "inline-block";
  } else {
    nextpage.style.display = "inline-block";
    finishome.style.display = "none";
  }

  document.querySelector("#numquastion").innerText =
    String(String(currentPage)) +
    "/" +
    String(allNumPages);
}
