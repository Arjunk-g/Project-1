//Global Variables
var amountCountryFrom = document.body.querySelector(".amountCountryFrom");  //Variable holding the input amount to be converted
var countrySelection = document.body.querySelector(".countrySelection");  //Variable to select country
var conversionAmount  = document.body.querySelector(".conversionAmount");
var btnConvert = document.body.querySelector(".btnConvert");
var btnStartOver = document.body.querySelector(".btnStartOver");
var messageHandler = document.body.querySelector("#messageHandler");
var amountBTC = document.body.querySelector("#amountBTC");
var currencyFrom = document.body.querySelector("#currencyFrom"); 
var currencyTo  = document.body.querySelector("#currencyTo");
var btnConvertBTC = document.body.querySelector("#btnConvertBTC");

//here we write the function to convert from
function conversion () {
    
    //Call user input on amount to be converted
    var amount = localStorage.getItem("amount");

    //click event listener to convert to country to 
    
    return 
};







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

    getBTCConversionApi(to, from, amount);

}

btnConvertBTC.addEventListener("click",convertCurrencyBTC);

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
            goldData = data.price_gram_24k;
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
