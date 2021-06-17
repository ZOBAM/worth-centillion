var state = {
  //user
  isLoggedIn: false,
  user: null,
  accessToken: null,
  //ads
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
  userAds: [],
  //navigation
  destinationURL: null,
  //messages
  messageLoading: false,
  messageSuccess: false,
  newMessage: false,
  unreadMessagesCount: 0,
};

export { state };
