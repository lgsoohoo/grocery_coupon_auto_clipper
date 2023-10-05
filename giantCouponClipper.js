/*
    Giant Coupon Clipper
    Lucas Soohoo, Fall 2019

    Giant Coupon Clipper helps users clip digital coupons on Giant Food's website
    (https://giantfood.com/savings/coupons/browse).
    This program loads the coupons by sending an HTTP-POST request that is similar
    to when the user clicks on the buttons.
*/

const appName = `Giant Grocery Coupon Auto Clipper`;

/**
 * Gets the current user's UserId.
 * Might be stored somewhere locally but we'll just get it from the server.
 * @returns 
 *    - user id
 *    - -1 if error on parsing network request response
 *    -  2 if not logged in
 */
async function getUserId() {
  const rawResponse = await fetch(
    "https://giantfood.com/api/v1.0/current/user"
  );
  const rawResponseJSON = await rawResponse.json();

  try {
    return Number(rawResponseJSON.userId);
  } catch (error) {
    console.error(error);
    console.error(`${appName}: Error in getting UserID.`);
    console.error(rawResponseJSON);
    return -1;
  }
}

/**
 * 
 * @param {*} coupon 
 * @param {*} userId
 * @returns Promise to sleep for a random amount of time, then call the api to clip the coupon
 */
function clipCoupon(coupon, userId) {

  // Coupon Offer Id is the HTML element's id
  let offerId = coupon.id;

  // ============== Send HTTP-POST request (emulate button press) ==============

  let fetchRequest = new Request(
    `https://giantfood.com/api/v6.0/users/${userId}/coupons/clipped`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // credentials: "same-origin"
      body: `{"couponId":"${offerId}"}`,
    }
  );

  // TODO: Give a small delay before each button press

  return new Promise(function (resolve, reject) {
    let timeoutId = setTimeout(() => {
      fetch(fetchRequest)
        // If we want to do something with the response
        // Sometimes we seem to get stuck though
        .then((res) => {
          console.log(
            "Done running this fetch request for " + offerId.toString()
          );
          resolve();
          // if (Object.prototype.hasOwnProperty.call(res, "json")) {
          //   return res.json();
          // }
          // return "Done";
        });
    }, Math.random() * 1000 * 3);
  });
}

async function main() {
  // Make sure we are actually on Giant's website
  // TODO: doesn't have to be this exact URL if we could use the API to pull the list of coupons
  if (document.URL !== "https://giantfood.com/savings/coupons/browse") {
    alert(
      `"${appName}" must be on Giant's website to work.` +
      `\nPlease visit https://giantfood.com/savings/coupons/browse, log in, and try again.`
    );
    return;
  }

  // Get User Id
  let userId = await getUserId();
  if (userId == -1) {
    // -1 for some error
    alert(`"${appName}" failed getting user id. Please try again later.`);
    return;
  } else if (userId == 2) {
    alert(`Please log into your Giant account before running "${appName}".`);
    return;
  }

  // ========== Get the HTML for all unloaded coupons ==========
  // HTML (ul) list with coupons (includes pictures, descriptions)
  // [0] is the unloaded coupons, [1] is the already loaded ones
  let availableList = document.getElementsByClassName("tile-list")[0];
  // Extract the coupons into an HTML Collection (think array)
  let allCoupons = availableList.getElementsByTagName("li");

  // Skip the item if it's not actually a coupon
  let couponsToClip = Array.from(allCoupons).filter((coupon) =>
    coupon.innerHTML.includes("Clip Coupon")
  );

  if (couponsToClip.length == 0) {
    alert(`"${appName}" did not find any coupons to clip.`);
    return;
  }

  let couponPromises = couponsToClip.map((coupon) => clipCoupon(coupon, userId));

  console.log(
    `"${appName}" is clipping ${couponPromises.length} coupons. Please wait ...`
  );

  Promise.all(couponPromises).then(() => {
    // TODO: If the coupon fails to clip (like if we've already clipped it)
    // then the code gets stuck and never hits this
    window.location.reload();
  });
}

await main();
