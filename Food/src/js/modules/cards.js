
import MenuCard from "./MenuCard";

//Cards	
function cards() {
    const menuContainer = document.querySelector('.menu__field .container');
    menuContainer.innerHTML = "";

    async function getCards(url, selector) {
        let res = await fetch(url);

        if (res.ok) {
            let data = await res.json();
            for (let val of data) {
                new MenuCard(val).renderCard(selector);
            }
        } else {
            throw new Error(`Fetch ${url} error, request status ${res.status}`);
        }
    }
    getCards('http://localhost:3000/menu', menuContainer);
}

export default cards;
