# Grocery Coupon Auto Clipper

## What is this?

Some grocery stores have virtual coupons for members to "clip". However, clicking on every single button can be time-consuming and annoying. This bookmarklet (JavaScript code) allows you to automate the process, "clipping" all the coupons in one click!

If you would like to create the bookmarklet yourself, remove all the comments from the JavaScript code and you can use [Mr. Cole's Bookmarklet Creator](https://mrcoles.com/bookmarklet/) to generate the bookmarklet. Note: You'll need to make the bookmarklet function `async`, by changing the beginning from `javascript:(function()` to `javascript:(async function()`.

## How to use it

1. Add the bookmarklet to your bookmarks:
    1. Make sure your browser's bookmark toolbar is showing.
    2. Highlight all the code (triple-click) and drag it onto the bookmark toolbar. You can rename the bookmark to something more sensible, as well as move the bookmark to a different folder.
        ```js
        javascript:(async function()%7Bconst%20appName%20%3D%20%60Giant%20Grocery%20Coupon%20Auto%20Clipper%60%3Basync%20function%20getUserId()%20%7Bconst%20rawResponse%20%3D%20await%20fetch(%22https%3A%2F%2Fgiantfood.com%2Fapi%2Fv1.0%2Fcurrent%2Fuser%22)%3Bconst%20rawResponseJSON%20%3D%20await%20rawResponse.json()%3Btry%20%7Breturn%20Number(rawResponseJSON.userId)%3B%7D%20catch%20(error)%20%7Bconsole.error(error)%3Bconsole.error(%60%24%7BappName%7D%3A%20Error%20in%20getting%20UserID.%60)%3Bconsole.error(rawResponseJSON)%3Breturn%20-1%3B%7D%7Dfunction%20clipCoupon(coupon%2C%20userId)%20%7Blet%20offerId%20%3D%20coupon.id%3Blet%20fetchRequest%20%3D%20new%20Request(%60https%3A%2F%2Fgiantfood.com%2Fapi%2Fv6.0%2Fusers%2F%24%7BuserId%7D%2Fcoupons%2Fclipped%60%2C%7Bmethod%3A%20%22POST%22%2Cheaders%3A%20%7B%22Content-Type%22%3A%20%22application%2Fjson%22%2C%7D%2Cbody%3A%20%60%7B%22couponId%22%3A%22%24%7BofferId%7D%22%7D%60%2C%7D)%3Breturn%20new%20Promise(function%20(resolve%2C%20reject)%20%7Blet%20timeoutId%20%3D%20setTimeout(()%20%3D%3E%20%7Bfetch(fetchRequest).then((res)%20%3D%3E%20%7Bconsole.log(%22Done%20running%20this%20fetch%20request%20for%20%22%20%2B%20offerId.toString())%3Bresolve()%3B%7D)%3B%7D%2C%20Math.random()%20*%201000%20*%203)%3B%7D)%3B%7Dasync%20function%20main()%20%7Bif%20(document.URL%20!%3D%3D%20%22https%3A%2F%2Fgiantfood.com%2Fsavings%2Fcoupons%2Fbrowse%22)%20%7Balert(%60%22%24%7BappName%7D%22%20must%20be%20on%20Giant's%20website%20to%20work.%60%20%2B%60%5CnPlease%20visit%20https%3A%2F%2Fgiantfood.com%2Fsavings%2Fcoupons%2Fbrowse%2C%20log%20in%2C%20and%20try%20again.%60)%3Breturn%3B%7Dlet%20userId%20%3D%20await%20getUserId()%3Bif%20(userId%20%3D%3D%20-1)%20%7Balert(%60%22%24%7BappName%7D%22%20failed%20getting%20user%20id.%20Please%20try%20again%20later.%60)%3Breturn%3B%7D%20else%20if%20(userId%20%3D%3D%202)%20%7Balert(%60Please%20log%20into%20your%20Giant%20account%20before%20running%20%22%24%7BappName%7D%22.%60)%3Breturn%3B%7Dlet%20availableList%20%3D%20document.getElementsByClassName(%22tile-list%22)%5B0%5D%3Blet%20allCoupons%20%3D%20availableList.getElementsByTagName(%22li%22)%3Blet%20couponsToClip%20%3D%20Array.from(allCoupons).filter((coupon)%20%3D%3Ecoupon.innerHTML.includes(%22Clip%20Coupon%22))%3Bif%20(couponsToClip.length%20%3D%3D%200)%20%7Balert(%60%22%24%7BappName%7D%22%20did%20not%20find%20any%20coupons%20to%20clip.%60)%3Breturn%3B%7Dlet%20couponPromises%20%3D%20couponsToClip.map((coupon)%20%3D%3E%20clipCoupon(coupon%2C%20userId))%3Bconsole.log(%60%22%24%7BappName%7D%22%20is%20clipping%20%24%7BcouponPromises.length%7D%20coupons.%20Please%20wait%20...%60)%3BPromise.all(couponPromises).then(()%20%3D%3E%20%7Bwindow.location.reload()%3B%7D)%3B%7Dawait%20main()%7D)()
        ```
2. Visit the grocery store's website:
    1. Sign in to your account.
    2. Make sure you are on the "coupons" page. You should see the "clip coupon" buttons.
3. Run the JavaScript:
    1. Click on the bookmarklet in your bookmarks.
4. After the page has refreshed, run the code again, or manually clip the remaining coupons.

## "Giant Food" Grocery Coupon Auto Clipper

Giant Food's coupon page can be found at [https://giantfood.com/savings/coupons/browse](https://giantfood.com/savings/coupons/browse).

## Safeway

Safeway's coupon page can be found at [https://www.safeway.com/foru/coupons-deals.html](https://www.safeway.com/foru/coupons-deals.html). I recommend [kton's Safeway-Just-for-u](https://github.com/kton/Safeway-Just-for-u) bookmarklet.