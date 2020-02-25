var payerNameEl = document.getElementById("payerName");
var payerContributionEl = document.getElementById("payerContribution");
var bodyEl = document.getElementsByTagName("body")[0];
var containerEl = bodyEl.firstElementChild;
var payerName, payerContribution;
var totalCosts = 0;
var numPayers = 0;
var payerList = new Map();
var addPayerBtn = document.getElementById("add-payer-btn");
var targetPayer = 0;
var payerCards = document.getElementsByClassName("payer-cards");
stringPayerList = "";

function loadStorage() {
    //numPayers = JSON.parse(localStorage.getItem("numPayers"));
    var pairArrayOfPayersFromStoreStr = localStorage.getItem("pairArrayOfPayers");
    var pairArrayOfPayersFromStore = JSON.parse(pairArrayOfPayersFromStoreStr)
    payerList = new Map(pairArrayOfPayersFromStore);
    return payerList;
}

loadStorage();

function displayStorage() {
    if (payerList.size === 0) {
        return
    }

    //show payer card
    //numPayers = 0;
    for (i = 1; i <= payerList.size; i++) {
        calcTotalCosts();
        showPayerCard();
        numPayers++;
    }
}

displayStorage();


function setLocalStorage() {
    var pairArrayOfPayers = [...payerList];
    var pairArrayOfPayersStr = JSON.stringify(pairArrayOfPayers);
    localStorage.setItem("pairArrayOfPayers", pairArrayOfPayersStr);
}

//event listeners
addPayerBtn.addEventListener("click", addPayer);
document.getElementById("save-payer-edits").addEventListener("click", editValues);

//add event listeners to all input fields
let inputFields = document.getElementsByClassName("form-control");
Array.from(inputFields).forEach(function(element) {
    element.addEventListener('input', setValues);
});


function setValues(element) {
    element.target.id === "payerName" ? payerName = payerNameEl.value : payerContribution = parseInt(payerContributionEl.value);
}

function editValues(event) {
    event.preventDefault();
    let edit = payerList.get(targetPayer);
    edit.name = document.getElementById("editPayerName").value;
    edit.amountPaid = parseInt(document.getElementById("editPayerContribution").value);
    calcTotalCosts();


    //target the spans to edit card details
    document.getElementById(`header-${targetPayer}`).innerHTML = edit.name;
    document.getElementById(`contribution-${targetPayer}`).innerHTML = "$" + edit.amountPaid;
    $('#edit-contributor-modal').modal('toggle');
    setLocalStorage();
}

function addPayer(event) {
    event.preventDefault();
    if (payerNameEl.value === "") {
        alert("Please enter a name.");
    } else if (payerContributionEl.value === "") {
        alert("Please enter the amount this person spent.");
    } else {
        let payer = new BillPayer(payerName, payerContribution, 0);
        payerList.set(numPayers, payer);

        calcTotalCosts()
        showPayerCard();
        clearInputs();

        numPayers++;
        setLocalStorage();

    }
}


function clearInputs() {
    payerContributionEl.value = "";
    payerNameEl.value = "";
}

function showPayerCard() {
    var cardBlock = `<div id="card-${numPayers}" class="mt-5 col-md-4 payer-card"><div class="card bg-light mb-3"> <div class="card-header d-flex justify-content-between align-items-center"> </div> <div class="card-body"> <p class="card-title"></p><h5 id="contribution-${numPayers}" class="card-text"></h5></div>  <div class="card-footer text-right"><button map-index="${numPayers}" type="button" class="btn btn-danger">Delete</button></div></div></div>`;
    // document.body.insertAdjacentHTML("beforeend", cardBlock);

    var row = `<div class="row payer-cards"> </div>`;
    if (numPayers === 0) {
        payerCards[0].insertAdjacentHTML("beforeend", cardBlock);
    } else if (numPayers % 3 === 0) {
        payerCards[payerCards.length - 1].insertAdjacentHTML("afterend", row);
        payerCards[payerCards.length - 1].insertAdjacentHTML("beforeend", cardBlock);
    } else {
        payerCards[payerCards.length - 1].insertAdjacentHTML("beforeend", cardBlock);
    }

    setCardDetails();

    tagEditBtns();
    tagDeleteBtns();
}

function setCardDetails() {
    let curPayer = payerList.get(numPayers);
    let curName = curPayer.name;
    let curCard = document.getElementById(`card-${numPayers}`);
    curCard.getElementsByClassName("card-header")[0].innerHTML = `<span id="header-${numPayers}">${curName}</span><button id="${numPayers}" type="button" class="btn btn-secondary modal-button" data-toggle="modal" data-target="#edit-contributor-modal">Edit</button>`;
    curCard.getElementsByClassName("card-title")[0].innerHTML = " Contributed:";
    curCard.getElementsByClassName("card-text")[0].innerHTML = "$" + `<span id="contribution-${numPayers}">${curPayer.amountPaid}</span>`;
}

function populateModal(event) {
    let curPayer = payerList.get(parseInt(event.target.id));
    let curName = curPayer.name;
    let curContribution = curPayer.amountPaid;
    let modalName = document.getElementById("editPayerName");
    let modalContribution = document.getElementById("editPayerContribution");
    modalName.value = curName;
    modalContribution.value = curContribution;

    return targetPayer = parseInt(event.target.id);
}

function tagEditBtns() {
    //add event listeners to edit btns in cards
    var modalButtons = document.getElementsByClassName("modal-button");
    Array.from(modalButtons).forEach(function(element) {
        element.addEventListener('click', populateModal);
        //console.log(modalButtons);
    });
}

function tagDeleteBtns() {
    //add event listeners to delete btns in cards
    var deleteBtns = document.getElementsByClassName("btn-danger");
    Array.from(deleteBtns).forEach(function(element) {
        element.addEventListener('click', deletePayer);
    });

}

function deletePayer(event) {
    event.preventDefault();

    payerList.delete(parseInt(event.target.getAttribute("map-index")));
    console.log(payerList);
    setLocalStorage();
    loadStorage();
    //console.log(payerList);
    //calcTotalCosts();
    displayStorage();
    // numPayers = payerList.size;


}

class BillPayer {
    constructor(name, amountPaid, amountOwed) {
        this.name = name;
        this.amountPaid = amountPaid;
        this.amountOwed = amountOwed;
    }
}

//function to calculate the total expenditures
function calcTotalCosts() {
    totalCosts = 0;
    for (let [key] of payerList.entries()) {
        let x = payerList.get(key);
        let curPaid = x.amountPaid;
        totalCosts += curPaid;
    }
    return parseInt(totalCosts);
}