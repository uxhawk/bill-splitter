//DOM & Form Fields
var payerNameInput = document.getElementById("payer-name-input");
var payerContribInput = document.getElementById("payer-contribution-input");
//var containerEl = document.getElementsByTagName("body")[0].firstElementChild;
var savePayerBtn = document.getElementById("save-payer-btn");
var payerCardsUL = document.getElementById("payer-cards-ul");
var curBillSpanEl = document.getElementById("current-bill");
var modalTrigger = "add";
var dataIndex = 0;

//Bills & Payer Details & Classes
var totalBill = 0;
var payerArr = [];
class Payer {
    constructor(name, amountPaid, amountOwed) {
        this.name = name;
        this.amountPaid = amountPaid;
        this.amountOwed = amountOwed;
    }

    calcAmountOwed() {
        //calculate how much this payer is owed & display in dom
    }
}

init();

function setStorage() {
    localStorage.setItem("payerArr", JSON.stringify(payerArr));

}

function init() {
    // Get stored payerList from localStorage
    // Parsing the JSON string to an object
    var storedPayerList = JSON.parse(localStorage.getItem("payerArr"));

    // If todos were retrieved from localStorage, update the todos array to it
    if (storedPayerList !== null) {
        payerArr = storedPayerList;
    }

    // Render todos to the DOM
    showCards();
}



//add event listener to form submit
savePayerBtn.addEventListener("click", function(event) {
    event.preventDefault();

    //console.log(modalTrigger, "here");
    if (modalTrigger === "add") {

        payerArr.push(new Payer(payerNameInput.value, parseFloat(payerContribInput.value), 0));
        setStorage();
        //console.log(payerArr);
        $('#contributor-modal').modal('hide');
        payerNameInput.value = "";
        payerContribInput.value = "";
        showCards();
    } else {
        editPayer();
    }

})

//prevent default, push into payerArr
//if editing, target the index of the payer details (payerArr[i] = new modal values)
//main function call to set storage, showCards,create payer, calculate total cost, calculate total amount owed


//add event listener to the ul and target edit buttons and delete buttons

payerCardsUL.addEventListener('click', function() {
    $('#contributor-modal').modal('show');
    var curCard = event.target.parentNode.getAttribute("data-index");
    dataIndex = curCard;
    console.log(curCard);
    payerNameInput.value = payerArr[curCard].name;
    payerContribInput.value = payerArr[curCard].amountPaid;
    modalTrigger = event.target.getAttribute("function");
    return curCard;
});

function editPayer() {

    //if function = edit, show modal
    if (modalTrigger === "edit") {
        console.log('hey');

        //set the values of the modal to the data - attribute of card
        payerArr[dataIndex].name = payerNameInput.value;
        payerArr[dataIndex].amountPaid = payerContribInput.value;



        $('#contributor-modal').modal('hide');
        modalTrigger = "add";
        setStorage();
        showCards();
        return modalTrigger;
    } else if (modalTrigger === "delete") {

    }

    // if function = delete, delete
}

function showCards() {

    //clear the display of all cards
    payerCardsUL.innerHTML = `<div class="row"></div>`;

    //loop through the array of payers to display their cards
    for (let i = 0; i < payerArr.length; i++) {
        var cardBlock = `<div id="card-${i}" class="payer-card"><div class="card bg-light mb-3"><div class="card-header d-flex justify-content-between align-items-center" data-index="${i}"><span id="payer-name-${i}"></span> <button class="btn btn-secondary" function="edit">Edit</button></div><div class="card-body"><p class="card-title">Contribution:</p><h5 class="card-text"><span id="payer-contrib-${i}"></span></h5></div><div function="delete" class="card-footer text-right" data-index="${i}"><button type="button" class="btn btn-danger">Delete</button></div></div></div>`;

        var li = document.createElement("li");
        li.setAttribute("class", "list-inline-item col-md-4 col-sm-12 m-0");
        li.innerHTML = cardBlock;

        payerCardsUL.firstElementChild.appendChild(li);

        let nameOnCard = document.getElementById(`payer-name-${i}`);
        nameOnCard.textContent = payerArr[i].name;

        let payerContrib = document.getElementById(`payer-contrib-${i}`);
        payerContrib.textContent = "$" + payerArr[i].amountPaid;
    }

}

function populateModal() {
    //if data target is edit btn, populate with array values
    //-if editng, update array values upon completion
    //-if editing, update total cost and amount each person is owed upon completion
    //update local storage

    //if data target is add payer, load empty values

}

// function savePayerDetails(event) {
//     event.preventDefault();
//     let functionAtt = event.target.getAttribute("function");
//     console.log(functionAtt);
//     if (functionAtt === "add") {

//         payerArr.push(new Payer(payerNameInput.value, payerContribInput.value, 0));
//         setStorage();
//         console.log(payerArr);
//         $('#contributor-modal').modal('hide');
//     }
//     //display the card in the dom
//     //update local storage
// }

function calcTotalBill() {
    //calculate the total cost from all of the payerArr expenses & display on DOM
}