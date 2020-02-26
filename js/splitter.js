//DOM & Form Fields
var payerNameInput = document.getElementById("payer-name-input");
var payerContribInput = document.getElementById("payer-contribution-input");
var savePayerBtn = document.getElementById("save-payer-btn");
var payerCardsUL = document.getElementById("payer-cards-ul");
var curBillSpanEl = document.getElementById("current-bill");
var modalTrigger = "add";
var dataIndex = 0;

//Bills & Payer Details & Classes
var totalBill = 0;
var payerArr = [];
class Payer {
    constructor(name, amountPaid, netOwed) {
        this.name = name;
        this.amountPaid = parseFloat(amountPaid);
        this.netOwed = parseFloat(netOwed);

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
        calcTotalBill()
    }

    // Render todos to the DOM
    showCards();
}



//add event listener to form submit
savePayerBtn.addEventListener("click", function(event) {
    event.preventDefault();


    if (modalTrigger === "add") {

        payerArr.push(new Payer(payerNameInput.value, parseFloat(payerContribInput.value), 0));
        setStorage();

        $('#contributor-modal').modal('hide');
        payerNameInput.value = "";
        payerContribInput.value = "";
        showCards();
    } else {
        editPayer();
    }

})

//add event listener to the ul and target edit buttons and delete buttons

payerCardsUL.addEventListener('click', function() {
    var curCard = event.target.parentNode.getAttribute("data-index");
    modalTrigger = event.target.getAttribute("function");
    dataIndex = curCard;

    if (modalTrigger === "delete") {
        payerArr.splice(dataIndex, 1);
        setStorage();
        showCards();
        modalTrigger = "add";
        return modalTrigger;

    }

    $('#contributor-modal').modal('show');

    payerNameInput.value = payerArr[curCard].name;
    payerContribInput.value = payerArr[curCard].amountPaid;

    return curCard;
});

function editPayer() {

    //if function = edit, show modal
    if (modalTrigger === "edit") {

        //set the values of the modal to the data - attribute of card
        payerArr[dataIndex].name = payerNameInput.value;
        payerArr[dataIndex].amountPaid = parseFloat(payerContribInput.value);
        $('#contributor-modal').modal('hide');

        setStorage();
        showCards();
        payerNameInput.value = "";
        payerContribInput.value = "";
        modalTrigger = "add";
        return modalTrigger;
    }
}

function showCards() {

    //clear the display of all cards
    payerCardsUL.innerHTML = `<div class="row"></div>`;

    //loop through the array of payers to display their cards
    for (let i = 0; i < payerArr.length; i++) {
        var cardBlock = `<div id="card-${i}" class="payer-card h-100"><div class="card bg-light mb-3"><div class="card-header d-flex justify-content-between align-items-center" data-index="${i}"><span id="payer-name-${i}"></span> <button class="btn btn-secondary" function="edit">Edit</button></div><div class="card-body"><p class="card-title">Contribution:</p><h5 class="card-text"><span id="payer-contrib-${i}"></span></h5><ul class="list-unstyled"></ul></div><div class="card-footer text-right" data-index="${i}"><button type="button" class="btn btn-danger" function="delete">Delete</button></div></div></div>`;

        var li = document.createElement("li");
        li.setAttribute("class", "list-inline-item col-md-4 col-sm-12 m-0");
        li.innerHTML = cardBlock;

        payerCardsUL.firstElementChild.appendChild(li);

        let nameOnCard = document.getElementById(`payer-name-${i}`);
        nameOnCard.textContent = payerArr[i].name;

        let payerContrib = document.getElementById(`payer-contrib-${i}`);
        payerContrib.textContent = "$" + payerArr[i].amountPaid;

    }
    calcTotalBill()
    calcGroupOwed();
}


function calcTotalBill() {
    //calculate the total cost from all of the payerArr expenses & display on DOM
    var totalBill = 0;
    for (let i = 0; i < payerArr.length; i++) {
        totalBill += parseFloat(payerArr[i].amountPaid);
    }
    curBillSpanEl.innerText = parseFloat(totalBill);
    calcNetOwed();
    return totalBill;
}

function calcNetOwed() {
    for (let i = 0; i < payerArr.length; i++) {
        payerArr[i].netOwed = (payerArr[i].amountPaid / payerArr.length);
        parseFloat(payerArr[i].netOwed);
    }
}




function calcGroupOwed() {
    for (let i = 0; i < payerArr.length; i++) {
        let x = payerArr[i];
        x.groupOwed = [];
        cardBody = document.getElementById(`card-${i}`).firstElementChild.firstElementChild.nextElementSibling;

        for (let j = 0; j < payerArr.length; j++) {
            let y = payerArr[j];
            if (x === y) {
                continue
            } else {
                if (x.netOwed >= y.netOwed) {
                    continue
                } else {
                    var name = y.name;
                    var owes = (parseFloat(y.netOwed).toFixed(2) - parseFloat(x.netOwed).toFixed(2));
                    var text = `Owes ${name}: $${owes.toFixed(2)}`;

                    cardUL = document.getElementById(`card-${i}`).firstElementChild.firstElementChild.nextElementSibling.lastElementChild;

                    var li = document.createElement("li");
                    li.textContent = text;
                    li.setAttribute("class", "")
                    cardUL.appendChild(li);


                    x.groupOwed.push({
                        name: y.name,
                        owes: (y.netOwed - x.netOwed)
                    });

                }
            }
        }
    }
}