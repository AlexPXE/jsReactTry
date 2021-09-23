/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOM', () => { 	//when DOM loaded
		//MOVIE DB
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
		},
		
		addMovie: function(movie){    //Add movie to DB				
			this.movies.push( capLetter(movie)); 
		},

		remove: function(ind){

			( ind >= 0) && 
			( ind < this.movies.length) && 
			( this.movies.splice(ind, 1));
		}
	};

	//OBJECT FOR DB CASHING
	const cashForDB = {

		cashSet: new Set(),

				//add item to cash
		movieCash: function (func, db, cash = this.cashSet){		

			db.movies.forEach( (val) => {
				cash.add( val.toLowerCase());				//all strings in lowercase
			});

			return function( val) {
				(
					cash.has( val.toLowerCase()) && !( console.log( "Movie alredy added!"))
				) || (
					cash.add( val.toLowerCase()), func.call( db, val)					
				);			
			};
		},
				//remove element from cash
		removeFromCash:	function ( func, db, cash = this.cashSet){

			return function( ind){			
				cash.delete( db.movies[ind].toLowerCase());
				func.call( db, ind);			
			};
		}
	};

	//VALUES
	const adv = document.querySelector( '.promo__adv'), 						//sponsor advertising block
		advImg = adv.querySelectorAll( 'img'), 								//advertising img
		promoBg = document.querySelector( '.promo__bg'), 						//promo background
		promoGenre = promoBg.querySelector( '.promo__genre'), 				//promo genre
		filmsList = document.querySelector( '.promo__interactive-list'), 		//interactive films list
		filmsItems = document.querySelectorAll( '.promo__interactive-item'), 	//item interact films list
		addForm = document.querySelector( '.add'),
		addBtn = addForm.querySelector( 'button'),	  
		addInput = addForm.querySelector( '.adding__input'),
		checkbox = addForm.querySelector ('[type="checkbox"]');
		//cart = filmsItems.querySelector('::before');

	//FUNCTIONS
	function cutItem(str, l = 18){	
		
		return str.substr(0, l) + "...";
	}

		//Add capital letter
	function capLetter( word){
		return word[0].toUpperCase() + word.slice(1);
	}

		//display sort movie list
	function displayFilmList(){        
		let films = movieDB.sort();
		
		filmsList.innerHTML = "";

		films.forEach( (val, ind) => {
			filmsList.innerHTML += `
				<li class = 'promo__interactive-item'>
					${ind + 1}. ${( (val > 21) && (cutItem(val)) || val)}
					<div class="delete"></div>
				<li>`;
		});	
		/*
		filmsItems.forEach((val, ind) => {
			val.textContent = `${ind + 1}. ` + films[ind];		
		});	
		let li; 
		*//*
		films.forEach((val, ind) => {		
			li = document.createElement('li');
			li.textContent = `${ind + 1}. ` + val ;
			li.classList.add('promo__interactive-item');
			filmsList.append(li);
		});	
		*/	
	}


	//HANDLER FUNCTIONS
		//confirm button
	function addMovHandler(e){		
		
		e.preventDefault();  //prevent 

		let field = addInput.value;

		field && (
			movieDB.addMovie(field), 
			checkbox.checked && 
			console.log("Добавляем любимый фильм")
		); 

		checkbox.checked && (
			checkbox.checked = false
		);

		addInput.value = "";
		displayFilmList();
	}
		//del movie from list
	function delMovieHandler(e){		
		
		( e.target.className == 'delete') && ( 
			movieDB.remove(
				+e.target.parentElement.innerText[0] - 1   //index = (item number on page) - 1
			), 	
			e.target.parentElement.remove(),			   //remove list item from page
			displayFilmList()
		);
	}

	//CODE
	promoGenre.textContent = "ДРАМА";
	promoBg.style.backgroundImage = 'url("img/bg.jpg")';

	movieDB.addMovie = cashForDB.movieCash( movieDB.addMovie, movieDB); //wrap functions
	movieDB.remove = cashForDB.removeFromCash( movieDB.remove, movieDB);

	advImg.forEach(val => val.remove());  //remove advertising imgs

	displayFilmList();

		//listeners
	addBtn.addEventListener('click', addMovHandler);       //click on confirm button
	filmsList.addEventListener('click', delMovieHandler);  //click on cart

});
