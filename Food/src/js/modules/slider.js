
//Slider
function slider(){
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
}
	
export default slider;