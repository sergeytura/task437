const input = document.querySelector('.app__input') // поиск на странице
const app = document.querySelector('.app')

const debounce = (fn, debounceTime) => { // задержка поиска
    let timer;
    return function(...args) {
        clearInterval(timer)
        timer = setTimeout( () => fn.apply(this,args), debounceTime)
    }
};
const debounceSearch = debounce(getRepos, 1000) // реализация дебонс

async function getRepos (name) { // поиск репозиториев
    const repositories = await fetch(`https://api.github.com/search/repositories?q=${name}&per_page=5`)
               .then(data => data.json())
               .then(repo => repo.items)
               .catch(err => new Error(`Ошибка: ${err}`))
    return searchCards(repositories)
}

function searchCards (repositories) { // создание карточек автокомплита
    removeCards ()
    const fragment = document.createDocumentFragment();
    const ul = document.createElement('ul');
    ul.classList.add('app__search')

    for(const el of repositories) {
        const li = document.createElement('li');
        const { owner , name , stargazers_count } = el
        li.classList.add('app__search-li')
        li.addEventListener('click', function() {
            li.removeEventListener('click', arguments.callee);
            resultCards({ owner, name, stargazers_count })
        })
        li.textContent = el.name;
        fragment.append(li);
    } 

    ul.append(fragment)
    app.append(ul)
}

function removeCards () { // удаление карточек
    const cards = document.querySelector('.app__search');
    if(cards) cards.remove()
}

function resultCards({ owner, name, stargazers_count }) {     // создание карточки результата
    removeCards ()
    const fragment = document.createDocumentFragment();
    const ul = document.createElement('ul');
    const resCard = document.querySelector('.result') 
    ul.classList.add('app__result')
    const nameCard = document.createElement('li');
    const ownerCard = document.createElement('li');
    const starsCard = document.createElement('li');
    const button = document.createElement('button')
    button.classList.add('app__result-button')
    nameCard.textContent = `Name: ${name}` 
    ownerCard.textContent = `Owner: ${owner.login}`
    starsCard.textContent = `Stars: ${stargazers_count}`;
    fragment.append(nameCard,ownerCard,starsCard);
    ul.append(fragment, button)
    resCard.append(ul)
}

document.addEventListener('click', (e) => {  // удаление нажатием на крестик
    if (e.target.matches('.app__result-button')){
        (e.target.closest('ul')).remove()
    }
})

input.addEventListener('input' , (e) => { 
    const { value } = e.target;
    if(value.length == 0) { // если инпут чистый - удаляем автокомлит
        removeCards ()
    }
    return debounceSearch(value) // задержка поиска
});