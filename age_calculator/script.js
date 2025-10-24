let userinput = document.getElementById("birthdate");
userinput.max = new Date().toISOString().split("T")[0];

const btn = document.querySelector(".calc");


function calcage() {
    let bdate = new Date(userinput.value);
    let d1 = bdate.getDate();
    let m1 = bdate.getMonth() + 1;
    let y1 = bdate.getFullYear();

    let today = new Date();
    let d2 = today.getDate();
    let m2 = today.getMonth() + 1;
    let y2 = today.getFullYear();
    
    let d3, m3, y3;
    y3 = y2-y1;
    if(m2>=m1) {
        m3 =  m2-m1;

    }
    else {
        m3 = 12 + (m2-m1);
        y3--;
    }
    if(d2>=d1) {
        d3 = d2-d1;
    }
    else  {
        m3--;
        d3 = getDaysInMonth(y1, m1) +  (d2-d1);
    }
    if(m3<0) {
        m3 = 11;
        y3--;
    }
    console.log("Age is " + y3 + " years " + m3 + " months " + d3 + " days ");
    document.getElementById("age").innerHTML = "Age is " + y3 + " years " + m3 + " months " + d3 + " days ";        
    
 
}

function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

btn.addEventListener("click", calcage); 
