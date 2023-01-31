

const debounce = (fn, debounceTime) => { // задержка поиска
    let timer;
    return function(...args) {
        clearInterval(timer)
        timer = setInterval( () => fn.apply(this,args), debounceTime)
    }
};

const input = document.querySelector('.app__input') // поиск на странице
input.addEventListener('input' ,(e) => {
    const { value } = e.target;
    if(value.length == 0) { // если инпут чистый - удаляем автокомлит
        let liCount = document.querySelectorAll('.app__search-li') 
        liCount.forEach( e => e.remove())
    }
    if(value.length > 2) debounce(searchRepos(value),2000)
});

async function searchRepos (name) { // поиск репозиториев
    const repos = []
    const app = document.querySelector('.app')
    await fetch(`https://api.github.com/search/repositories?q=${name}&per_page=5`)
               .then(data => data.json())
               .then( repo => repos.push(...repo.items))
               .catch(err => new Error(`Ошибка: ${err}`))
    const ul = document.createElement('ul');
    ul.classList.add('app__search')
    const fragment = document.createDocumentFragment();
    console.log(repos)
    // не более 5 результатов поиска
    let liCount = document.querySelectorAll('.app__search-li') 
    if(Array.from(liCount).length >= 4) {
         liCount.forEach( e => e.remove())
    }
    // создание карточки поиска
    for(repo of repos) {
        const li = document.createElement('li');
        li.classList.add('app__search-li')
        li.insertAdjacentHTML('afterbegin',`<a href='${repo.html_url}'>${repo.name}</a>`);
        fragment.append(li);
    }
    ul.append(fragment)
    app.append(ul)
 
}

async function resultRepos(res) {
    const repos = []
    const app = document.querySelector('.app')

    await fetch(`https://api.github.com/search/repositories?q=${res}&per_page=1`)
               .then(data => data.json())
               .then( repo => repos.push(...repo.items))
               .catch(err => new Error(`Ошибка: ${err}`))

    const ul = document.createElement('ul');
    ul.classList.add('app__result')
    const fragment = document.createDocumentFragment();
    // не более 3 результатов поиска
    let liCount = document.querySelectorAll('.app__result') 
    
    console.log(Array.from(liCount)) // ДОРАБОТАТЬ УДАЛЕНИЕ БОЛЕЕ 3-х КАРТОЧЕК РЕЗУЛЬТАТА
    if(Array.from(liCount).length >= 3) {
        try {
            liCount.remove()
        }
        catch(err) {
            console.log(`woops ${err}`)
        } 
    }
    // создание карточки результата
        for(repo of repos) {
            const li = document.createElement('li');
            li.classList.add('app__result-li')
            li.insertAdjacentHTML('afterbegin', `Name: ${repo.name}<br/>Owner: ${repo.owner.type}<br/>Stars: ${repo.stargazers_count}`);
            fragment.append(li);
        }
        ul.append(fragment)
        app.append(ul)
}

resultRepos('appert')
resultRepos('poster')
searchRepos('tetris')

document.addEventListener('click', (e) => {
    
    if (e.target.matches('.app__search-li')) {
        console.log(e.target) 
    }
    // let liCountSearch = document.querySelectorAll('.app__result-li') 
    // console.log(Array.from(liCountSearch))
    // if(Array.from(liCountSearch.length > 3)) {
    //     liCountSearch[0].remove()
    // }
})

function clear(elem) {
    return elem.innerHTML = ''
}

setTimeout(() => clear(input), 1000)