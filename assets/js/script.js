//Global Variables
var amount = document.querySelector(".amount");  //Variable holding the input amount to be converted
var fromCurrency = document.querySelector(".fromCurrency");  //Variable to select currency we are converting from
var toCurrency = document.querySelector(".toCurrency");
var btnConvert = document.querySelector(".btnConvert"); //button to convert
var result = document.querySelector(".result"); //final result
var btnStartOver = document.querySelector(".btnStartOver"); //button to start over
var messageHandler = document.querySelector(".messageHandler");  //error handler

//calling the functions
conversion();
getCountrySymbols();
displayCurrencyCodesInOption();

// ************************************** NDF - here we write the function to convert from *************** //
function conversion (event) {
        var requestOptions;
        //Nordleens Base + API Key
        const apiKey = "https://api.exchangeratesapi.io/v1/latest?access_key=LyHhxrDd4ojK6I1EtKoQCyL4l9PXDLHM";

        //API key - currency country to country
        var myHeaders = new Headers();
        // myHeaders.append("apikey", "LyHhxrDd4ojK6I1EtKoQCyL4l9PXDLHM");   //key pair
        var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };
    //Input call - user input on amount to be converted
    var amount = localStorage.getItem("amount");
    var fromCurrency = getCountrySymbols();
    var toCurrency = getCountrySymbols();
    var thisAmount = parseInt(amount);
    //original code from API below
    // fetch("https://api.apilayer.com/exchangerates_data/convert?to={to}&from={from}&amount={amount}", requestOptions)
    fetch("https://api.apilayer.com/exchangerates_data/convert?to="+ toCurrency + "&from=" + fromCurrency + "&amount=" + thisAmount, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    //Result Output
    // var result =  result.textContent;
    
};

//This function supplies the symbols for the from and to currency values
function getCountrySymbols() {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "LyHhxrDd4ojK6I1EtKoQCyL4l9PXDLHM");

    var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
    };

    fetch("https://api.apilayer.com/exchangerates_data/symbols?access_key=LyHhxrDd4ojK6I1EtKoQCyL4l9PXDLHM", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    return requestOptions;
    
}

//This function creates a list fragment of the country codes
function displayCurrencyCodesInOption() {
    var select = document.querySelector('select');
    var countryCodes = getCountrySymbols();
    var fragment = new DocumentFragment();
    console.log(countryCodes);
    for (var ccCodes in countryCodes) {
        fragment += countryCodes.ccCodes + " ";
        var option = document.createElement('option');
    // option.value = json.countryCodes[i].id;
    // option.textContent = ccCodes;
    // fragment.append(option);
}
select.append(fragment);
}

//Creating an event listener for the Convert button
btnConvert.addEventListener("click", function(event) {
event.preventDefault(); //Added to keep persisitence on input

//Amount to be converted entered here
    var amount = document.querySelector("#amount").value;
    
//     //select the country from conversion
    var countryFrom = document.querySelector("countrySelection");
    if (amount === "") {
        handleErrors("error", "Enter Amount Needs Input");
    } else {
        handleErrors("success");
        localStorage.setItem("amount", amount);
        localStorage.setItem("fromCurrency", countryFrom);
        conversion();
    }
});
// ***************************************************************************************

// var goldApiUrl = "https://www.goldapi.io/api/XAU/USD";

// var myHeaders = new Headers();
// myHeaders.append("x-access-token", "goldapi-1un118l8lqe0hm-io");
// myHeaders.append("Content-Type", "application/json");

// fetch(goldApiUrl, {
//     method: 'GET',
//     headers: myHeaders,
//     redirect: 'follow'
// })
// .then(function (response) {
//     return response.json()
// })
// .then(function (data) {
//     console.log(data)
// });