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
var countrySelection = document.body.querySelector(".countrySelection");  //Variable to select country
var conversionAmount  = document.body.querySelector(".conversionAmount");
var btnConvertG = document.body.querySelector(".btnConvertG");
var amountBTC = document.body.querySelector("#amountBTC");
var currencyFrom = document.body.querySelector("#currencyFrom"); 
var currencyTo  = document.body.querySelector("#currencyTo");
var btnConvertBTC = document.body.querySelector("#btnConvertBTC");
var lsAmountBTC = localStorage.getItem("amountBTC");
///hyun's vars
var amountMetalFrom = document.querySelector(".amountMetalFrom");
//arjun's vars

if(lsAmountBTC !== ""){
    amountBTC.value = lsAmountBTC;
}


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
    console.log(fromCurrency_ndf, toCurrency_ndf, thisAmount);

    //original code from API below
    // fetch("https://api.apilayer.com/exchangerates_data/convert?to={to}&from={from}&amount={amount}", requestOptions)
    fetch("https://api.apilayer.com/exchangerates_data/convert?to="+ toCurrency_ndf + "&from=" + fromCurrency_ndf + "&amount=" + thisAmount, requestOptions)
    // fetch("./assets/js/dummy.json")
        .then(response => response.json())  //creates json object
        .then(result => {
            console.log(result.result);
            finalResult.innerHTML = result.result;
        })  //allows to use the JSON object data
        .catch(error => console.log('error', error));  //try catch    
    
};

//This function creates a list fragment of the country codes
function displayCurrencyCodesInOption() {
    var select = document.querySelector('select');
    var countryCodes = getCountrySymbols();
    var fragment = new DocumentFragment();
    console.log(countryCodes);
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

    localStorage.setItem("amountBTC", amount)

    getBTCConversionApi(to, from, amount);

}

btnConvertBTC.addEventListener("click",convertCurrencyBTC);


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
    var countryToText = countryToOption.options[countryToOption.selectedIndex].text;
    var amountMetalText = amountMetal.value;
    var karatFromText = karatFrom.value;

    //call getGoldApi with parameters (metal dropdown, currency dropdown, metal in grams, karat of metal)
    getGoldApi(goldFromText, countryToText, amountMetalText, karatFromText); 
}

btnConvertG.addEventListener("click", getGoldConversion);



let btnClear = document.body.querySelector('.btnStartOver');
let inputs = document.body.querySelector('.amountMetalFrom');

btnClear.addEventListener('click', () => {
    
    inputs.value = "";
});

let btnClear1 = document.body.querySelector('#btnStartOver1');
let inputs1 = document.body.querySelector('#amountBTC');

btnClear1.addEventListener('click', () => {
    localStorage.getItem("amountBTC")
    inputs1.value = "";
});


