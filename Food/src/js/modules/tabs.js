function tabs() {
    const tabItems = document.querySelector('.tabheader__items');
    const items = document.querySelectorAll('.tabheader__item');
    const tabContent = document.querySelectorAll('.tabcontent');
    const activeItem = 'tabheader__item_active';
    const contentShow = 'tabcontent_active';

    const cash = (NodListFirst, NodeListSecond, firstClass, secondClass) => {

        const cashList = new Map();

        NodListFirst.forEach((element, index) => { //add elements to cashList 
            cashList.set(element, NodeListSecond[index]); //(menu item is the key, tab content is the value)
        });
        return function (elem = NodListFirst[0]) {
            if (cashList.has(elem)) { //check if the element is on the list 												
                for (let [key, value] of cashList) {
                    if (key.classList.contains(firstClass)) { //if the element is active						
                        key.classList.remove(firstClass); //disable active element
                        value.classList.remove(secondClass); //and break;
                        break;
                    }
                }
                elem.classList.add(firstClass); //active the clicked element
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
        console.log(a - b);
    });
}

export default tabs;