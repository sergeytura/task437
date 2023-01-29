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

// async function getRepo(repo) { // получаем массив репозиториев 5 шт.
//     try {
//         let data = await fetch(`https://api.github.com/search/repositories?q=${repo}&per_page=5`)
//         let dataJson = await data.json()
//         return dataJson
//     }
//     catch(err){
//         console.log(`Произошла ошибка: ${err}`)
//     }
// }

async function getRepo(repo) { // получаем массив репозиториев 5 шт.
   return fetch(`https://api.github.com/search/repositories?q=${repo}&per_page=5`)
       .then(data => data.json())
       .catch(err => new Error(`Ошибка: ${err}`))
}

async function searchRepos (name) { // поиск репозиториев
    const repos = []
    const app = document.querySelector('.app')
    await getRepo(name).then(repo => repos.push(...repo.items)) 
    const ul = document.createElement('ul');
    ul.classList.add('app__search')
    const fragment = document.createDocumentFragment();
    
    // не более 5 результатов поиска
    let liCount = document.querySelectorAll('.app__search-li') 
    if(Array.from(liCount).length >= 4) {
         liCount.forEach( e => e.remove())
    }
    // создание карточки поиска
    setTimeout( () => {
        for(repo of repos) {
            const li = document.createElement('li');
            li.classList.add('app__search-li')
            li.innerHTML = `<a href='${repo.html_url}'>${repo.name}</a>`;
            fragment.append(li);
        }
        ul.append(fragment)
        app.append(ul)
    },900)
}

    

// ul.style = "list-style: none;margin: 10px 0px 0px 10px;padding: 0px;"
// const liName = document.createElement('li')
// const liOwner = document.createElement('li')
// const liStars = document.createElement('li')
// liName.textContent = 'Name: FrontEnd'
// liOwner.textContent = 'Owner: Sergey'
// liStars.textContent = 'Stars: 6 stars'
// ul.append(liName)
// ul.append(liOwner)
// ul.append(liStars)
// console.log(ul)

// res.classList.add('app__result')
// res.append(ul)
// app.append(res)


async function resultRepos(res) {
    const repos = []
    const app = document.querySelector('.app')
    await getRepo(res).then(repo => repos.push(...repo.items)) 
    const ul = document.createElement('ul');
    ul.classList.add('app__result')
    const fragment = document.createDocumentFragment();
    
    // console.log(repos)
    // не более 3 результатов поиска
    // let liCount = document.querySelectorAll('.app__result-li') 
    // if(Array.from(liCount).length >= 3) {
    //      liCount.forEach( e => e.remove())
    // }
    // создание карточки результата
    setTimeout( () => {
        for(repo of repos) {
            const li = document.createElement('li');
            li.classList.add('app__result-li')
            li.innerHTML = `Name: ${repo.name}<br/>Owner: ${repo.owner.type}<br/>Stars: ${repo.stargazers_count}`;
            fragment.append(li);
        }
        ul.append(fragment)
        app.prepend(ul)
    },500)
}


document.addEventListener('click', (e) => {

    if (e.target.matches('.app__search-li')) {
        resultRepos(e) 
    }
    // let liCountSearch = document.querySelectorAll('.app__result-li') 
    // console.log(Array.from(liCountSearch))
    // if(Array.from(liCountSearch.length > 3)) {
    //     liCountSearch[0].remove()
    // }
})