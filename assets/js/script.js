//Global Variables
//NDF - vars
var amount = document.body.querySelector(".amount");  //Variable holding the input amount to be converted
var fromCurrency = document.body.querySelector("#countryFromCurrency");  //Variable to select currency we are converting from
var toCurrency = document.body.querySelector("#countryToCurrency");
var btnConvert_ndf = document.body.querySelector(".btnConvert-ndf"); //button to convert
var finalResult = document.body.querySelector(".result"); //final result
var btnStartOver = document.body.querySelector(".btnStartOver"); //button to start over
var messageHandler = document.body.querySelector(".messageHandler");  //error handler
//david's vars
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

// ************************************** NDF - here we write the function to convert from *************** //
function conversion(event) {
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
    // console.log(fromCurrency_ndf, toCurrency_ndf, thisAmount);

    //original code from API below
    // fetch("https://api.apilayer.com/exchangerates_data/convert?to={to}&from={from}&amount={amount}", requestOptions)
    fetch("https://api.apilayer.com/exchangerates_data/convert?to="+ toCurrency_ndf + "&from=" + fromCurrency_ndf + "&amount=" + thisAmount, requestOptions)
    // fetch("./assets/js/dummy.json")
        .then(response => response.json())  //creates json object
        .then(result => {
            // console.log(result.result);
            finalResult.innerHTML = result.result;
        })  //allows to use the JSON object data
        .catch(error => console.log('error', error));  //try catch    
};

//This function creates a list fragment of the country codes
function displayCurrencyCodesInOption() {
    var select = document.querySelector('select');
    var countryCodes = getCountrySymbols();
    var fragment = new DocumentFragment();
    // console.log(countryCodes);
    for (var ccCodes in countryCodes) {
        fragment += countryCodes.ccCodes + " ";
        var option = document.createElement('option');
}
select.append(fragment);
}

//Creating an event listener for the Convert button
btnConvert_ndf.addEventListener("click", function(event) {
event.preventDefault(); //Added to keep persisitence on input

//Amount to be converted entered here
    var amount = document.querySelector("#amount").value;
    
  //select the country from conversion
    var countryFrom = document.querySelector("countrySelection");
    if (amount === "") {
        // handleErrors("error", "Enter Amount Needs Input");
    } else {
        // handleErrors("success");
        localStorage.setItem("amount", amount);
        localStorage.setItem("fromCurrency", countryFrom);
        conversion();
    }
});
// END OF NORDLEENS CODE ***************************************************************************************


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
