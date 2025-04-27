/*


*/

// Represents a button in the shop
class ShopButton {
    constructor(name, initialCost, growthRate, benefit, image, onClickFunction) {
        this.name = name;
        this.cost = initialCost;
        this.rate = growthRate;
        this.benefit = benefit;
        this.bought = 0;
        this.image = image;
        this.onClickFunction = onClickFunction;

        this.buttonElement = this.makeButton();
        document.getElementsByClassName("shopContent")[0].appendChild(this.buttonElement);
    }

    /*
    Creates a button element of this structure
    <div class="shopButton neueFont">
        <img class="shopItemPic" src="./images/cursor.png" alt="Pic">
        <div class="shopItemInfo">
            <div class="shopItemName">PLACEHOLDER_NAME</div>
            <div class="shopItemCost">0000</div>
        </div>
        <div class="shopItemBought">00</div>
    </div>
    */
    makeButton() {      // this method was imagined, syntax was partially 'vibecoded'
        const nButton = document.createElement("div");
        nButton.classList.add("shopButton", "neueFont");
    
        const itemPic = document.createElement("img");
        itemPic.classList.add("shopItemPic");
        itemPic.src = this.image;
        itemPic.alt = "Pic";
    
        const itemInfo = document.createElement("div");
        itemInfo.classList.add("shopItemInfo");
    
        const itemName = document.createElement("div");
        itemName.classList.add("shopItemName");
        itemName.innerHTML = this.name;
    
        const itemCost = document.createElement("div");
        itemCost.classList.add("shopItemCost");   
        itemCost.innerHTML = this.cost;
    
        itemInfo.appendChild(itemName);
        itemInfo.appendChild(itemCost);
    
        const itemBought = document.createElement("div");
        itemBought.classList.add("shopItemBought");
        itemBought.innerHTML = "0";
    
        nButton.appendChild(itemPic);
        nButton.appendChild(itemInfo);
        nButton.appendChild(itemBought);
    
        // assign a onclick function that can update the instance variables of this object
        // nButton.onclick = () => { this.onClickFunction(this); };        // don't know this syntax but it works
        nButton.onclick = () => { this.handleClick(); };

        return nButton;
    }

    handleClick() {
        if (cheeseCount >= this.cost) {       // do something if can afford
            cheeseCount -= this.cost;
    
            // new_cost = base_cost × (cost_multiplier ^ number_owned)
            this.cost = Math.ceil(this.cost * this.rate);       // cookie clicker formula I think
            this.bought++;
    
            this.onClickFunction(this.benefit);
        }
    }
}

// Increase passive cheese gains by its formula
function passiveGain(benefit) {
    passiveRate += benefit;
    updateCheeseText();     // update every number in the UI
}

// Increase active cheese gains by its formula
function activeGain(benefit) {
    clickPower += benefit;
    updateCheeseText();     // update every number in the UI
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let cheeseCount = 0;
let passiveRate = 0;
let clickPower = 1;
const formatChangePoint = 999999;

/*                                      name                cost        growth  increase                                            */
const clickButton =     new ShopButton("Click Power",       60,         4.7,    1,      "./images/cursor.png",  activeGain); //clickButtonClick);
const ratButton =       new ShopButton("Trained Rat",       15,         1.1,    1,      "./images/rat.png",     passiveGain); //shopButtonClick);
const manButton =       new ShopButton("Italian Person",    100,        1.12,   3,      "./images/man.png",     passiveGain); //shopButtonClick);
const cannonButton =    new ShopButton("Cheese Cannon",     1200,       1.14,   8,      "./images/cannon.png",  passiveGain); //shopButtonClick);
const factoryButton =   new ShopButton("Cheese Factory",    14000,      1.16,   45,     "./images/factory.png", passiveGain); //shopButtonClick);
const wizardButton =    new ShopButton("Nacho-mancer",      160000,     1.18,   256,    "./images/wizard.png",  passiveGain); //shopButtonClick);
const raptureButton =   new ShopButton("Cheese Rapture",    1000000,    1.20,   1333,   "./images/rapture.png", passiveGain); //shopButtonClick);

main();

function main() {
    updateCheeseText();     // first time init

    setInterval(passiveCheeseIncome, 1000);     // add passive income every 1000ms (1s)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function passiveCheeseIncome() {
    cheeseCount += passiveRate;
    updateCheeseText();
}

function onClickCheese() {
    cheeseCount += clickPower;
    updateCheeseText();
}

// separate function for updating text to account for async and events
function updateCheeseText() {
    let count = cheeseCount > formatChangePoint ? cheeseCount.toExponential(3) : cheeseCount.toLocaleString();
    let rate = passiveRate > formatChangePoint ? passiveRate.toExponential(3) : passiveRate.toLocaleString();
    document.getElementById("cheeseCounter").innerText = count + " Cheeses";
    document.getElementById("cheeseRate").innerText = "per second: " + rate;

    updateShopButton(clickButton);
    updateShopButton(ratButton);
    updateShopButton(manButton);
    updateShopButton(cannonButton);
    updateShopButton(factoryButton);
    updateShopButton(wizardButton);
    updateShopButton(raptureButton);
}

function updateShopButton(button) {
    const cost = button.buttonElement.querySelector(".shopItemCost");       // function was imagined, querySelector was 'vibecoded'
    cost.innerText = button.cost > formatChangePoint ? button.cost.toExponential(3) : button.cost.toLocaleString();;       // update price
    if (button.cost > cheeseCount) {        // color changes depending on if can buy
        cost.style.color = "var(--red)";
    }
    else {
        cost.style.color = "var(--green)";
    }
    const bought = button.buttonElement.querySelector(".shopItemBought");       // update bought amount
    bought.innerText = button.bought;
}
