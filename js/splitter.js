// var checkInputField = document.getElementById("inputCheck");
// var tipInputField = document.getElementById("tipPercentInput");
// var finalBill, addedTip, checkAmount, tipPercent;

// var calcTipBtn = document.getElementById("calc-tip-btn");





var payerNameEl = document.getElementById("payerName");
var payerContributionEl = document.getElementById("payerContribution");
var bodyEl = document.getElementsByTagName("body")[0];
var payerName, payerContribution;
var numPayers = 0;
var payerList = new Map();

var addPayerBtn = document.getElementById("add-payer-btn");


//event listeners
addPayerBtn.addEventListener("click", addPayer);


//add event listeners to all input fields
let inputFields = document.getElementsByClassName("form-control");
Array.from(inputFields).forEach(function(element) {
    element.addEventListener('input', setValues);
});


function setValues(element) {
    element.target.id === "payerName" ? payerName = payerNameEl.value : payerContribution = parseInt(payerContributionEl.value);
}

function addPayer(event) {
    event.preventDefault();
    let payer = new BillPayer(payerName, payerContribution, 0);

    payerList.set(numPayers, payer);
    console.log(payerList);
    displayPayer();
    clearInputs();
    numPayers++;

}

function clearInputs() {
    payerContributionEl.value = "";
    payerNameEl.value = "";
}

var cardBlock = `<div class="mt-5 col-md-4 payer-card"><div class="card bg-light mb-3" style="max-width: 18rem;"> <div class="card-header"></div> <div class="card-body"> <p class="card-title">Light card title</p><h5 class="card-text"></h5></div></div></div>`;


function displayPayer() {

    var curPayer = payerList.get(numPayers);
    var curName = curPayer.name;
    document.body.insertAdjacentHTML("beforeend", cardBlock);
    var curCard = document.body.lastElementChild;
    console.log(curCard);

    curCard.getElementsByClassName("card-header")[0].innerHTML = curName;
    curCard.getElementsByClassName("card-title")[0].innerHTML = " Contributed:";
    curCard.getElementsByClassName("card-text")[0].innerHTML = "$" + payerContribution;
}








class BillPayer {
    constructor(name, amountPaid, amountOwed) {
        this.name = name;
        this.amountPaid = amountPaid;
        this.amountOwed = amountOwed;
    }
}