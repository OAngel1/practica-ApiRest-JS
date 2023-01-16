/**
 * @param id {string}
 * @return {HTMLElement}
 */
const $ = (id) =>document.querySelector(id);

const arroyReturn = $('.header-arrow');

const idMovie = $('#movie');
const idTv = $('#tv');

//SECTION SEARCH
const searchSection= $('.search');
const searched = $('#searched');
const searchBtn = $('#searchBtn');
const searcForm = $('#searchForm');
const searchInput = $('.search .search__input input');


//SECTION Platforms
const platformsSection = $('.platforms');

//SECTION categories
const categoriesSection = $('.categories');
const categoriesListSection = $('.categories .categoryList');
const categoryTrends =$('#categoryTrend');

//SECTION Medias
const categoryMediaSection = $('#categoryMedia');
const categoryMediaTitle = $('#categoryMedia h3');
const categoryMediaContent = $('#categoryMedia .contentListGrid');
const trendingSection = $('#trending');
const trendingContent = $('#trending .contentListGrid');

//SECTION Media backdrop_path
const productDetailSection = $('.productDetail'); 
const productDetailImage = $('.productDetail--img');
const productDetailTitle = $('.productDetail__head h3');
const productDetailYear = $('.productDetail__head span'); 
const productDetailOverview = $('.productDetail__info > p');
const productDetailDirector = $('.productDetail__info--director');
const productDetailCast = $('.productDetail__cast');
const productDetailCategoryList = $('.productDetail .product--genres');
const productDetailRecommendations = $('.productDetail__recommendations .contentListGrid');
