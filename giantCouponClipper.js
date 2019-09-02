/*
    Giant Coupon Clipper
    Lucas Soohoo, Fall 2019

    Giant Coupon Clipper helps users clip digital coupons on Giant Food's website
    (https://giantfood.com/coupons-weekly-circular/digital-coupons/#/available).
    This program loads the coupons by sending an HTTP-PUT request that is sent
    when the user clicks on the "Load To Card" button.
*/

// Get the HTML for all buttons
var allRedButtons = document.getElementsByClassName("c-coupon__button a-button -red -grows -full-width js-load-to-card js-coremetrics-location");

// Extract user's access token
// document.cookie has the access token and the variable looks something like this: (...  718.0000; OAUTH_access_token=1a23456bcdefgh  ...  7890ab123c4d; OAUTH_expires_in=Mon,  ...)
let authStart = document.cookie.indexOf("OAUTH_access_token=") + 19;
let authEnd = document.cookie.indexOf("; OAUTH_expires_in=");
var authToken = document.cookie.substring(authStart, authEnd);

/* Tell the user to wait and that the program is running
   There are typically (150-300) coupons. We'll add a minimum 2 second buffer.
   We also have a bit of time before the user refreshes the page   */
let delayLength = allRedButtons.length * 15 + 2000;
alert(`"Giant Coupon Clipper" is ${allRedButtons.length} coupons. Please wait for ${Math.round(delayLength/1000)} seconds.`);


for (button of allRedButtons) {

    // ============== FIND THE OFFER ID ==============

    // Get the offer text (something like "SAVE $1.00, on any ONE (1) package of ..., 5d7aad87-3c8d-449a-8bcf-b04c013c2b89")
    let offerText = button.getAttribute("data-coremetrics-coupon-name");

    // Break text into array
    let offerTextArray = offerText.split(", ")
    // offer code id will be last in the array
    let offerId = offerTextArray[offerTextArray.length - 1];


    // ============== SEND HTTP-PUT REQUEST (EMULATE BUTTON CLICK) ==============

    let xhr = new XMLHttpRequest();

    /*  There are 2 types of things to click: Coupons and Offers
        To tell the difference, Coupons have a hyphen in the offer id (Ex: d236370f-5170-4045-97f5-edbe83396b75) while Offers do not (Ex: 1484198)
        Coupons and Offers require different links to PUT to
        Offers also require ` "loadToCard":true ` in the request body   */

    let contentBody;
    if (offerId.includes("-")) {
        //Is a coupon
        xhr.open("PUT", 'https://giantfood.com/auth/api/private/synergy/coupons/offers/440017351106', true);
        contentBody = '{"offerNumber":"' + offerId + '"}';
    } else {
        // Is an offer

        // TODO: Still seems to be getting a 400 error. Something is still incorrect

        xhr.open("PUT", 'https://giantfood.com/auth/api/private/synergy/offers/440017351106', true);
        contentBody = '{"offerNumber":"' + offerId + ', "loadToCard":true"}';
    }

    xhr.withCredentials = true;

    // Send the proper header info along with the request
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + authToken);

    // Send the HTTP-PUT request
    xhr.send(contentBody);

}

setTimeout(function() {
    alert('"Giant Coupon Clipper" has completed. Please refresh the page (F5) and check for remaining coupons.');
}, delayLength);
