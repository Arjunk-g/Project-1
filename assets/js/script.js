//Global Variables
var amountCountryFrom = document.body.querySelector(".amountCountryFrom");  //Variable holding the input amount to be converted
var countrySelection = document.body.querySelector(".countrySelection");  //Variable to select country
var conversionAmount  = document.body.querySelector(".conversionAmount");
var btnConvert = document.body.querySelector(".btnConvert");
var btnStartOver = document.body.querySelector(".btnStartOver");
var messageHandler = document.body.querySelector("#messageHandler");

//here we write the function to convert from
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
// btnConvert.addEventListener("click", function(event) {
//     event.preventDefault(); //Added to keep persistence on input

//     //Amount to be converted entered here
//     var amount = document.querySelector("#amountCountryFrom").value;
//     //select the country from conversion
//     var countryFrom = document.querySelector("countrySelection");
//     if (amount === "") {
//         handleErrors("error", "Enter Amount Needs Input");
//     } else if (amount === 'string') {
//         handleErrors("error", "Enter a Number");
//     } else {
//         handleErrors("success");
//         localStorage.setItem("amount", amount);
//         localStorage.setItem("countryFrom", countryFrom);
//         conversion();
//     }
// });

function getGoldApi(from, to, amount) {
    var amountCountry = document.getElementById("amountCountryFrom");
    var goldApiUrl = "https://www.goldapi.io/api/" + from + "/" + to + "/";
    var myHeaders = new Headers();
    var goldData;

    //append access key
    myHeaders.append("x-access-token", "goldapi-1un118l8lqe0hm-io");
    myHeaders.append("Content-Type", "application/json");
    
    fetch(goldApiUrl, {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        //in 24k
        console.log(amountCountryText);
        if(amountCountryText === 24) {
            goldData = data.price_gram_24k;
        }
        // goldData = data.price_gram_24k;
        var goldConvert = goldData*amount;
        //get result element
        var resultText = document.getElementById("result");
        //result text shown equals goldData x amountFrom
        resultText.value = goldConvert;
    });
}

function getGoldConversion() {
    //
    var goldFromOption = document.getElementById("countryFromOption");
    var countryToOption = document.getElementById("countryToOption");
    var amountCountry = document.getElementById("amountCountryFrom");

    //
    var goldFromText = goldFromOption.options[goldFromOption.selectedIndex].text;
    var countryToText = countryToOption.options[countryToOption.selectedIndex].text;
    var amountCountryText = amountCountry.value;

    getGoldApi(goldFromText, countryToText, amountCountryText);
}

btnConvert.addEventListener("click", getGoldConversion);