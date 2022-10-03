//Global Variables
//NDF - vars
var amount = document.body.querySelector(".amount");  //Variable holding the input amount to be converted
var fromCurrency = document.body.querySelector("#countryFromCurrency");  //Variable to select currency we are converting from
var toCurrency = document.body.querySelector("#countryToCurrency");
var btnConvert_ndf = document.body.querySelector(".btnConvert-ndf"); //button to convert
var finalResult = document.body.querySelector(".result"); //final result
var btnStartOver = document.body.querySelector(".btnStartOver"); //button to start over
var messageHandler = document.body.querySelector(".messageHandler");  //error handler
var countrySelection = document.body.querySelector(".countrySelection");  //Variable to select country
var conversionAmount  = document.body.querySelector(".conversionAmount");
var locStrAmount_ndf = localStorage.getItem("amount");
var locStrCountryFrom_ndf = localStorage.getItem("countryFromCurrency");
var locStrCountryTo_ndf = localStorage.getItem("countryToCurrency");
var locStrResult_ndf = localStorage.getItem("result");
//david's vars
var amountBTC = document.body.querySelector("#amountBTC");
var currencyFrom = document.body.querySelector("#currencyFrom"); 
var currencyTo  = document.body.querySelector("#currencyTo");
var btnConvertBTC = document.body.querySelector("#btnConvertBTC");
var lsAmountBTC = localStorage.getItem("amountBTC");
var lsAmountCurrFrom = localStorage.getItem("currencyFrom");
var lsAmountCurrTo = localStorage.getItem("currencyTo");
///hyun's vars
var btnConvertG = document.querySelector(".btnConvertG"); //make variables to grab elements
var amountMetalFrom = document.querySelector(".amountMetalFrom");
var goldFromOption = document.getElementById("metalFromOption"); 
var countryToOptionG = document.getElementById("countryToOptionG");
var amountMetal = document.getElementById("amountMetalFrom");
var karatFrom = document.getElementById("karatFrom");
var locStorMetalGrams = localStorage.getItem("amountMetalFrom");
var locStorKarat = localStorage.getItem("karatFrom");
var locStorMetalOption = localStorage.getItem("metalFromOption");
var locStorCountryG = localStorage.getItem("countryToOptionG");
//arjun's vars
var conversionButtonAG = document.body.querySelector(".conversionButtonAG");
var currencyFromAG = document.body.querySelector("#currencyFromAG"); 
var currencyToAG  = document.body.querySelector("#currencyToAG");

if(lsAmountBTC !== ""){
    amountBTC.value = lsAmountBTC;
}


// ************************************** NDF - here we write the function to convert from *************** //
function conversion() {
        var requestOptions;
        var myHeaders = new Headers();
        myHeaders.append("apikey", "LyHhxrDd4ojK6I1EtKoQCyL4l9PXDLHM");   //key pair
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };
    //Input call - user input on amount to be converted
    var amount = localStorage.getItem("amount");
    var fromCurrency_ndf = fromCurrency.options[fromCurrency.selectedIndex].text;
    var toCurrency_ndf = toCurrency.options[toCurrency.selectedIndex].text;
    var thisAmount = amount;

    // Sending input to local storage
    localStorage.setItem("amount", thisAmount);
    localStorage.setItem("fromCurrency", fromCurrency_ndf);
    localStorage.setItem("toCurrency", toCurrency_ndf);
    localStorage.setItem("finalresult", result);

    //original code from API below
    // fetch("https://api.apilayer.com/exchangerates_data/convert?to={to}&from={from}&amount={amount}", requestOptions)
    fetch("https://api.apilayer.com/exchangerates_data/convert?to="+ toCurrency_ndf + "&from=" + fromCurrency_ndf + "&amount=" + thisAmount, requestOptions)
    // fetch("./assets/js/dummy.json")
        .then(response => response.json())  //creates json object
        .then(result => {
            result.result = (Math.round(result.result*100)/100).toFixed(2);
            finalResult.innerHTML = result.result;
        })  //allows to use the JSON object data
        .catch(error => console.log('error', error));  //try catch    
    
};

//Creating an event listener for the Convert button
btnConvert_ndf.addEventListener("click", function(event) {
    event.preventDefault(); //Added to keep persisitence on input   
    var amount = document.querySelector("#amount").value; //Amount to be converted entered here
    var countryFrom = document.querySelector("countrySelection"); //select the country from conversion
    localStorage.setItem("amount", amount);
    localStorage.setItem("fromCurrency", countryFrom);
    conversion();
});

// END OF NORDLEENS CODE ***************************************************************************************


// Start of David's Code****************************************************************************************

function getBTCConversionApi (to, from, amount) {
    var BTCApiUrl = "https://rest.coinapi.io/v1/exchangerate/" + from + "/" + to + "/";

var myHeaders = new Headers();
myHeaders.append("X-CoinAPI-Key", "BBF13E38-D30A-4EEB-B578-98D0AAA17C71");

myHeaders.append("Content-Type", "application/json");

fetch(BTCApiUrl, {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
})
.then(function (response) {
    return response.json()
})
.then(function (data) {
    var currencyConvert = amount * data.rate;
    document.body.querySelector("#BTCresult").value = currencyConvert;
    
});
}

function convertCurrencyBTC() {
    var to = currencyTo.options[currencyTo.selectedIndex].text;

    var from = currencyFrom.options[currencyFrom.selectedIndex].text;

    var amount = amountBTC.value;

    localStorage.setItem("amountBTC", amount);
    localStorage.setItem("currencyFrom", from);
    localStorage.setItem("currencyTo", to);

    getBTCConversionApi(to, from, amount);

}

btnConvertBTC.addEventListener("click",convertCurrencyBTC);




//Hyun's getGoldAPI code *********************************************************************
function getGoldApi(from, to, amount, metal) {
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
        //conditional for karats
        //if metal parameter equals the string of 18k (dropdown choice)
        if(metal === "18k") {
            //set goldData to the data call's price property
            goldData = data.price_gram_18k;
        }else if(metal === "20k") {
            goldData = data.price_gram_20k;
        }else if(metal === "21k") {
            goldData = data.price_gram_21k;
        }else if(metal === "22k") {
            goldData = data.price_gram_22k;
        }else if(metal === "24k") {
            goldData = data.price_gram_24k;
        }

        //goldConvert equals karats x amount in grams
        var goldConvert = goldData*amount;
        //get result element
        var resultText = document.getElementById("resultG");
        //if conversion equals 0,
        if(goldConvert === 0) {
            goldConvert = "Error: Not in Database";
        }
        //if currency parameter is NOT Bitcoin
        if(to !== "BTC") {
            //round to 2 decimal places
            goldConvert = (Math.round(goldConvert*100)/100).toFixed(2);
        }
        //result text shown equals goldConvert
        resultText.value = goldConvert;
    });
}

function getGoldConversion() {
    //make variable to get elements
    var goldFromOption = document.getElementById("metalFromOption"); 
    var countryToOption = document.getElementById("countryToOptionG");
    var amountMetal = document.getElementById("amountMetalFrom");
    var karatFrom = document.getElementById("karatFrom");

    //set text from grabbed elements
    var goldFromText = goldFromOption.options[goldFromOption.selectedIndex].text; 
    var countryToText = countryToOptionG.options[countryToOptionG.selectedIndex].text;
    var amountMetalText = amountMetal.value;
    var karatFromText = karatFrom.value;

    //set item's local storage value to element name
    localStorage.setItem("amountMetalFrom", amountMetalText);
    localStorage.setItem("karatFrom", karatFromText);
    localStorage.setItem("metalFromOption", goldFromText);
    localStorage.setItem("countryToOptionG", countryToText);

    //call getGoldApi with parameters (metal dropdown, currency dropdown, metal in grams, karat of metal)
    getGoldApi(goldFromText, countryToText, amountMetalText, karatFromText); 
}

btnConvertG.addEventListener("click", getGoldConversion);
//End Hyun's getGoldAPI/getGoldConversion code *****************************************************

//Hyun's clear button and local storage code *************************************************
let btnClearGold = document.body.querySelector("#btnStartOverG");
let inputGold = document.body.querySelector("#metalFromOption");
let inputGrams = document.body.querySelector("#amountMetalFrom");
let inputKarat = document.body.querySelector("#karatFrom");
let inputCountryG = document.body.querySelector("#countryToOptionG");

if(locStorMetalGrams !== "") {
    amountMetalFrom.value = locStorMetalGrams;
}
if(locStorKarat !== "") {
    karatFrom.value = locStorKarat;
}
if(locStorMetalOption !== "") {
    goldFromOption.value = locStorMetalOption;
}
if(locStorCountryG !== "") {
    countryToOptionG.value = locStorCountryG;
}

btnClearGold.addEventListener('click', () => {
    localStorage.removeItem("amountMetalFrom");
    localStorage.removeItem("karatFrom");
    localStorage.removeItem("metalFromOption");
    localStorage.removeItem("countryToOptionG");
    inputGold.value = "";
    inputGrams.value = "";
    inputKarat.value = "";
    inputCountryG.value = "";
});
// End of Hyun's LocStorageCode***********************************************************************


// Davids Button Clear Local Storage******************************************************************

let btnClear = document.body.querySelector('.btnStartOver');
let inputs = document.body.querySelector('.amountMetalFrom');

btnClear.addEventListener('click', () => {
    
    inputs.value = "";
});

let btnClear1 = document.body.querySelector('#btnStartOver1');
let inputs1 = document.body.querySelector('#amountBTC');
let inputsCurFrom = document.body.querySelector('#currencyFrom');
let inputsCurTo = document.body.querySelector('#currencyTo');


btnClear1.addEventListener('click', () => {
    localStorage.removeItem("amountBTC");
    localStorage.removeItem("currencyFrom");
    localStorage.removeItem("currencyTo");
    inputs1.value = "";
});

// End of Davids Button Clear Local Storage******************************************************************


// -Arjun's Javascript

function coinToMetalConvertAG (to, from, amount) {
    var goldApiUrl = "https://www.goldapi.io/api/" + to + "/" + "USD" + "/";
    var myHeaders = new Headers();
    var metalData;

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
        console.log(data);
        metalData = data.price;
        //conditional for karats
        //if metal parameter equals the string of 18k (dropdown choice)
        });

    var coinURLAG = "https://rest.coinapi.io/v1/exchangerate/" + from + "/" + 'USD' + "/";

var myHeadersAG = new Headers();

myHeadersAG.append("X-CoinAPI-Key", "06FA578A-BD51-4D62-8BE1-3950D9693466");
myHeadersAG.append("Content-Type", "application/json");

fetch(coinURLAG, {
    method: 'GET',
        headers: myHeadersAG,
    redirect: 'follow'
})
.then(function (response) {
return response.json()
})
.then(function (data) {
console.log(data);
var currencyConvertAG = (data.rate * amount) / metalData;
document.body.querySelector("#coinURLAG").value = currencyConvertAG;   
});
}
if(lsAmountCurrFrom !== "") {
    currencyFrom.value = lsAmountCurrFrom;
}
if(lsAmountCurrTo !== "") {
    currencyTo.value = lsAmountCurrTo;
}

function conversionFunctionAG() {
var to = currencyToAG.options[currencyToAG.selectedIndex].text;
var from = currencyFromAG.options[currencyFromAG.selectedIndex].text;
var amount = amountAG.value;

    localStorage.setItem("amountAG", amount)
    coinToMetalConvertAG(to, from, amount);
}


conversionButtonAG.addEventListener("click",conversionFunctionAG);

