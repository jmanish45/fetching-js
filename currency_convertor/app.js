const base_url = "https://api.exchangerate-api.com/v4/latest";
const dropdowns = document.querySelectorAll(".dropdown-container select");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const exchangeRate = document.querySelector(".exchange-rate");
const swapBtn = document.querySelector(".swap-btn");
const form = document.querySelector("form");
const amountInput = document.querySelector(".amount input");

for(let select of dropdowns) {
    for(currCode in countryList) {
        let newoption = document.createElement("option");
        newoption.value = currCode;
        newoption.innerText = currCode;
        
        if(select.name === "from" && currCode === "USD") {
            newoption.selected = true;
        }
        if(select.name === "to" && currCode === "INR") {
            newoption.selected = true;
        }
        
        select.append(newoption);
    }
    
    select.addEventListener("change", (evt) => {
        loadflag(evt.target);
    });
}

const loadflag = (element) => {
    let code = element.value;
    let countrycode = countryList[code];
    let newimg = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newimg;
}

swapBtn.addEventListener("click", () => {
    const tempValue = fromcurr.value;
    fromcurr.value = tocurr.value;
    tocurr.value = tempValue;
    
    loadflag(fromcurr);
    loadflag(tocurr);
});

const convertCurrency = async () => {
    let amount = amountInput.value;
    
    if(amount === "" || amount <= 0) {
        amount = 1;
        amountInput.value = 1;
    }
    
    const url = `${base_url}/${fromcurr.value}`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data.rates[tocurr.value];
    let finalAmount = (amount * rate).toFixed(2);
    
    msg.innerHTML = `${amount} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
    msg.style.display = "block";
    
    exchangeRate.innerHTML = `1 ${fromcurr.value} = ${rate.toFixed(4)} ${tocurr.value}`;
    exchangeRate.style.display = "block";
    
    localStorage.setItem('lastConversion', JSON.stringify({
        from: fromcurr.value,
        to: tocurr.value,
        amount: amount
    }));
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    convertCurrency();
});

window.addEventListener("DOMContentLoaded", () => {
    const lastConversion = localStorage.getItem('lastConversion');
    if(lastConversion) {
        const data = JSON.parse(lastConversion);
        fromcurr.value = data.from;
        tocurr.value = data.to;
        amountInput.value = data.amount;
        loadflag(fromcurr);
        loadflag(tocurr);
    }
});