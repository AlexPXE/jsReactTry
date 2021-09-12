"use strict"

const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,


    start: function () {

        let numberOfFilms = null;

        do {
            numberOfFilms = +prompt('Сколько фильмов вы посмотрели?', 0);
        } while (isNaN(numberOfFilms) || numberOfFilms === null);

        this.count = this.count + numberOfFilms;
    },

    quiz: function () {

        const quest = ['Название последнего фильма?', 'На сколько его оцените'];
        let answ = ['', ''];

        for (let i = 0; i < 2; i++) {
            for (let nQ = 0; nQ < 2;) {
                answ[nQ] = prompt((i + 1) + '. ' + quest[nQ], '');

                if ((answ[nQ] != null) && (answ[nQ].length > 0 && answ[nQ].length < 50)) {
                    nQ++;
                }
            }
            this.movies[answ[0]] = answ[1];
            answ = ['', ''];
        }
    },


    detectMyLevel: function () {

        if (this.count >= 30) {
            alert("Побереги глаза бро!");
        } else if (this.count >= 10) {
            alert("Отлично, ты середнячок!");
        } else if (this.count > 0) {
            alert("Ты совсем не смотришь фильмы, нужно исправляться!");
        }
    },

    showMyDB: function(){
        if(this.privat == false){
            console.log(this);
        } else {
            console.log('Объект не досупен');            
        }
    },

    writeYourGenres: function(){        
        let answ = '';       

        for(let ind = 1; ind < 4;){
            answ = (prompt(`Ваш любимый жанр под номером ${ind}:`, ''));
            
            if(RegExp(/^\p{L}/, 'u').test(answ)){   
                ind++;
                this.genres.push(answ) ;
            }
        }       
    }
};



personalMovieDB.start();
personalMovieDB.quiz();
personalMovieDB.writeYourGenres();
personalMovieDB.showMyDB();
personalMovieDB.detectMyLevel();




