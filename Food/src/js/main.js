"use strict"
window.addEventListener('DOMContentLoaded', (ev) => {
	
	const tabItems = document.querySelector('.tabheader__items');	
	const items = document.querySelectorAll('.tabheader__item');
	const tabContent = document.querySelectorAll('.tabcontent');	
	const activeItem = 'tabheader__item_active';
	const contentShow = 'tabcontent_active';	

	const cash = (NodListFirst, NodeListSecond, firstClass, secondClass) => {				

		const cashList = new Map();

		NodListFirst.forEach( (element, index) => {       	//add elements to cashList 
			cashList.set(element, NodeListSecond[index]);		//(menu item is the key, tab content is the value)
		});

		return function (elem = NodListFirst[0]) {									
			if( cashList.has(elem)){ 				//check if the element is on the list 								
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
		b=performance.now();
		console.log(a-b);
	});
	
	
	/*
	// EASY
	const tabItems = document.querySelector('.tabheader__items');	
	const tabContent = document.querySelectorAll('.tabcontent');	
	const activeItem = 'tabheader__item_active';
	const contentShow = 'tabcontent_active';
	const items = document.querySelectorAll('.tabheader__item');

	function hideItems (items, nameClass) {

		items.forEach(elem => {
			elem.classList.contains(nameClass) &&
			elem.classList.remove(nameClass);
		});
	}
	
	function switchItem(ind, items, nameClass) {
		
		hideItems(items, nameClass);
		items[ind].classList.add(nameClass);
	}

	switchItem(0, items, activeItem);
	switchItem(0, tabContent, contentShow);	

	
	tabItems.addEventListener('click', (e) => {
	
		let elem = e.target;	

		elem.classList.contains(activeItem) || items.forEach((val, ind) => {
			
			if(elem == val){
				switchItem(ind, items, activeItem);
				switchItem(ind, tabContent, contentShow);	
			}			
		});	
		console.log(a-b);
	});
	*/
	
	
	/*
	//UGLY
	const tabItem ='tabheader__item';
	const tabcontentActive = 'tabcontent_active';

	const tabItemActive = "tabheader__item_active";
	const tabheader = document.querySelector('.tabheader');
	const tabItems = [...document.querySelectorAll('.tabheader__item')];
	const tabcontent = [...document.querySelectorAll('.tabcontent')];
	const tabcontainer = document.querySelector('.tabcontainer');


	tabheader.addEventListener('click', (e) => {		
		
		let ind = tabItems.indexOf(e.target); // if item not found == -1
		if (~ind) { // if != -1 then item found
			tabItems[ind].classList.contains(tabItemActive) || (
				tabheader.querySelector('.' + tabItemActive).classList.remove(tabItemActive),
				tabItems[ind].classList.add(tabItemActive),
				tabcontainer.querySelector('.' + tabcontentActive).classList.remove(tabcontentActive),
				tabcontent[ind].classList.add(tabcontentActive)
			);
		}
	});
	
	*/
});



/*
//source
window.addEventListener('DOMContentLoaded', function() {

    // Tabs
    
	let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

	
	tabsParent.addEventListener('click', function(event) {
	
		const target = event.target;
		if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}	
	});
	
});
*/