"use strict"



const personalMovieDB = {
    count: null,
    movies: {},
    actors: {},
    genres: [],
    privat: false,

    quiz: function(){ 

        const numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '0');

        if(numberOfFilms > 0){

            if(numberOfFilms >= 30){
                alert("Побереги глаза бро!");
            } else if (numberOfFilms >= 10) {
                alert("Отлично, ты середнячок!");
            } else if(numberOfFilms > 0) {
                alert("Ты совсем не смотришь фильмы, нужно исправляться!");
            } 

            this.count = numberOfFilms;

            const quest = ['Название последнего фильма?', 'На сколько его оцените'];
            let answ = ['', ''];

            for (let i = 0; i < 2; i++){
                for (let nQ = 0; nQ < 2;){                
                    answ[nQ] = prompt((i + 1) + '. ' +  quest[nQ], '');
                        
                    if ((answ[nQ] != null) && (answ[nQ].length > 0 && answ[nQ].length < 50)){
                        nQ++;
                    }
                }
                    this.movies[answ[0]] = answ[1];
                    answ = ['', ''];
            }
        } else {
            this.count = 0;
            alert("Опять трололо, нолик тебе в поле!");
        }
    } 
};

personalMovieDB.quiz();

console.log(personalMovieDB);



