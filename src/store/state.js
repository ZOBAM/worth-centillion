var state = {
  isLoggedIn: false,
  user: null,
  userWalletBalance: 0,
  categories: localStorage.getItem("categories")
    ? JSON.parse(localStorage.getItem("categories"))
    : null,
  category: null,
  subcategory: null,
  currentCategoryAdsCount: null,
  currentSubcategoryAdsCount: null,
  ads: [
    {
      id: 1,
      title: "Good Audio App",
      price: 230,
      ad_img: "../assets/images/mobile_purchase.png",
    },
    {
      id: 2,
      title: "Good Audio App",
      price: 230,
      ad_img: "../assets/images/mobile_purchase.png",
    },
    {
      id: 3,
      title: "Good Audio App",
      price: 230,
      ad_img: "../assets/images/mobile_purchase.png",
    },
    {
      id: 4,
      title: "Good Audio App",
      price: 230,
      ad_img: "../assets/images/mobile_purchase.png",
    },
  ],
  adsIsLoading: true,
  states: localStorage.getItem("states")
    ? JSON.parse(localStorage.getItem("states"))
    : null,
  displayLocation: false,
  displayCategory: false,
  state: null,
  lga: null,
  accessToken: null,
  userAds: [],
  destinationURL: null,
  //loginURL: process.env.VUE_APP_APIURL+"/login",
  //userAdsURL: "http://www.api.worthcentillion.net/api/ads",
};

export { state };
