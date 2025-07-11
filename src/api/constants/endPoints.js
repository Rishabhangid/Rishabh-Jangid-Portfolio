export const ENDPOINTS = {

    REGISTER: "/api/v1/auth/register",
    LOGIN: "/api/v1/auth/login",

    FORGOTPASSWORD: "/api/v1/auth/forgot-password",
    VERIFYOTP: "/api/v1/auth/verify-otp",

    // sending and verifying otp on mobile number
    VERIFYNUMBER: "/api/v1/auth/check-phone",
    VERIFYPHONE: "/api/v1/auth/verify-phone",

    // sending and verifying otp on email address
    VERIFYEMAIL: "/api/v1/auth/check-email",
    VERIFYEMAILOTP: "/api/v1/auth/verify-email",

    // fetching all banners
    FETCHALLBANNERS :"/api/v1/banners?banner_type=all",

    // fetching all product catagory
    FETCHINGALLCATAGORY:"/api/v1/categories",

    // fetching trending products
    FETCHTRENDINGPRODUCT: "/api/v1/products/top-rated",
    
    // fetching all latest products
    FETCHLATESTPRODUCT: "/api/v1/products/latest",

    // fetching product rating
    FETCHPRODUCTRATING: "/api/v1/products/rating/",

    // fetching feature / best selling products
    FETCHBESTSELLINGPRODUCT: "/api/v1/products/featured",

    // fetching single product detail
    FETCHSINGLEPRODUCTDETAIL:"/api/v1/products/details/",

    // fetch product total orders and wishlist
    FETCHPRODUCTTOTALORDER: "/api/v1/products/counter/",

    // fetch product reviews
    FETCHPRODUCTREVIEWS: "/api/v1/products/reviews/",

    // fetch related products by id
    FETCHRELATED: "/api/v1/products/related-products",

    // fetching products by catagory id
    FETCHINGPRODUCTBYCATAGORYID: "/api/v1/categories/products/",

    // send contact
    POSTCONTACTMESSAGE: "/api/v1/contact_store",

    // fetching delivery type 
    FETCHDELIVERYTYPE: "/api/v1/products/shipping-methods",

    
    // post user address ( at checkout time )
    SAVEUSERADDRESS: "/customer/choose-shipping-address",

    // fetching delivery address of user
    FETCHUSERADDRESS : "/api/v1/customer/address/list",

    // fetch user info
    FETCHUSERINFO: "/api/v1/customer/info",

    // fetching user wishlist
    FETCHUSERWISHLIST: "/api/v1/customer/wish-list",

    // add product to wishlist
    ADDTOWISHLIST: "/api/v1/customer/wish-list/add",

    // remove from wishlist
    REMOVEFROMWISHLIST: "/api/v1/customer/wish-list/remove",

    // add commment 
    ADDCOMMENT: "/api/v1/customer/order/deliveryman-reviews/submit",

    // fetch user support ticket
    FETCHUSERSUPPORTTICKET: "/api/v1/customer/support-ticket/get",

    // add user ticket message
    // ADDUSERMESSAGE:"/api/v1/customer/support-ticket/reply",
    ADDUSERMESSAGE:"/api/v1/customer/chat/send-message/seller",

    // fetch single ticket info by id
    FETCHSINGLETICKET: "/api/v1/customer/support-ticket/conv",

    // add user address
    ADDUSERADDRESS: "/api/v1/customer/address/add",

    // cancel order
    CANCELORDER : "/api/v1/order/cancel-order",

    // update address
    UPDATEADDRESS: "/api/v1/customer/address/update",

    // update user
    UPDATEUSER: "/api/v1/customer/update-profile",

    // delete user address
    DELETEUSERADDRESS: "/api/v1/customer/address",

    // fetch all user order list
    FETCHALLORDERS: "/api/v1/customer/order/list",

    // fetch single order detils
    FETCHSINGLEORDERDETAIL: "/api/v1/customer/order/details",

    // track order
    TRACKORDER:"/api/v1/order/track",

    // add user token 
    ADDUSERTICKET: "/api/v1/customer/support-ticket/create",

    // delete ticket
    DELETETICKET: "/api/v1/customer/support-ticket/delete/",

    // search productd
    SEARCHPRODUCTS: "/searched-products",

    // get brands
    FETCHALLBRANDS: "/api/v1/brands",

    // filter bar api
    FILTERAPI: "/api/v1/products",

    // add to cart
    ADDTOCART: "/api/v1/cart/add",

    // delete complete cart
    CLEARALLCART: "/api/v1/cart/remove-all",

    // get user cart
    FETCHUSERCART: "/api/v1/cart",

    // remove product from cart
    REMOVEPRODUCT: "/api/v1/cart/remove",

    // varient price
    // VARIENTPRICE: "/cart/variant_price",
    VARIENTPRICE: "/api/v1/cart/update",

    // header search
    HEADERSEARCH: "/api/v1/products/search",

    // place order
    PLACEORDER:"/api/v1/customer/order/place",

    // fethch payment type
    FETCHPAYMENTYPE : "/api/v1/config",

    // generate order id
    GENERATEORDERID : "/api/v1/config",





};

