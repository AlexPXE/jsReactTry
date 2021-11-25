"use strict"
import  Timer  from "./timer.js";
import MenuCard from "./MenuCard.js";

window.addEventListener('DOMContentLoaded', (ev) => {	
	
	const tabItems = document.querySelector('.tabheader__items');	
	const items = document.querySelectorAll('.tabheader__item');
	const tabContent = document.querySelectorAll('.tabcontent');	
	const activeItem = 'tabheader__item_active';
	const contentShow = 'tabcontent_active';	

	const cash = (NodListFirst, NodeListSecond, firstClass, secondClass) => {				

		const cashList = new Map();

		NodListFirst.forEach( (element, index) => {       			//add elements to cashList 
			cashList.set(element, NodeListSecond[index]);			//(menu item is the key, tab content is the value)
		});
		return function (elem = NodListFirst[0]) {									
			if( cashList.has(elem)){ 								//check if the element is on the list 												
				for( let [key, value] of cashList){						
					if(key.classList.contains(firstClass)){			//if the element is active						
						key.classList.remove(firstClass);			//disable active element
						value.classList.remove(secondClass);		//and break;
						break;
					}
				}	
				elem.classList.add(firstClass);						//active the clicked element
				cashList.get(elem).classList.add(secondClass);
			}			
		};
	};		
	const switchTab = cash(items, tabContent, activeItem, contentShow);

	switchTab();

	let a, b;
	tabItems.addEventListener('click', (e) => {
		a = performance.now();
		e.target.classList.contains(activeItem) ||
		switchTab(e.target);
		b = performance.now();
		console.log(a-b);
	});

//Timer
	const days = document.getElementById('days'),
		hours = document.getElementById('hours'),
	   	minutes = document.getElementById('minutes'),
		seconds = document.getElementById('seconds');	
	
	function displayNullNumb(numb){
		return `${((numb < 10) && '0') || ""}${numb}`;
	}

	const timer = new Timer(new Date(2021, 9, 22, 0, 0, 0), () => {
		seconds.textContent = displayNullNumb(timer.seconds);
		minutes.textContent = displayNullNumb(timer.minutes);
		hours.textContent = displayNullNumb(timer.hours);
		days.textContent = displayNullNumb(timer.days);
	});	
	
	timer.startTimer();
	document.addEventListener("visibilitychange", () => { //if windo
		if(!document.hidden){			
			timer.startTimer();
		} else {
			timer.stopTimer();
		}
	});

//Modal
	const openBtn = document.querySelectorAll('[data-open]');
	const modal = document.querySelector('.modal');
	const modalClose = 'modal__close';
	const overlay = 'overlay';
	let opened = false;

	const open = () => {
		modal.style.display = 'block';
		setTimeout(() => modal.style.opacity = "1", 100);			
		document.body.style.overflow = "hidden";  //possibility of page-scroll is disabled		
		document.addEventListener('keyup', keyHandler);
		stop && clearInterval(stop);	
		if(!opened){
			opened = true;
		}		 
	};
	const close = () => {				
		modal.style.opacity = "";
		document.body.style.overflow = "";      //possibility of page-scroll is enabled
		setTimeout(() => modal.style.display = "", 800);		
		document.removeEventListener('keyup', keyHandler);						
	};	
	const keyHandler = (e) => {		
		if(e.code == 'Escape') {
			close();
		}
	};
	const stop = setTimeout(open, 10000);
	
	openBtn.forEach(value => value.addEventListener('click', open));		

	modal.addEventListener('click', (e) => {
		let target = e.target.classList;
		if(target.contains(modalClose) || target.contains(overlay)) {			
			close();
		}
	});	

	document.addEventListener('scroll', function handl() {
		let scroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;				
		if(~~document.documentElement.scrollTop == scroll) {					
			!opened && open();										
			document.removeEventListener('scroll', handl);		
		}
	});	

//Cards	
	const menuContainer = document.querySelector('.menu__field .container');
	menuContainer.innerHTML = "";

	async function getCards(url, selector){
		let res = await fetch(url);		
		
		if(res.ok){
			let data = await res.json();
			for (let val of data){
				new MenuCard(val).renderCard(selector);
			}		
		} else {
			throw new Error(`Fetch ${url} error, request status ${res.status}`);
		}
	}
	getCards('http://localhost:3000/menu', menuContainer);
	
//Forms
	const forms = document.querySelectorAll("form");	
	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Ура у нас заказ!',
		failure: 'Наверное кодер накасячил =/'
	};

	function formInputTogleVisibility(form) {
		const formElements = form.querySelectorAll('.form__element');		
		formElements.forEach( elem => {
			if(elem.classList.contains('invisible')){				
				elem.classList.remove('invisible');
			} else {
				elem.classList.add('invisible');
			}
		});
	}

	async function  postData(url, data){		
		const res = await fetch(url, {
			method: 'POST',
			headers: {'content-type':'application/json'},
			body: data
		});
		return await res.json();
	}

	function procForms(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();			
			let statusMessage = document.createElement('div');			
			let spinner = document.createElement('img');
			spinner.setAttribute('src', message.loading);
			statusMessage.append(spinner);	
			statusMessage.classList.add('status');			
			formInputTogleVisibility(form);
			form.append(statusMessage);		
			
			//fetch POST (json-server)======================================
			
			const fData = new FormData(form);	
			const json = JSON.stringify(Object.fromEntries(fData.entries()));	

			postData('http://localhost:3000/requests', json)
			.then(data => {
				console.log(data);					
				statusMessage.textContent = message.success;									
			})
			.catch(() => statusMessage.textContent = message.failure)
			.finally(() => {
				form.reset();	
				setTimeout(() => {		
					statusMessage.remove();
					formInputTogleVisibility(form);
					if(form.classList.contains('modal__form')) {							
						close();
					}						
				}, 3000);		
			});

		//XMLHttpRequest POST variant (openServer)=====================================================
			/*
			const req = new XMLHttpRequest();
			req.open('POST', 'server.php');

			//req.setRequestHeader('content-type', 'multipart/form-data'); //when using this line with XMLHttpRequest + FormData, OpenServer shows error
			req.setRequestHeader('content-type', 'application/json');

			const object = {};

			const fData = new FormData(form);			

			fData.forEach((value, key) => {
				object[key] = value;
			});

			const json = JSON.stringify(object);			
			
			req.send(json);

			req.addEventListener('load', (e) => {				
				if(req.status === 200) {
					console.log(req.response);					
					statusMessage.textContent = message.success;
					form.reset();										
				} else {
					statusMessage.textContent = message.failure;
				}
				setTimeout(() => {		
					statusMessage.remove();
					formInputTogleVisibility(form);
					if(form.classList.contains('modal__form')) {							
						close();
					}						
				}, 3000);
			});*/

		//fetch POST variant (openServer)=================================
			/*
			const object = {};

			const fData = new FormData(form);			

			fData.forEach((value, key) => {
				object[key] = value;
			});			

			fetch('server.php', {
				method: "POST",				
				headers: {'content-type': 'application/json'},
				body: JSON.stringify(object)
			})	
			.then(data => data.text())		
			.then(data => {
				console.log(data);					
				statusMessage.textContent = message.success;									
			})
			.catch(() => statusMessage.textContent = message.failure)
			.finally(() => {
				form.reset();	
				setTimeout(() => {		
					statusMessage.remove();
					formInputTogleVisibility(form);
					if(form.classList.contains('modal__form')) {							
						close();
					}						
				}, 3000);		
			});
			*/	

		});		
		
	}	
	forms.forEach( form => procForms(form));

//Slider
/*
	const slides = document.querySelectorAll('.offer__slide');
	const sliderCounter = document.querySelector('.offer__slider-counter');
	const toLeftSlide = document.querySelector('.offer__slider-prev');
	const toRightSlide = document.querySelector('.offer__slider-next');
	const currentSlide = document.getElementById('current');
	const totalSlids = document.getElementById('total');
	
	
	function togleSlide(elems, invisClass, rightElem, leftElem){						
		const cash = new Map([
			[rightElem, function(){				
				current = current < len - 1 ?  ++current : 0;				
			}],
			[leftElem, function(){
				current = current > 0 ?  --current : len - 1;				
			}]
		]);
		const len = elems.length;
		let current = 0;									
				
		for(let elem = 1; elem < len; elem++){      //hide all elements except first (index == 0)
			elems[elem].classList.add(invisClass);
			console.log(elem);			
		}

		return function(direction){

			if(len > 1 && cash.has(direction)){
				elems[current].classList.add(invisClass);
				cash.get(direction)();
				elems[current].classList.remove(invisClass);
			}
			return current + 1;	
		};
	}

	const sliderHandler = togleSlide(slides, 'invisible', toRightSlide, toLeftSlide );
	currentSlide.innerHTML = displayNullNumb(1);
	totalSlids.innerHTML = displayNullNumb(slides.length);

	sliderCounter.addEventListener('click', (e) => {						
		currentSlide.innerHTML = displayNullNumb( sliderHandler(e.target.closest('div')));
	});
	*/


	
	function letsSlide({ slidefield : field, leftArrow: left, rightArrow: right, currentSlInfo: current, totalSlInfo: total, transition: trans = 2, navigation = ''}) {

		const slider = Object.create(null);											//final object
		const error = () => new Error('Less than two slider items!');
		let bitch = new Event('bitch');

		if(field.length < 2){
			slider.manipulator = error;
			slider.resize = error;
		} else {
			field.prepend(field.lastElementChild.cloneNode(true)); 						//last slide clone to the begining field
			field.append(field.firstElementChild.nextElementSibling.cloneNode(true));   //first slide clone to the end field
			const items = field.querySelectorAll('div');		
			const quant = items.length;									//total slides quantity
			let scrollStep = 0;											//slide step, px		
			let currSlide = 1; 											//starting slide number				
			let busyFlag = true;										//false - when in the process of sliding			
			const rorl = new Map([										//elements (right, left) is the keys
				[left, function(){
					return --currSlide;
				}],
				[right, function(){
					return ++currSlide;
				}]
			]);					
			const transit = new Map([
				[0, quant - 2],
				[quant - 1, 1]
			]);			

			function zeroNumb(numb){														// '00'...'09' zero before digit
				return `${((numb < 10) && '0') || ""}${numb}`;
			}

			function displayCurrNamber(n){								
				current.textContent = zeroNumb(transit.get(n) ?? n);
			}		

			function moveSlideTo(n){							
				field.style.transform = `translateX(-${n * scrollStep}px)`;	
				return n;		
			}

			function sliderHandler(e){		
				if(transit.has(currSlide)){
					console.log(currSlide);
					field.style.transition = `${0}s transform`;				
					currSlide = moveSlideTo(transit.get(currSlide));
					console.log(currSlide);
					setTimeout(() => field.style.transition = `${trans}s transform`, 20);							
				}							
				busyFlag = true;
				field.dispatchEvent(bitch);			
			}		

			slider.resize = function() {											//method for calculation slide step, field width and items width
				scrollStep = parseInt( getComputedStyle(field.parentElement).width);
				field.style.width = `${100 * quant}%`;
				items.forEach(elem => elem.style.maxWidth = `${scrollStep}px`);
				moveSlideTo(currSlide);	
			};
			slider.manipulator = function(elem) {							
				if(rorl.has(elem) && busyFlag){				
					displayCurrNamber( moveSlideTo( rorl.get(elem)()));
					busyFlag = false;
				}				
			};

			if(navigation){
				const cashItems = new Map();				
				const nav = document.createElement('div');
				const navItem = document.createElement('div');
				
				nav.style.cssText = `display: flex; justify-content: space-between; width: ${(quant - 2) * 30}px; margin: 10px auto 0 auto;`;
				navItem.style.cssText = 'width: 10px; height: 10px; border-radius: 100%; background-color: #303030; transition: all .2s';

				for(let i = 1; i < quant - 1; i++){
					cashItems.set(navItem.cloneNode(true), i);					
				}		

				nav.append(...cashItems.keys());				

				document.querySelector('.' + navigation).append(nav);		

				nav.addEventListener('click', (e) => {
					if(cashItems.has(e.target)){
						for(let val of cashItems.keys()){
							val.style.boxShadow ='';
						}						
						currSlide = moveSlideTo(cashItems.get(e.target));
						displayCurrNamber(currSlide);
						e.target.style.boxShadow ='0px 0px 0px 5px rgba(0, 0, 255, .2)';
					}
				});
				
				field.addEventListener('bitch', () => {					
					for(let [key, val] of cashItems){
						if(val == currSlide){
							for(let val of cashItems.keys()){
								val.style.boxShadow ='';
							}						
							key.style.boxShadow ='0px 0px 0px 5px rgba(0, 0, 255, .2)';
						}
					}						
				});
			}

			field.style.display = 'flex';
			field.parentElement.style.overflow = 'hidden';  							//hide all slids except one
			slider.resize();
			displayCurrNamber( moveSlideTo(currSlide));		
			window.addEventListener('resize', (e) => slider.resize());					//calculate slids field size			
			field.addEventListener('transitionend', sliderHandler);
			setTimeout(() => field.style.transition = `${trans}s transform`, 20);							
			field.dispatchEvent(bitch);	

			return slider;
		}		
	}

	const sliderManipulators = document.querySelector('.offer__slider-counter');
	const slideOptions = {
		slidefield : document.querySelector('.slider-field'), 		
		leftArrow: document.querySelector('.offer__slider-prev'), 
		rightArrow: document.querySelector('.offer__slider-next'), 
		currentSlInfo: document.querySelector('#current'), 
		totalSlInfo: document.querySelector('#total'),	
		transition: 1,
		navigation: 'offer__slider'	
	};

	const slider = letsSlide(slideOptions);
	sliderManipulators.addEventListener('click', (e) => {
		slider.manipulator(e.target.closest('div'));	
	});	

	//calculator
	function calc(event = 'calc', wrapper = document.body) {		
		const calcEvent = new Event(event);
		const cashChooseItems = new Map();		
		const cashInputItems = new Map();

		function ChooseItem(elem, activeClass, value = 0, name = ''){
			this.element = elem;
			this.value = value;
			this.name = name;
			this.activate = function(){
				if(this.status()){					
					this.element.classList.add(activeClass);						
				}
			};
			this.deactivate = function(){
				if(!this.status()){
					this.element.classList.remove(activeClass);
				}
			};
			this.status = function(){
				return !this.element.classList.contains(activeClass);
			};		
		}
		function InputItem(elem, name = ''){			
			this.element = elem;
			this.name = name;
			this.status = function(){
				
				if(/^$|\D/i.test(this.element.value)){
					if(this.element.value.match(/^$|\D/i)[0]){
						this.element.style.boxShadow ='0px 0px 10px 10px rgba(255, 0, 0, .2)';
					}					
					return false;
				} else {
					this.element.style.boxShadow ='';
					return true;
				}
			};

			this.getValue = function(n = 4){
				if(this.status()){
					return +this.element.value.slice(0, n);
				} else {
					return 0;
				}				
			};			
			this.setValue = function(n){
				this.element.value = n;
			};			
		}
		
		wrapper.addEventListener('click', e => {						
			if(cashChooseItems.has(e.target)){									
				let item = cashChooseItems.get(e.target);				
				item.toggle();	
				wrapper.dispatchEvent(calcEvent);
			}
		});
		wrapper.addEventListener('input', e => {
			if(cashInputItems.has(e.target)){
				let item = cashInputItems.get(e.target);
				if(item.status()){
					localStorage.setItem(item.name, item.value);
					wrapper.dispatchEvent(calcEvent);					
				}				
			}
		});
		return function(type = 'choose'){
			const typeObj = {
				'choose': function choose(activeClass){	
					const active = {
						active: {},
						get value(){
							if(this.active.status()){
								return 0;
							}
							return this.active.value;
						}
					};
					function toggleActivation(){
						active.active.deactivate();
						localStorage.setItem(active.active.name, 'not active');
						active.active = this;
						localStorage.setItem(this.name, 'active');
						this.activate();	
						
					}					 
					return function select(selector = 'create'){
						if(selector === 'create'){														
							if(!Object.keys(active.active).length){  		//if no active element then will be activated first added element
								active.active = [...cashChooseItems.values()][cashChooseItems.size - 1];								
								active.active.activate();								
							}														
							return active;
						}
						let element = document.querySelector(selector);						

						return function val(value){							
							let newElement = new ChooseItem(element, activeClass, value, selector);							

							newElement.toggle = toggleActivation;	

							let localValue = localStorage.getItem(selector);
							if(localValue){
								if(localValue === 'active'){
									newElement.activate();
									active.active = newElement;
								}
							}
							cashChooseItems.set(element, newElement);
							return select;
						};
					};
				},
				'input': function input(selector = 'create'){	
					if(selector === 'create'){						
						return [...cashInputItems.values()];						
					}

					let element = document.querySelector(selector);
					let newElement = new InputItem(element, selector);					
					Object.defineProperty(newElement, 'value', {
						get: function(){
							return this.getValue();
						}});

					if(localStorage.getItem(newElement.name)){
						newElement.setValue(localStorage.getItem(selector));
					}
					cashInputItems.set(element, newElement);

					return input;
				}
			};	
			return typeObj[type];
		};
	}
	function calculate(sex, activity, height, weight, age){	
		if(!(sex && activity && weight && height && age)){
			return 0;
		}
		let result = sex.r + (sex.w * weight) + (sex.h * height) - (sex.a * age);
		return ~~((result * activity)*100) / 100;
	}
	const maleRaito = {
		h: 4.8,
		w: 13.4,
		a: 5.7,
		r: 88.36,
	};
	const femaleRaito = {
		h: 3.1,
		w: 9.2,
		a: 4.3,
		r: 447.6,
	};
	
	const resultElem = document.querySelector('.calculating__result').firstElementChild;
	const calcField = document.querySelector('.calculating__field');
	const creator = calc('kyky', calcField);
	


	const sex = creator('choose')
	('calculating__choose-item_active')
	('#male')(maleRaito)
	('#female')(femaleRaito)
	('create');

	const activity = creator('choose')
	('calculating__choose-item_active')
	('#high')(1.725)		
	('#medium')(1.55)	
	('#small')(1.375)
	('#low')(1.2)
	('create');

	function calcHandler(){
		resultElem.textContent = calculate(sex.value, activity.value, height.value, weight.value, age.value);
	}

	const [height, weight, age] = creator('input')('#height')('#weight')('#age')('create');

	calcHandler();
	calcField.addEventListener('kyky', calcHandler);	
	
});

