import { renderBlock } from './lib.js'

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




function formatDate(date: Date): string { //переводит дату в формат строки YYYY-MM-DD
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`
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


  interface SearchFormData {
    city: string,
    checkInValue: string,
    checkOutValue: string,
    maxPriceValue: number | null
  }

  function search(value: SearchFormData): void {
    console.log(value)
  }

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
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )

  // @ts-ignore
  let city: string = document.getElementById('city').value
  let checkInValue: string = formatDate(checkInDate)
  let checkOutValue: string = formatDate(checkOutDate)
  // @ts-ignore
  let maxPrice: number | null = document.getElementById('max-price').value
  let maxPriceValue: any
  if (maxPrice < 0) {
    maxPriceValue = 'Введите положительное число'
  } else if (maxPrice = 0) {
    maxPriceValue = 0
  } else {
    maxPriceValue = maxPrice
  }


  search(
    {
      city,
      checkInValue,
      checkOutValue,
      maxPriceValue
    }
  )



}
