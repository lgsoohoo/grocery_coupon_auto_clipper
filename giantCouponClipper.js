/*
    Giant Coupon Clipper
    Lucas Soohoo, Fall 2019

    Giant Coupon Clipper helps users clip digital coupons on Giant Food's website
    (https://giantfood.com/savings/coupons/browse).
    This program loads the coupons by sending an HTTP-POST request that is similar
    to when the user clicks on the buttons.
*/

// Make sure we are actually on Giant's website
// TODO: doesn't have to be this exact URL if we could use the API to pull the list of coupons
if (document.URL !== "https://giantfood.com/savings/coupons/browse") {
    alert(
        `"Grocery Coupon Auto Clipper" must be on Giant's website to work.` +
            `\nPlease visit https://giantfood.com/savings/coupons/browse, log in, and try again.`
    );
} else {
    // ========== Get User Id ==========
    // Might be stored somewhere locally but we'll just get it from the server.
    // TODO: "Synchronous XMLHttpRequest on the main thread is deprecated"
    let profileRequest = new XMLHttpRequest();
    profileRequest.open(
        "GET",
        "https://giantfood.com/api/v1.0/current/user",
        false
    );
    profileRequest.send();

    let userId = Number(JSON.parse(profileRequest.responseText).userId);
    // TODO: Put JSON.parse in a try-catch

    // ========== Check if we got the User Id properly ==========
    if (
        typeof userId != "number" ||
        profileRequest.status != 200 ||
        !Number.isInteger(Number(userId)) ||
        userId == "2"
    ) {
        // Failed getting user profile appears to return '2'
        alert(
            `"Grocery Coupon Auto Clipper" failed getting user id. Please log in or try again later.`
        );
    } else {
        // ========== Get the HTML for all unloaded coupons ==========
        // HTML (ul) list with coupons (includes pictures, descriptions)
        // [0] is the unloaded coupons, [1] is the already loaded ones
        let availableList = document.getElementsByClassName("tile-list")[0];
        // Extract the coupons into an HTML Collection (think array)
        var allCoupons = availableList.getElementsByTagName("li");

        if (allCoupons.length == 0) {
            alert(
                `"Grocery Coupon Auto Clipper" did not find any coupons to clip.`
            );
        } else {
            console.log(
                `"Grocery Coupon Auto Clipper" is clipping ${allCoupons.length} coupons. Please wait ...`
            );

            let couponPromises = [];
            for (coupon of allCoupons) {
                // Skip the item if it's not actually a coupon
                if (coupon.innerHTML.indexOf("Shop Now") !== -1) {
                    continue;
                }

                // Coupon Offer Id is the HTML element's id
                let offerId = coupon.id;

                // ============== Send HTTP-POST request (emulate button press) ==============

                let contentBody = `{"couponId":"${offerId}"}`;

                let fetchRequest = new Request(
                    `https://giantfood.com/api/v6.0/users/${userId}/coupons/clipped`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        // credentials: "same-origin"
                        body: contentBody,
                    }
                );

                // TODO: Give a small delay before each button press

                let pushClipButton = fetch(fetchRequest)
                    // // If we want to do something with the response
                    // // Sometimes we seem to get stuck though
                    .then((res) => {
                        if (Object.prototype.hasOwnProperty.call(res, "json")) {
                            return res.json();
                        }
                        return "Done";
                    });
                // .then(jsonData=>{
                //     /**
                //      * The response object should looks like this:
                //      * {
                //      *   "response": {
                //      *     "result": "SUCCESS"
                //      *   },
                //      *   "sessionId": "SOME ID HERE"
                //      * }
                //      */
                //     console.log(jsonData);
                // })
                couponPromises.push(pushClipButton);
            }

            Promise.all(couponPromises).then(() => {
                // TODO: If the coupon fails to clip (like if we've already clipped it)
                // then the code gets stuck and never hits this
                window.location.reload();
            });
        }
    }
}
