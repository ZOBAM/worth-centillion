var state = {
  isLoggedIn : false,
  user: {},
  categories: localStorage.getItem('categories')? JSON.parse(localStorage.getItem('categories')):null,
  category: null,
  subcategory: null,
  currentCategoryAdsCount: null,
  currentSubcategoryAdsCount: null,
  ads: null,
  adsIsLoading: true,
  states: localStorage.getItem('states')? JSON.parse(localStorage.getItem('states')):null,
  displayLocation: false,
  displayCategory: false,
  state: null,
  lga: null,
  userToken: '',
  userAds: [],
  //loginURL: process.env.VUE_APP_APIURL+"/login",
  //userAdsURL: "http://www.api.worthcentillion.net/api/ads",
};

export { state };
