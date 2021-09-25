"use strict"
const tabcont = document.querySelector('.tabcontainer');

tabcont.addEventListener('click', (e) => {    
    e.target.classList.contains("tabheader__item") &&  console.log("ОНО!");

    console.log("ура оно работает!!");
});