/*
    Josh Peng
    Logic for running the game and creating UI shop buttons.
    There is no overflow protection but it might take a while to reach that.
*/

// Represents a button in the shop
class ShopButton {
    // Constructor initializes a new instance of the ShopButton class
    constructor(name, initialCost, growthRate, benefit, image, costGrowthFunction, onClickFunction) {
        this.name = name;
        this.cost = initialCost;
        this.rate = growthRate;
        this.benefit = benefit;
        this.bought = 0;
        this.image = image;
        this.costGrowthFunction = costGrowthFunction;
        this.onClickFunction = onClickFunction;

        this.buttonElement = this.makeButton();
        document.getElementsByClassName("shopContent")[0].appendChild(this.buttonElement);      // add button to shopContent
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
    makeButton() {      // this method was imagined, syntax for attaching a function was vibecoded lol
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
        nButton.onclick = () => { this.handleClick(); };        // don't know this syntax but it works

        return nButton;
    }

    // Handles when this instance is clicked
    handleClick() {
        if (cheeseCount >= this.cost) {       // do something if can afford
            cheeseCount -= this.cost;
    
            // new_cost = base_cost × (cost_multiplier ^ number_owned)
            this.cost = this.costGrowthFunction(this);// Math.ceil(this.cost * this.rate);       // cookie clicker formula I think
            this.bought++;
    
            this.onClickFunction(this.benefit);
        }
    }
}

// Normal exponential growth function to calculate next cost
function expGrowth(button) {
    return Math.ceil(button.cost * button.rate);        // cookie clicker formula I think
}

// Fast exponential growth function to calculate next cost
function fastGrowth(button) {
    return Math.ceil(button.cost * Math.pow(button.rate, button.bought + 1));
}

// Very specific growth function for next cost
function piecewiseGrowth(button) {
    if (button.cost === 100) {
        return 500;
    }
    if (button.cost === 500) {
        return 10000;
    }
    return button.cost * 10;
}

// Increase passive cheese gains by its formula
function passiveGain(benefit) {
    passiveRate += benefit;
    updateCheeseText();     // update every number in the UI
}

// Increase active cheese gains by its formula
function activeGain(benefit) {
    clickPower *= benefit;
    updateCheeseText();     // update every number in the UI
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let cheeseCount = 0;                    // cheese in pocket
let passiveRate = 0;                    // cheese gained every second from farms
let clickPower = 1;                     // cheese gained from clicking
const formatChangePoint = 999999;       // point at which numbers are formatted in exp instead

/*                                      name                cost        growth  gains   pic                     growth func         gains func  */
const clickButton =     new ShopButton("Click Power",       100,        5.0,    2,      "./images/cursor.png",  expGrowth,          activeGain);
const ratButton =       new ShopButton("Trained Rat",       15,         1.1,    1,      "./images/rat.png",     expGrowth,          passiveGain);
const manButton =       new ShopButton("Italian Person",    80,         1.1,    8,      "./images/man.png",     expGrowth,          passiveGain);
const cannonButton =    new ShopButton("Cheese Cannon",     1200,       1.1,    45,     "./images/cannon.png",  expGrowth,          passiveGain);
const factoryButton =   new ShopButton("Cheese Factory",    14000,      1.1,    379,    "./images/factory.png", expGrowth,          passiveGain);
const wizardButton =    new ShopButton("Nacho-mancer",      125000,     1.1,    1333,   "./images/wizard.png",  expGrowth,          passiveGain);
const raptureButton =   new ShopButton("Cheese Rapture",    1000000,    1.1,    7999,   "./images/rapture.png", expGrowth,          passiveGain);
/*      unbalanced
const clickButton =     new ShopButton("Click Power",       100,        0.0,    2,      "./images/cursor.png",  piecewiseGrowth,    activeGain);
const ratButton =       new ShopButton("Trained Rat",       15,         1.1,    1,      "./images/rat.png",     expGrowth,          passiveGain);
const manButton =       new ShopButton("Italian Person",    100,        1.12,   3,      "./images/man.png",     expGrowth,          passiveGain);
const cannonButton =    new ShopButton("Cheese Cannon",     1200,       1.14,   8,      "./images/cannon.png",  expGrowth,          passiveGain);
const factoryButton =   new ShopButton("Cheese Factory",    14000,      1.16,   45,     "./images/factory.png", expGrowth,          passiveGain);
const wizardButton =    new ShopButton("Nacho-mancer",      160000,     1.18,   256,    "./images/wizard.png",  expGrowth,          passiveGain);
const raptureButton =   new ShopButton("Cheese Rapture",    1000000,    1.20,   1333,   "./images/rapture.png", expGrowth,          passiveGain);
*/

function main() {
    updateCheeseText();     // first time init

    setInterval(passiveCheeseIncome, 1000);     // add passive income every 1000ms (1s)
}

main();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Add cheese from passiveRate
function passiveCheeseIncome() {
    cheeseCount += passiveRate;
    updateCheeseText();
}

// Add cheese from clickPower
function onClickCheese() {
    cheeseCount += clickPower;
    updateCheeseText();
}

// Separate function for updating all text to account for async and events
function updateCheeseText() {
    let count = cheeseCount > formatChangePoint ? cheeseCount.toExponential(3) : cheeseCount.toLocaleString();
    let rate = passiveRate > formatChangePoint ? passiveRate.toExponential(3) : passiveRate.toLocaleString();
    document.getElementById("cheeseCounter").innerText = count + " Cheeses";        // update cheese counter
    document.getElementById("cheeseRate").innerText = "per second: " + rate;        // update cheese rate

    // update button texts
    updateShopButton(clickButton);
    updateShopButton(ratButton);
    updateShopButton(manButton);
    updateShopButton(cannonButton);
    updateShopButton(factoryButton);
    updateShopButton(wizardButton);
    updateShopButton(raptureButton);
}

// Updates the text of a single button in the shop
function updateShopButton(button) {
    const costElement = button.buttonElement.getElementsByClassName("shopItemCost")[0];        // update cost amount
    costElement.innerText = button.cost > formatChangePoint ? button.cost.toExponential(3) : button.cost.toLocaleString();;       // update price
    costElement.style.color = button.cost > cheeseCount ? "var(--red)" : "var(--green)";        // color changes depending on if can afford

    const boughtElement = button.buttonElement.getElementsByClassName("shopItemBought")[0];        // update bought amount
    boughtElement.innerText = button.bought;
}
