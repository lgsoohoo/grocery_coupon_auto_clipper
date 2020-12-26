# Grocery Coupon Auto Clipper

## What is this?

Some grocery stores have virtual coupons for members to "clip". However, clicking on every single button can be time-consuming and annoying. This bookmarklet (JavaScript code) allows you to automate the process, "clipping" all the coupons in one click!

If you would like to create the bookmarklet yourself, remove all the comments from the JavaScript code and you can use [Mr. Cole's Bookmarklet Creator](https://mrcoles.com/bookmarklet/) to generate the bookmarklet. 


## How to use it

1. Add the bookmarklet to your bookmarks
    1. Make sure your browser's bookmark toolbar is showing
    2. Highlight all the code (triple-click) and drag it onto the bookmark toolbar. You can rename the bookmark to something more sensible, as well as move the bookmark to a different folder
2. Visit the grovery store's website
    1. Sign in to your account
    2. Make sure you are on the "coupons" page. You should see the 'clip coupon' buttons
3. Run the JavaScript
    1. Click on the bookmarklet in your bookmarks
4. After the page has refreshed, run the code again, or manually clip the remaining coupons

## "Giant Food" Grocery Coupon Auto Clipper

Giant Food's coupon page can be found at [https://giantfood.com/savings/coupons/browse](https://giantfood.com/savings/coupons/browse)

`javascript:(function()%7Bif(document.URL%20!%3D%3D%20%22https%3A%2F%2Fgiantfood.com%2Fsavings%2Fcoupons%2Fbrowse%22)%7Balert(%60%22Grocery%20Coupon%20Auto%20Clipper%22%20must%20be%20on%20Giant's%20website%20to%20work.%5Cn%20Please%20visit%20https%3A%2F%2Fgiantfood.com%2Fsavings%2Fcoupons%2Fbrowse%2C%20log%20in%2C%20and%20try%20again.%60)%3B%7Delse%7Blet%20profileRequest%20%3D%20new%20XMLHttpRequest()%3BprofileRequest.open(%22GET%22%2C%20%22https%3A%2F%2Fgiantfood.com%2Fapi%2Fv3.0%2Fuser%2Fprofile%22%2C%20false)%3BprofileRequest.send()%3Blet%20userId%20%3D%20profileRequest.responseText%3Bif(typeof%20userId%20%3D%3D%20'string')%7Blet%20startIndex%20%3D%20userId.indexOf(%22%5C%22userId%5C%22%3A%22)%2B9%3Blet%20endIndex%20%3D%20userId.indexOf(%22%2C%5C%22currentOrderId%5C%22%3A%22)%3BuserId%20%3D%20userId.substring(startIndex%2CendIndex)%3B%7Dif(typeof%20userId%20!%3D%20'string'%20%7C%7C%20profileRequest.status%20!%3D%20200%20%7C%7C%20!Number.isInteger(Number(userId))%20%7C%7C%20userId%20%3D%3D%20%222%22)%7Balert(%22Failed%20getting%20user%20id.%20Please%20log%20in%20or%20try%20again%20later.%22)%3B%7Delse%7Blet%20availableList%20%3D%20document.getElementsByClassName(%22coupon-general-offers-wrapper_group%22)%5B0%5D%3Bvar%20allCoupons%20%3D%20availableList.getElementsByTagName(%22li%22)%3Balert(%60%22Grocery%20Coupon%20Auto%20Clipper%22%20is%20clipping%20%24%7BallCoupons.length%7D%20coupons.%20Please%20press%20'OK'%20and%20wait%20for%20GCAC%20to%20finish.%60)%3Bfor%20(coupon%20of%20allCoupons)%20%7Blet%20offerId%20%3D%20coupon.id%3Blet%20xhr%20%3D%20new%20XMLHttpRequest()%3Bxhr.open(%22POST%22%2C%20%60https%3A%2F%2Fgiantfood.com%2Fapi%2Fv4.0%2Fusers%2F%24%7BuserId%7D%2Fcoupons%2Fclipped%60%2C%20false)%3Blet%20contentBody%20%3D%20%22%7B%5C%22couponId%5C%22%3A%5C%22%22%2BofferId%2B%22%5C%22%7D%22%3Bxhr.withCredentials%20%3D%20true%3Bxhr.setRequestHeader(%22Content-Type%22%2C%20%22application%2Fjson%22)%3Bxhr.send(contentBody)%3B%7Dalert('%22Grocery%20Coupon%20Auto%20Clipper%22%20has%20completed.%20The%20webpage%20will%20now%20refresh.')%3Bwindow.location.reload()%3B%7D%7D%7D)()`
