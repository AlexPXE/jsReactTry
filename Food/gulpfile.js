const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");


//Настройка browser-sync
gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "src" //Директория в проекте в которой лежит ibdex.HTML
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

//Настройка gulp-sass
gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)") //работа с файлами sass scss
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) //компилировать (сжатый стиль, укажет где была ошибка если такая была)
        .pipe(rename({suffix: '.min', prefix: ''})) //переименовать
        .pipe(autoprefixer()) //Подставить вендерные префиксы
        .pipe(cleanCSS({compatibility: 'ie8'})) 
        .pipe(gulp.dest("src/css"))  //Куда класть
        .pipe(browserSync.stream());
});

gulp.task('watch', function() { //Отслеживание
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));    
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles')); //Запустить все задачи по умолчанию