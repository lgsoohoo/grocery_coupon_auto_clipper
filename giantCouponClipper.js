/*
    Giant Coupon Clipper
    Lucas Soohoo, Fall 2019

    Giant Coupon Clipper helps users clip digital coupons on Giant Food's website
    (https://giantfood.com/savings/coupons/browse).
    This program loads the coupons by sending an HTTP-POST request that is similar
    to when the user clicks on the buttons.
*/

// Make sure we are actually on Giant's website
if(document.URL !== "https://giantfood.com/savings/coupons/browse"){
    alert(`"Grocery Coupon Auto Clipper" must be on Giant's website to work.\n Please visit https://giantfood.com/savings/coupons/browse, log in, and try again.`);
}else{

    // ========== Get User Id ==========
    // Might be stored somewhere locally but we'll just get it from the server.
    // TODO: "Synchronous XMLHttpRequest on the main thread is deprecated"
    let profileRequest = new XMLHttpRequest();
    profileRequest.open("GET", "https://giantfood.com/api/v3.0/user/profile", false);
    profileRequest.send();

    let userId = profileRequest.responseText;
    if(typeof userId == 'string'){
        //TODO: is responseText guaranteed to get a string? (Ever null/something odd?)
        let startIndex = userId.indexOf("\"userId\":")+9;
        let endIndex = userId.indexOf(",\"currentOrderId\":");
        userId = userId.substring(startIndex,endIndex);
    }

    // ========== Check if we got the User Id properly ==========
    if(typeof userId != 'string' || profileRequest.status != 200 || !Number.isInteger(Number(userId)) || userId == "2"){
        // Failed getting user profile appears to return '2'
        alert(`"Grocery Coupon Auto Clipper" failed getting user id. Please log in or try again later.`);
    }else{

        // ========== Get the HTML for all unloaded coupons ==========
        // HTML (ul) list with coupons (includes pictures, descriptions)
        // [0] is the unloaded coupons, [1] is the already loaded ones
        let availableList = document.getElementsByClassName("tile-list")[0];
        // Extract the coupons into an HTML Collection (think array)
        var allCoupons = availableList.getElementsByTagName("li");

        if(allCoupons.length == 0){
            alert(`"Grocery Coupon Auto Clipper" did not find any coupons to clip.`);
        }else{
            alert(`"Grocery Coupon Auto Clipper" is clipping ${allCoupons.length} coupons. Please wait ...`);

            let couponPromises = [];

            for (coupon of allCoupons) {

                // Coupon Offer Id is the HTML element's id
                let offerId = coupon.id;
                
                // ============== Send HTTP-POST request (emulate button press) ==============

                let contentBody = "{\"couponId\":\""+offerId+"\"}";

                let fetchRequest = new Request(`https://giantfood.com/api/v4.0/users/${userId}/coupons/clipped`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // credentials: "same-origin"
                    body: contentBody
                });

                let pushClipButton = fetch(fetchRequest).then((res)=>{
                    return res.json()
                })
                //.then((res)=>{
                    // Do something when each coupon has finished clipping
                    // console.log(res);
                    /**
                     * The response object looks like this:
                     * {
                     *   "response": {
                     *     "result": "SUCCESS"
                     *   },
                     *   "sessionId": "SOME ID HERE"
                     * }
                     */   
                //});
                ;

                couponPromises.push(pushClipButton);
            }

            Promise.all(couponPromises).then(()=>{
                // TODO: If the coupon fails to clip (like if we've already clipped it) then the code gets stuck and never hits this
                alert('"Grocery Coupon Auto Clipper" has completed clipping coupons. Press "OK" to refresh the page.');
                window.location.reload();
            });
        }

    }
}