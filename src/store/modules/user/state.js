export default {
  name: '',
  isUserLoggedIn:localStorage.BOOK_APP_TOKEN?true:false,
  token:localStorage.BOOK_APP_TOKEN?localStorage.BOOK_APP_TOKEN:'',
  topicList:[],
  activeIndex:0,
  activeItem:{}
}
