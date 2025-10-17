const base_url = "https://api.exchangerate-api.com/v4/latest";
const  fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const dropdowns = document.querySelectorAll(".dropdown select");
const msg = document.querySelector(".msg");

for(let select of dropdowns) {
    for(currCode in countryList) {
        let newoptions = document.createElement("option");
        newoptions.value = currCode;
        newoptions.innerText = currCode;
        if(select.name === "from" && currCode === "USD") {
            newoptions.selected = true;
        }
        if(select.name === "to" && currCode === "INR") {
            newoptions.selected = true;
        }
        select.append(newoptions);
    }
    select.addEventListener("change", (evt) => {
        loadflag(evt.target);
    });
}


const loadflag  = (element) => {
    let code = element.value;
    let countrycode = countryList[code];
    let newimg = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newimg;
}

const btn = document.querySelector("form button");
msg.style.display = "none";
btn.addEventListener("click", async (e) =>{
    e.preventDefault();
    let amount = document.querySelector(".amount input").value;
    console.log(amount);
    if(amount === "" || amount <= 0) {
        amount = 1;
    }
    const url = `${base_url}/${fromcurr.value}`;
    console.log(url);
    let response = await fetch(url);
    let data =  await response.json();
    console.log(data);

    let excvalue = data.rates[tocurr.value];
    console.log(excvalue);
    let totalexcvalue = (amount * excvalue).toFixed(2);
    console.log(totalexcvalue);
    btn.innerText = `${totalexcvalue} ${tocurr.value}`;
    btn.style.backgroundColor = "#3e20e6ff";
    btn.style.color = "white";
    msg.style.display = "block";
    msg.innerText = `1 ${fromcurr.value} = ${data.rates[tocurr.value]} ${tocurr.value}`;

})


msg.innerText = `1 ${fromcurr.value} = ${data.rates[tocurr.value]} ${tocurr.value}`;
