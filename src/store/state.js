var state = {
  //user
  isLoggedIn: false,
  user: {},
  accessToken: null,
  //ads
  categories: localStorage.getItem("categories")
    ? JSON.parse(localStorage.getItem("categories"))
    : null,
  category: null,
  subcategory: null,
  currentCategoryAdsCount: null,
  currentSubcategoryAdsCount: null,
  ads: null,
  adsIsLoading: true,
  newAdID: null,
  editedAdID: 0,
  states: localStorage.getItem("states")
    ? JSON.parse(localStorage.getItem("states"))
    : null,
  displayLocation: false,
  displayCategory: false,
  state: null,
  lga: null,
  userAds: [],
  promotionPrices: [2500, 8500],
  reachedEndOfAds: false,
  //navigation
  destinationURL: null,
  //messages
  messageLoading: false,
  messageSuccess: false,
  newMessage: false,
  unreadMessagesCount: 0,
  //favorites
  favoriteLoading: false,
  favoriteMessage: "",
  //dimensions
  footerHeight: null,
};

export { state };
