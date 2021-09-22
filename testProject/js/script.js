/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
	movies: [
		"Скотт Пилигрим против...",
		"Логан",        
		"Ла-ла лэнд",
		"Лига справедливости",
		"Одержимость",
		
	],

	sort: function(){
		return this.movies.sort((a, b) => {
			if(a.toLowerCase() > b.toLowerCase()){
				return 1;
			}
			if(a.toLowerCase() < b.toLowerCase()){
				return -1;
			}
			return 0;
		});
	}
};

const adv = document.querySelector('.promo__adv'), 							//sponsor advertising block
	  advImg = adv.querySelectorAll('img'), 								//advertising img
	  promoBg = document.querySelector('.promo__bg'), 						//promo background
	  promoGenre = promoBg.querySelector('.promo__genre'), 					//promo genre
	  filmsList = document.querySelector('.promo__interactive-list'), 		//interactive films list
	  filmsItems = document.querySelectorAll('.promo__interactive-item'); 	//item interact films list


promoGenre.textContent = "ДРАМА";
promoBg.style.backgroundImage = 'url("img/bg.jpg")';

advImg.forEach(val => val.remove());

filmsList.innerHTML = "";

function displayFilmList(){
	let films = movieDB.sort();


	films.forEach((val, ind) => {
		filmsList.innerHTML += `
			<li class = 'promo__interactive-item'>
				${ind + 1}. ${val}
				<div class="delete"></div>
			<li>`;
	});

	/*
	filmsItems.forEach((val, ind) => {
		val.textContent = `${ind + 1}. ` + films[ind];		
	});	
	*/

	/*
	let li; 
	films.forEach((val, ind) => {		
		li = document.createElement('li');
		li.textContent = `${ind + 1}. ` + val ;
		li.classList.add('promo__interactive-item');
		filmsList.append(li);
	});	
	*/
}

displayFilmList();








