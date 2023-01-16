window.addEventListener('DOMContentLoaded',navigator,false);
window.addEventListener('hashchange',navigator,false);


arroyReturn.addEventListener('click',()=>returnHistory());
searchBtn.addEventListener('click',()=>{
    historyNav.push('#search='+searchInput.value);
    location.hash = '#search='+searchInput.value;
});
idMovie.addEventListener('click',(event)=>swichMovieTv(event));
idTv.addEventListener('click',(event)=>swichMovieTv(event));


function swichMovieTv(event){
    idMedia=event.path[0].id;

    if(idMedia!= FILTERS.media){
        idMovie.parentElement.classList.toggle('search--active');
        idTv.parentElement.classList.toggle('search--active');
        FILTERS.media= event.path[0].id;
        
        getTrendingPreview();
        getGenresMedia();
        if(location.hash.startsWith('#search='))
            getMediaBySearch();
        else{
            historyNav.push(location.hash);
            location.hash = '#home';
            categoryTrends.parentNode.classList.add('active');
            categoriesListSection.scrollLeft=0;
        }
    }else{
        console.log('lo mismo')
    }
}
function returnHistory(){
    historyNav.pop();
    if(historyNav.length<1){
        location.hash = '#home';
    }else{
        location.hash = historyNav.slice(-1);
    }
}

function navigator(){
    console.log(historyNav)
    if(location.hash.startsWith('#trends')){
        trendsPage();
    }else if (location.hash.startsWith('#search=')) {
        searchPage();
    }else if (location.hash.startsWith('#movie=')) {
        moviePage();
    }else if (location.hash.startsWith('#tv=')) {
        tvPage();
    }else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    }else{
        homePage();
    }
}

function homePage(){
    arroyReturn.classList.add('inactive')
    productDetailSection.classList.add('inactive');
    searched.classList.add('inactive');
    categoryMediaSection.classList.add('inactive');

    searchSection.classList.remove('search--search');
    searchSection.classList.remove('inactive');
    categoriesSection.classList.remove('inactive');
    trendingSection.classList.remove('inactive');    
}
function trendsPage(){
    homePage();
}
function searchPage(){
    getMediaBySearch();
    arroyReturn.classList.remove('inactive');
    searched.classList.remove('inactive');
    searchSection.classList.remove('inactive');

    searchSection.classList.add('search--search');
    productDetailSection.classList.add('inactive');
    categoriesSection.classList.add('inactive');
    trendingSection.classList.add('inactive');
    categoryMediaSection.classList.add('inactive');  
}
function moviePage(){
    fillMediaDatails();
    arroyReturn.classList.remove('inactive')
    productDetailSection.classList.remove('inactive');

    searchSection.classList.add('inactive');
    searched.classList.add('inactive');
    categoriesSection.classList.add('inactive');
    trendingSection.classList.add('inactive');
    categoryMediaSection.classList.add('inactive');     
    window.scrollTo(0, 0);   
}

function tvPage(){
    fillMediaDatails();
    arroyReturn.classList.remove('inactive')
    productDetailSection.classList.remove('inactive');

    searchSection.classList.add('inactive');
    searched.classList.add('inactive');
    categoriesSection.classList.add('inactive');
    trendingSection.classList.add('inactive');
    categoryMediaSection.classList.add('inactive');    
    window.scrollTo(0, 0);
}
function categoriesPage(){
    getMediaByCategory();
    categoryMediaSection.classList.remove('inactive');    
    trendingSection.classList.add('inactive');
    searchSection.classList.remove('inactive');
    categoriesSection.classList.remove('inactive');
    arroyReturn.classList.add('inactive')
    productDetailSection.classList.add('inactive');
    window.scrollTo(0, 0);   
}
