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