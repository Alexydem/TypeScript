import { renderSearchFormBlock } from './search-form.js';
import { renderSearchStubBlock } from './search-results.js';
import { renderUserBlock, setUserData, getUserData, getFavoritesAmount } from './user.js';
import { renderToast } from './lib.js';
setUserData('Тетя Нина', "/img/avatar.png", 0);
let user = getUserData('user');
let favoritesAmount = getFavoritesAmount('favoritesAmount').amount;
window.addEventListener('DOMContentLoaded', () => {
    renderUserBlock(user.name, user.avatar, favoritesAmount);
    renderSearchFormBlock();
    renderSearchStubBlock();
    renderToast({
        text: 'Это пример уведомления. Используйте его при необходимости',
        type: 'success'
    }, {
        name: 'Понял',
        handler: () => { console.log('Уведомление закрыто'); }
    });
});
