export default class MenuCard {
    constructor ({img, altimg, title, descr, price}, ...cl) {//src, alt, subtitle, descr, price, ...classes
        this.src = img;
        this.alt = altimg;
        this.subtitle = title;
        this.descr = descr;
        this.currency = 27;
        this.price = this.convert(price);
        this.classes = (cl.length > 0 && cl) || ["menu__item"];
     
    }
    convert(price) {
        return price * this.currency;
    }
    renderCard(selector) {        
        const card = document.createElement('div');

        this.classes.forEach(cl => card.classList.add(cl));
        
        card.innerHTML = `
                          <img src=${this.src} alt=${this.alt}>
                          <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                          <div class="menu__item-descr">${this.descr}</div>
                          <div class="menu__item-divider"></div>
                          <div class="menu__item-price">
                              <div class="menu__item-cost">Цена:</div>
                              <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                          </div>`;  
        selector.append(card);
    }
}