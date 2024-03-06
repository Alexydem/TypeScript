import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import {
  renderUserBlock,
  setUserData,
  getUserData,
  getFavoritesAmount,
  userData,
  Amount
} from './user.js'
import { renderToast } from './lib.js'
import { renderSearchResultsBlock } from './search-results.js'

setUserData('Тетя Нина', "/img/avatar.png", 0)
let user: userData = getUserData('user')
let favoritesAmount: Amount = getFavoritesAmount('keyFavoritesAmount')


window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock(user.name, user.avatar, favoritesAmount)
  renderSearchFormBlock()
  renderSearchStubBlock()
  renderSearchResultsBlock()




  renderToast(
    {
      text: 'Это пример уведомления. Используйте его при необходимости',
      type: 'success'
    },
    {
      name: 'Понял',
      handler: () => { console.log('Уведомление закрыто') }
    }
  )
})
