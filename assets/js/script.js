//Global Variables
var amountCountryFrom = document.body.querySelector(".amountCountryFrom");  //Variable holding the input amount to be converted
var countrySelection = document.body.querySelector(".countrySelection");  //Variable to select country
var conversionAmount  = document.body.querySelector(".conversionAmount");
var btnConvert = document.body.querySelector(".btnConvert");
var btnStartOver = document.body.querySelector(".btnStartOver");
var messageHandler = document.body.querySelector("#messageHandler");

//here we write the fucntion to convert from
function conversion () {
    
    //Call user input on amount to be converted
    var amount = localStorage.getItem("amount");

    //click event listener to convert to country to 
    
    return 
};

//This function handles errors
function handleErrors (type, theMessage) {  //param of message type
    messageHandler.textContent = theMessage;  //print message
    messageHandler.setAttribute("class", type); //
}

//Creating an event listener for the Convert button
btnConvert.addEventListener("click", function(event) {
    event.preventDefault(); //Added to keep persisitence on input

    //Amount to be converted entered here
    var amount = document.querySelector("#amountCountryFrom").value;
    //select the country from conversion
    var countryFrom = document.querySelector("countrySelection");
    if (amount === "") {
        handleErrors("error", "Enter Amount Needs Input");
    } else if (amount === 'string') {
        handleErrors("error", "Enter a Number");
    } else {
        handleErrors("success");
        localStorage.setItem("amount", amount);
        localStorage.setItem("countryFrom", countryFrom);
        conversion();
    }
});

var goldApiUrl = "https://www.goldapi.io/api/XAU/USD";

var myHeaders = new Headers();
myHeaders.append("x-access-token", "goldapi-1un118l8lqe0hm-io");
myHeaders.append("Content-Type", "application/json");

fetch(goldApiUrl, {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
})
.then(function (response) {
    return response.json()
})
.then(function (data) {
    console.log(data)
});