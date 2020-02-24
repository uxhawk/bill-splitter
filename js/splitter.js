var payerNameEl = document.getElementById("payerName");
var payerContributionEl = document.getElementById("payerContribution");
var bodyEl = document.getElementsByTagName("body")[0];
var payerName, payerContribution;
var numPayers = 0;
var payerList = new Map();
var addPayerBtn = document.getElementById("add-payer-btn");
var targetPayer = 0;


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
    edit.amountPaid = document.getElementById("editPayerContribution").value;

    //target the spans to edit card details
    document.getElementById(`header-${targetPayer}`).innerHTML = edit.name;
    document.getElementById(`contribution-${targetPayer}`).innerHTML = edit.amountPaid;
    $('#edit-contributor-modal').modal('toggle');
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
        //console.log(payerList);
        showPlayerCard();
        clearInputs();
        numPayers++;
    }
}

function clearInputs() {
    payerContributionEl.value = "";
    payerNameEl.value = "";
}

function showPlayerCard() {
    var cardBlock = `<div id="card-${numPayers}" class="mt-5 col-md-4 payer-card"><div class="card bg-light mb-3" style="max-width: 18rem;"> <div class="card-header card-header d-flex justify-content-between align-items-center">  </div> <div class="card-body"> <p class="card-title"></p><h5 id="contribution-${numPayers}" class="card-text"></h5></div></div></div>`;
    document.body.insertAdjacentHTML("beforeend", cardBlock);

    setCardDetails();

    tagEditBtns()
}

function setCardDetails() {
    let curPayer = payerList.get(numPayers);
    let curName = curPayer.name;
    let curCard = document.body.lastElementChild;
    curCard.getElementsByClassName("card-header")[0].innerHTML = `<span id="header-${numPayers}">${curName}</span><button id="${numPayers}" type="button" class="btn btn-secondary modal-button" data-toggle="modal" data-target="#edit-contributor-modal">Edit</button>`;
    curCard.getElementsByClassName("card-title")[0].innerHTML = " Contributed:";
    curCard.getElementsByClassName("card-text")[0].innerHTML = "$" + `<span id=>${payerContribution}</span>`;
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

class BillPayer {
    constructor(name, amountPaid, amountOwed) {
        this.name = name;
        this.amountPaid = amountPaid;
        this.amountOwed = amountOwed;
    }
}