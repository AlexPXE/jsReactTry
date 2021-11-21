let preprocessor = 'sass'; //выбор препроцессора
let prExt = 'scss';

const {src, dest, parallel, series, watch} = require('gulp');
const browserSync = require('browser-sync').create();
// Подключаем gulp-concat
const concat = require('gulp-concat'); 
// Подключаем gulp-uglify-es
const uglify = require('gulp-uglify-es').default;
const autopref = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const less = require('gulp-less');
// json-server
const jsonServer = require('json-server');

function jsonServ(){								//Запуск json-server
	const server = jsonServer.create();
	const router = jsonServer.router('db.json'); 	//Путь к базе данных
	const middlewares = jsonServer.defaults();

	server.use(middlewares);
	server.use(router);
	server.listen(3000, () => {
  		console.log('JSON Server is running');
	});
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: './src'
        }
    });
}

function scripts() {
	return src([                                        // Берем файлы из источников		
		'src/js/main.js',                                    // Пользовательские скрипты, использующие библиотеку, должны быть подключены в конце
		])
	.pipe( concat('script.min.js'))                            // Конкатенируем в один файл
	.pipe( uglify())                                         //Сжимаем JavaScript
	.pipe( dest('src/js'))                                 //Выгружаем готовый файл в папку назначения
	.pipe( browserSync.stream());                             // Триггерим Browsersync для обновления страницы
}

function styles() {
	return src('src/' + preprocessor + '/style.' + prExt + '')                           // Выбираем источник: "app/sass/main.sass" или "app/less/main.less"
	.pipe( eval(preprocessor)())                                                                // Преобразуем значение переменной "preprocessor" в функцию
	.pipe( concat('style.min.css'))                                                             // Конкатенируем в файл app.min.css
	.pipe( autopref({ overrideBrowserslist: ['last 10 versions'], grid: true }))                // Создадим префиксы с помощью Autoprefixer
	.pipe( cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } ))      // Минифицируем стили
	.pipe( dest('src/css/'))                                                                    // Выгрузим результат в папку "app/css/"
	.pipe( browserSync.stream());                                                               // Сделаем инъекцию в браузер
}

function startwatch(){
    watch(['src/**/*.js', '!src/**/*.min.js', '!src/js/**/test.js'], scripts);                    // Выбираем все файлы JS в проекте, а затем исключим с суффиксом .min.js    
    watch('src/' + preprocessor + '/**/*.' + prExt, styles);                // Мониторим стили
    watch('src/**/*.html').on('change', browserSync.reload);                // Мониторим файлы HTML на изменения
}

//Выгрузка файлов на OpenServer
function deploy() {
	return src([ // Выбираем нужные файлы		
		'src/css/**/*.css',
		'src/js/**/*.js',		
		'!src/js/**/test.js', //Кроме файла test.js
		'src/**/*.php',
		'src/**/*.html',
		] ,{ base: 'src' }) // Параметр "base" сохраняет структуру проекта при копировании
	.pipe(dest('D:/OpenServer/domains/192.168.0.9/food')); //Выгружаем в папку с финальной сборкой
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.deploy = deploy;
exports.jserver = jsonServ;
    
        // Экспортируем дефолтный таск с нужным набором функций
        //Дефолтный таск exports.default позволяет запускать проект одной командой gulp в терминале.
exports.default = parallel(styles, scripts, browsersync, startwatch, jsonServ);
