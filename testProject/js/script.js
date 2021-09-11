const numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '0');

const personalMovieDB = {
    count: numberOfFilms,
    movies: { },
    actors: {},
    genres: [],
    privat: false    
    
};

const lastMovie = prompt('Один из последних просмотренных фильмов?', ''), 
       raiting = prompt('На сколько его оцените', ''),
       lastMovie_1 = prompt('Один из последних просмотренных фильмов?', ''), 
       raiting_1 = prompt('На сколько его оцените', '');


       personalMovieDB.movies[lastMovie] = raiting;
       personalMovieDB.movies[lastMovie_1] = raiting_1;