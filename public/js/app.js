console.log("client side javascript loaded");



let form= document.querySelector("form");

form.addEventListener("click", (event)=>{
    event.preventDefault();

    let adress= document.querySelector("input").value;
    console.log(adress)
    
    fetch("http://localhost:3000/weather?address="+adress)
    .then(res=>res.json())
    .then(data=>{
        let par= document.getElementById("forecast");
;
        par.textContent=data.forecast
        console.log(data)
    })
        
       

})

// document.getElementById('error');