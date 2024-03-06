import { renderBlock } from './lib.js'
import { getPlaceInfo } from './search-results.js';



function formatDate(date: Date): string { //переводит дату в формат строки YYYY-MM-DD
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`
}

export interface SearchFormData {
  city: string,
  checkInValue: string,
  checkOutValue: string,
  maxPriceValue: number
}

export function renderSearchFormBlock(
  checkIn?: Date,
  checkOut?: Date,
) {

  let dateNow: Date = new Date() //сегодня
  let oneDay: number = 24 * 60 * 60 * 1000
  let dateTommorow: Date = new Date((Date.now()) + oneDay) //дата завтра
  let nextNextMonth: number = new Date(dateNow).setMonth(dateNow.getMonth() + 2) //2 мес вперед
  let lastDayNextMonth: Date = new Date(nextNextMonth - 1); // последний день следующего месяца

  let checkInDate: Date = checkIn || dateTommorow;
  let checkOutDate: Date = checkOut || new Date(checkInDate.getTime() + oneDay * 2);


  // @ts-ignore
  let priceValue: number = 0 //научиться при ундефинед выдавать слово "введите значение"


  renderBlock(
    'search-form-block',
    `
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
            <input id="max-price" type="text" value="введите цену" name="price" class="max-price" />
          </div>
          <div>
            <div><button id="search-button">Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )






  //функция выводит в консоль то что хотим искать
  function searchConsoleLog(
    value: SearchFormData): void {
    console.log(value.city)
    console.log(value.checkInValue)
    console.log(value.checkOutValue)
    console.log(value.maxPriceValue)
  }

  //при нажатии на кнопку в консоль выводятся данные поиска но страница тут же обновляется
  document.getElementById('search-button').addEventListener("click", function () {
    event.preventDefault() //теперь он накидывать к результатам все новое и новое!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // @ts-ignore
    let city: string = document.getElementById('city').value
    let checkInValue: string = formatDate(checkInDate)
    let checkOutValue: string = formatDate(checkOutDate)

    //////////////////////////////////не видит чисдло. всегда 0 показывает. узнать как доставать число из строки поиска
    // @ts-ignore
    let maxPriceValue: number = document.getElementById('max-price').value
    if (isNaN(maxPriceValue) || maxPriceValue <= 0) {
      maxPriceValue = 0
    }

    searchConsoleLog({
      city,
      checkInValue,
      checkOutValue,
      maxPriceValue,
    })

    const searchParams: SearchFormData = {
      city: city,
      checkInValue: checkInValue,
      checkOutValue: checkOutValue,
      maxPriceValue: maxPriceValue
    }

    getPlaceInfo(searchParams)
  })




}
