//calculator
function calulator(){
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
    
                if(/^\d{1,4}(\.?|\.\d{1,4})$/.test(this.element.value)){
                    this.element.style.boxShadow ='';
                    return true;					
                }else{
                    if(/\D/i.test(this.element.value)){
                        this.element.style.boxShadow ='0px 0px 10px 10px rgba(255, 0, 0, .2)';
                    }
                    return false;
                }
            };
    
            this.getValue = function(){
                if(this.status()){
                    return +this.element.value;
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

}


export default calulator;