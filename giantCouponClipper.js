

//get the HTML for all buttons items
var allRedButtons = document.getElementsByClassName("c-coupon__button a-button -red -grows -full-width js-load-to-card js-coremetrics-location");

for (button of allRedButtons){

    // GET THE OFFER ID ==============

        // get the offer text (something like "SAVE $1.00, on any ONE (1) 1lb package of Zespri SunGold© Kiwifruit, 5d7aad87-3c8d-449a-8bcf-b04c013c2b89")
    var offerText = button.getAttribute("data-coremetrics-coupon-name");

        // break text into array
    var offerTextArray = offerText.split(", ")
        //id code will be last in the array
    var offerId = offerTextArray[offerTextArray.length-1];


    // SEND HTTP PUT REQUEST (EMULATE BUTTON CLICK) ==============

    var xhr = new XMLHttpRequest();

    xhr.open("PUT", 'https://giantfood.com/auth/api/private/synergy/coupons/offers/440017351106', true);

    xhr.withCredentials = true;


    // token with junk after it ( something like "07d..token...21b7; OAUTH_expires_in=Mon, 12 A")
    var authToken = document.cookie.split("OAUTH_access_token=")[1];
    authToken = authToken.split(";")[0];

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization","Bearer "+authToken);

    var contentBody = '{"offerNumber":"'+offerId+'"}'; //,"loadToCard":true
    xhr.send(contentBody);

}













//  alternate way of getting offer id
//
// var li = document.getElementsByClassName("l-coupons__item no-tap-highlight")
// for(button of li){
//     console.log(button.childNodes[0]);
//
// }
//






//
//
// let header = {
//
// "Host": "giantfood.com",
// "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:68.0) Gecko/20100101 Firefox/68.0",
// "Accept": "text/plain, */*; q=0.01",
// "Accept-Language": "en-US,en;q=0.5",
// "Accept-Encoding": "gzip, deflate, br",
// "Referer": "https://giantfood.com/coupons-weekly-circular/digital-coupons/",
// "Content-Type": "application/json",
// "Authorization": "Bearer ",
// "X-Requested-With": "XMLHttpRequest",
// "Content-Length": "54",
// "DNT": "1",
// "Connection": "keep-alive",
// "Cookie": "",
// "TE": "Trailers"
// }
//
//
//     var xhr = new XMLHttpRequest();
//
//     xhr.open("PUT", 'https://giantfood.com/auth/api/private/synergy/coupons/offers/440017351106', true);
//
//     xhr.withCredentials = true;
//
//     //Send the proper header information along with the request
//     // xhr.setRequestHeader(header);
//     // xhr.setRequestHeader("Host", "giantfood.com");
//     // xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:68.0) Gecko/20100101 Firefox/68.0");
//     // xhr.setRequestHeader("Accept", "text/plain, */*; q=0.01");
//     // xhr.setRequestHeader("Accept-Language", "en-US,en;q=0.5");
//     // xhr.setRequestHeader("Accept-Encoding", "gzip, deflate, br");
//     // xhr.setRequestHeader("Referer", "https://giantfood.com/coupons-weekly-circular/digital-coupons/");
//     xhr.setRequestHeader("Content-Type", "application/json");
//     // xhr.setRequestHeader("Authorization", "Bearer ");
//     // xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
//     // xhr.setRequestHeader("Content-Length", "54");
//     // xhr.setRequestHeader("DNT", "1");
//     // xhr.setRequestHeader("Connection", "keep-alive");
//     // xhr.setRequestHeader("Cookie", "");
//     // xhr.setRequestHeader("TE", "Trailers");
//
//     xhr.setRequestHeader("Authorization","Bearer ");
//     // xhr.setRequestHeader("OAUTH_expires_in", "Sun, 11 Aug 2019 15:38:06 UTC");
//
//
//     xhr.send('{"offerNumber":"a75b0285-381c-4639-ac76-098829a5e043"}');
