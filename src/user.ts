import { renderBlock } from './lib.js'

export interface userData {
  name: string,
  avatar: string
}

export interface Amount {
  amount: number
}

export function setUserData( //инит ключа -{имя, ссылка}+{избранное}
  name: String,
  avatar: String,
  favoritesAmount: number
): void {
  localStorage.setItem('user', JSON.stringify({ name: name, avatar: avatar }));
  localStorage.setItem('favoritesAmount', JSON.stringify({ favoritesAmount: favoritesAmount }));
}

//возможно надо создать интерфейс Юзера, чтобы потом проверять его

// читает ключ юзер ( применить подход с unknown, чтобы валидировать содержимое localStorage)
export function getUserData(keyUser: string): userData {
  const userItem = localStorage.getItem(keyUser)
  let user: unknown;
  if (userItem) {
    return user = JSON.parse(userItem)
  }
  return undefined
}

// читает ключ favoritesAmount ( применить подход с unknown, чтобы валидировать содержимое localStorage)
//////////////
//////////////
////////////// в локале нормально считается количество избранных. надо чтобы сюда передавалось
//////////////
export function getFavoritesAmount(keyFavoritesAmount: string): Amount {
  const userFavoriteItem = localStorage.getItem(keyFavoritesAmount)
  let amount: unknown
  if (userFavoriteItem) {

    return amount = JSON.parse(userFavoriteItem)
  }
  return undefined
}

//принимает имя, ссылка и количество избранных. 
//Последнее поле является необязательным. Использовать эти данные для вывода блока пользователя.
export function renderUserBlock(name: string, avatar: string, favoriteItemsAmount?: unknown) {
  const favoritesCaption = favoriteItemsAmount ? favoriteItemsAmount : 'ничего нет'
  const hasFavoriteItems = favoriteItemsAmount ? true : false

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src=${avatar} alt="Wade Warrenn" />
      <div class="info">
          <p class="name">${name}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? 'active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  )
}
