import { renderBlock } from './lib.js';
//Создать интерфейс SearchFormData, в котором описать структуру для полей поисковой формы.
//Написать функцию-обработчик формы search, которая собирает заполненные пользователем данные в формате описанной структуры 
//и передаёт их в функцию поиска.
//Функция поиска принимает как аргумент переменную интерфейса SearchFormData, 
//выводит полученный аргумент в консоль и ничего не возвращает.
// search({
//   city,
//   checkInDate,
//   checkOutDate,
//   maxPrice
// })
function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
}
export function renderSearchFormBlock(checkIn, checkOut) {
    let dateNow = new Date(); //сегодня
    let oneDay = 24 * 60 * 60 * 1000;
    let dateTommorow = new Date((Date.now()) + oneDay); //дата завтра
    let nextNextMonth = new Date(dateNow).setMonth(dateNow.getMonth() + 2); //2 мес вперед
    let lastDayNextMonth = new Date(nextNextMonth - 1); // последний день следующего месяца
    let checkInDate = checkIn || dateTommorow;
    let checkOutDate = checkOut || new Date(checkInDate.getTime() + oneDay * 2);
    function search(value) {
        console.log(value);
    }
    renderBlock('search-form-block', `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" 
            type="date" 
            value="${formatDate(checkInDate)}" 
            min ="${formatDate(dateNow)}" 
            max ="${formatDate(lastDayNextMonth)}" 
            name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" 
            type="date" 
            value ="${formatDate(checkOutDate)}" 
            min ="${formatDate(dateTommorow)}" 
            max ="${formatDate(lastDayNextMonth)}"  
            name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `);
    // @ts-ignore
    let city = document.getElementById('city').value;
    let checkInValue = formatDate(checkInDate);
    let checkOutValue = formatDate(checkOutDate);
    // @ts-ignore
    let maxPrice = document.getElementById('max-price').value;
    let maxPriceValue;
    if (maxPrice < 0) {
        maxPriceValue = 'Введите положительное число';
    }
    else if (maxPrice = 0) {
        maxPriceValue = 0;
    }
    else {
        maxPriceValue = maxPrice;
    }
    search({
        city,
        checkInValue,
        checkOutValue,
        maxPriceValue
    });
}
