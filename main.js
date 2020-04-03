// Global Variables
let accountBalance = 125000000000;
const moneyCounter =  document.getElementById('money-counter')
let remainingAmount;
const startingBal = 125000000000;

// Money Counter stick to top of page
window.onscroll = stick => {
    const header = document.getElementById('money-counter');
    const sticky = header.offsetTop;
    if(window.pageYOffset > sticky) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky')
    }
};


//Item Template
const source = document.getElementById('buy-item-template').innerHTML;
const template = Handlebars.compile(source);
const buyItems = {
    item: [
        {
            name: 'Big Mac',
            image: 'css/img/big-mac.jpg',
            price: 2,
            displayPrice: '2',
            inputId: 'big-mac-quantity'
        },
        {
            name: 'Accelerate COVID-19 Cure',
            image: 'css/img/covid-cure.jpg',
            price: 5000000,
            displayPrice: '5,000,000',
            inputId: 'covid-cure-quantity'
        },
        {
            name: 'Build a Water Well in Africa',
            image: 'css/img/water-well.jpg',
            price: 8000,
            displayPrice: '8,000',
            inputId: 'well-quantity'
        },
        {
            name: 'New LDS Meeting House',
            image: 'css/img/church.jpg',
            price: 5000000,
            displayPrice: '5,000,000',
            inputId: 'church-quantity'
        },
        {
            name: 'New Homeless Shelter',
            image: 'css/img/shelter.jpg',
            price: 10000000,
            displayPrice: '10,000,000',
            inputId: 'shelter-quantity'
        },
        {
            name: 'New LDS Temple',
            image: 'css/img/temple.jpg',
            price: 20000000,
            displayPrice: '20,000,000',
            inputId: 'temple-quantity'
        },
       
        
      
    ]
}

const compiledHtml = template(buyItems);
document.getElementById('showcase').innerHTML = compiledHtml;

//Format Money
function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
  
      const negativeSign = amount < 0 ? "-" : "";
  
      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;
  
      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
      console.log(e)
    }
  };
 
// Buy function
const showValue = x => {
    remainingAmount = accountBalance - x.target.value * x.target.name;
    moneyCounter.innerHTML = `$${formatMoney(parseInt(remainingAmount))} left!`;
    }

const buy = x => {
    accountBalance = parseInt(remainingAmount);
    moneyCounter.innerHTML = `$${formatMoney(parseInt(remainingAmount))} left!`;
    document.getElementById('achievements').innerHTML += `<div>You bought ${x.target.parentNode.firstElementChild.value} ${x.target.parentNode.parentNode.firstElementChild.innerHTML}s for <strong>$${formatMoney(parseInt(x.target.parentNode.firstElementChild.value * x.target.parentNode.firstElementChild.name))}</strong>`;
    document.getElementById('spent').innerHTML = `You have spent $<strong>${formatMoney(startingBal - parseInt(remainingAmount))}</strong>`
    x.target.parentNode.firstElementChild.value = 0;
    document.getElementById('break').style.display = '';
}

// Add Event listener to all 'Buy' buttons
const buttons = document.querySelectorAll('.buy-button');
buttons.forEach(button => {
    button.addEventListener('click', buy)
})

// add event listener to all inputs
const inputs = document.querySelectorAll('.hello');
inputs.forEach(i => {
    i.addEventListener('change',showValue)
  
})



/*
i.target.parentNode.lastElementChild.addEventListener('click', buy);
function buy() {
    document.getElementById('achievements').innerHTML += `<div>You just bought ${i.target.value} ${i.target.parentNode.parentNode.firstElementChild.innerHTML}s `
    console.log('you just bought something')
} */

