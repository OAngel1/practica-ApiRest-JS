const API_VERSION= 'https://api.themoviedb.org/3';
const FILTERS = {
    media:'movie',
    platform:false,
    categoryID:false,
    categoryNAME:false
}
let historyNav= [];
categoryTrends.addEventListener('click',(event)=>categoriesHashFilter(0,0,event,true));
searcForm.addEventListener('submit',(event)=>event.preventDefault());

async function getDataFetch(url, arguments=''){
    console.log(`${API_VERSION+url}?api_key=${API_KEYS+arguments}`);
    const res = await fetch(`${API_VERSION+url}?api_key=${API_KEYS+arguments}`);
    // const data  = await res.json();
    return  await res.json();
}
async function getTrendingPreview(){
    const data = await getDataFetch(`/trending/${FILTERS.media}/day`);
    const media =  data.results;
    createContentListGridCards(trendingSection,media);
}
async function getMediaByCategory(){
    const media_name_id = location.hash.split('-');
    const arguments = '&sort_by=popularity.desc&page=1&with_genres='+ media_name_id[2];
    const data = await getDataFetch(`/discover/${FILTERS.media}`,arguments);
    const medias =  data.results;
    // categoryMediaTitle.innerText= media_name_id[1];
    createContentListGridCards(categoryMediaContent,medias);
}
async function getMediaBySearch(){
    const [_,query] = location.hash.split('=');
    const arguments = '&sort_by=popularity.desc&page=1&query='+ query;
    const data = await getDataFetch(`/search/${FILTERS.media}`,arguments);
    const media =  data.results;
    createContentListGridCards(searched,media);
}
async function getGenresMedia(){
    const data = await getDataFetch(`/genre/${FILTERS.media}/list`);
    const genres = data.genres;
    createContentCategories(categoriesListSection,genres,true);
}
function getURLImage(filePath,fileSize = 200){
    const base_url = "https://www.themoviedb.org/t/p/";
    return `${base_url}w${fileSize+filePath}`;
}
async function fillMediaDatails(){
    const [_,media_id] = location.hash.split('=');
    console.log(media_id)
    // return media_id;
    const data = await getDataFetch(`/${FILTERS.media}/${media_id}`);
    const dataCredits = await getDataFetch(`/${FILTERS.media}/${media_id}/credits`);
    const directing = dataCredits.crew.find(elemt=>elemt.known_for_department == "Directing");
    const cast = dataCredits.cast.slice(0,6);
    
    productDetailImage.style.backgroundImage = `url(${getURLImage(data.backdrop_path,500)})`;
    productDetailTitle.innerText = data.title ? data.title : data.name;
    productDetailYear.innerText = `(${data.release_date? data.release_date.substring(0,4) : data.first_air_date})`;
    productDetailOverview.innerText = data.overview;
    productDetailDirector.innerText = FILTERS.media=='movie'? directing.name : '';
    productDetailCategoryList.innerText ='';
    createContentCategories(productDetailCategoryList,data.genres); 

    cast.forEach( acting =>{
        // const character = acting.character;
        // const name = acting.name;
        const actingContent = document.createElement('div');
        actingContent.classList.add('productDetail__cast--person');
        const nameActor  = document.createElement('a');
        const character = document.createElement('p');
        character.innerText = acting.character;
        nameActor.innerText = acting.name;
        actingContent.append(nameActor);
        actingContent.append(character);
        productDetailCast.append(actingContent)
    });
    
    const recomm = await getDataFetch(`/${FILTERS.media}/${media_id}/recommendations`);
    createContentListGridCards(productDetailRecommendations, recomm.results);

}
/* EXAMPLE
    <div class="contentListGrid__card">
        <a id="title-id" href="">
        <img src="./src/images/bleach.webp" alt="">
    </a>
    </div> 
*/
function createContentListGridCards(targetElemt,listMedia){
    // return;
    targetElemt.innerText= '';
    listMedia.forEach(media => {
        const href = FILTERS.media;
        const mediaCard = document.createElement('div');
        mediaCard.classList.add('contentListGrid__card');
        const aLink = document.createElement('a');
        
        aLink.addEventListener('click',()=>{
            historyNav.push(`#${href}=${media.id}`);
            location.hash = `#${href}=${media.id}`
        });
        const mediaImg =  document.createElement('img');
        mediaImg.setAttribute('alt',media.title)
        mediaImg.setAttribute('src', getURLImage(media.poster_path));
        aLink.append(mediaImg); 
        mediaCard.append(aLink);
        targetElemt.append(mediaCard);
    });
}
function createContentCategories(targetElemt,genres,link=false){
    const children = targetElemt.children[0];
    targetElemt.innerText= '';
    if(link)
        targetElemt.append(children);
    genres.forEach(({id,name}) => {
        const constainer = document.createElement('div');
        constainer.classList.add('categoryList__container');
        
        const text =  document.createElement('p');
        text.setAttribute('category-id',id)
        text.append(name)
        if(link){
            const link = document.createElement('a');
            link.dataset.algo= name
            link.addEventListener('click',(event)=>categoriesHashFilter(id,name,event));
            link.append(text);
            constainer.append(link);
        }else
            constainer.append(text);
        targetElemt.append(constainer);
    });
}
/* 
<div class="categoryList__container active">
                <p id="id0" >Todos</p>
            </div>
*/
function categoriesHashFilter(id,name,event, trends=false){
    const categoriesListActive = document.querySelector('.categoryList .active');
    categoriesListActive.classList.remove('active');
    
    const parent = event.currentTarget.parentNode;
    parent.classList.add('active');
    let hash;
    if(trends)
        hash = '#trends';
    else
        hash =  `#category=-${name}-${id}`;
    historyNav.push(hash);
    location.hash = hash;
};

getTrendingPreview();
getGenresMedia();
