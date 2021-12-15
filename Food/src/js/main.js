"use strict"
import '../sass/style.scss';
import tabs  from './modules/tabs';
import modal from './modules/modal';
import timermod from './modules/timermod';
import cards from './modules/cards';
import calculator from './modules/calculator';
import slider from'./modules/slider';


window.addEventListener('DOMContentLoaded', (ev) => {
    tabs();
    modal();    
    timermod();
    cards();
    calculator();    
    slider();
});



function* func(){
    for(let i = 0; i < 3; i++){
        yield i;
    }
}
    
const f = func();

console.log(f.next().value);
console.log(f.next().value);
console.log(f.next().value);
console.log(f.next().value);
