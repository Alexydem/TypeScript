import { renderBlock } from './lib.js';
import { getFavoritesAmount } from './user.js';
const api = `http://localhost:3000/api/places`;
export function getPlaceInfo(searchParams) {
    return fetch(api)
        .then((response) => response.json())
        .then((placesData) => {
        console.log("API Data", placesData);
        console.log("searchParams", searchParams);
        const resultsList = document.getElementsByClassName('results-list')[0];
        resultsList.innerHTML = '';
        console.log("НАЧАЛЬНЫЙ localStorage", localStorage);
        let currentFavoritesArr = [];
        ///////    переключатель класса active    ///////
        function toggleFavoriteItem(event) {
            const clickedElement = event.target;
            clickedElement.classList.toggle('active');
            const hotelId = Number(event.target.getAttribute('key'));
            Object.values(placesData.places).forEach((place) => {
                if (place.id === hotelId) {
                    let newFavorite = {
                        id: place.id,
                        name: place.name,
                        img: place.image
                    };
                    let isAlreadyFavorite = currentFavoritesArr.some((favorite) => favorite.id === newFavorite.id);
                    if (!isAlreadyFavorite) {
                        console.log("такго еще нет");
                        currentFavoritesArr.push(newFavorite);
                        localStorage.setItem("favoriteItems", JSON.stringify(currentFavoritesArr));
                    }
                    else {
                        // Если уже в избранном, удаляем его
                        console.log("такой уже есть");
                        //оставляем в фильтре те, которые не задублированы
                        const removeFavoritesArr = currentFavoritesArr.filter((favorite) => favorite.id !== newFavorite.id);
                        currentFavoritesArr = removeFavoritesArr;
                        localStorage.removeItem("favoriteItems");
                        localStorage.setItem("favoriteItems", JSON.stringify(removeFavoritesArr));
                    }
                    console.log("Массив favorite отелей в LocalStorage", JSON.parse(localStorage.getItem("favoriteItems")), 'длинна массива', JSON.parse(localStorage.getItem("favoriteItems")).length);
                    localStorage.setItem("keyFavoritesAmount", JSON.parse(localStorage.getItem("favoriteItems")).length);
                    console.log(localStorage);
                    getFavoritesAmount("keyFavoritesAmount");
                    console.log("ИТОГО В ИЗБРАННОМ", getFavoritesAmount("keyFavoritesAmount"));
                }
            });
        }
        //вешаем слушатель клика в область body
        document.body.addEventListener('click', function (event) {
            const target = event.target;
            //если кликнутый имеет класс favorites то запускаем переключатель active
            if (target.classList.contains('favorites')) {
                toggleFavoriteItem(event);
            }
        });
        Object.values(placesData.places).forEach((place) => {
            let id = place.id;
            let name = place.name;
            let description = place.description;
            let image = place.image;
            let remoteness = place.remoteness;
            let price = place.price;
            if (price <= searchParams.maxPriceValue) {
                //////////////////////////////////////////////// сделай поиск и по другим параметрам - возможно потои
                const resultHTML = `
          <li class="result">
            <div class="result-container">
              <div class="result-img-container">
                <div class="favorites" key=${id}></div>
                <img class="result-img" src="${image}" alt="${name}">
              </div>
              <div class="result-info">
                <div class="result-info--header">
                  <p>${name}</p>
                  <p class="price">${price}&#8381;</p>
                </div>
                <div class="result-info--map"><i class="map-icon"></i> ${remoteness}км от вас</div>
                <div class="result-info--descr">${description}</div>
                <div class="result-info--footer">
                  <div>
                    <button>Забронировать</button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        `;
                // Вставляем HTML-строку в каждый элемент коллекции
                resultsList.innerHTML += resultHTML;
            }
        });
        return placesData;
    });
}
//взять параметры поиска из полей поиска
//искать по заданным параметра в БД
//выдасть список того, что подходит из БД
//на основании выданого отрендерить на экране
export function renderSearchStubBlock() {
    renderBlock('search-results-block', `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `);
}
export function renderEmptyOrErrorSearchBlock(reasonMessage) {
    renderBlock('search-results-block', `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `);
}
export function renderSearchResultsBlock() {
    renderBlock('search-results-block', `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list">
    
     
    </ul>
    `);
}
