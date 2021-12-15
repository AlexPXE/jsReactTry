//Modal

function modal() {
    const openBtn = document.querySelectorAll('[data-open]');
    const modal = document.querySelector('.modal');
    const modalClose = 'modal__close';
    const overlay = 'overlay';
    let opened = false;

    const open = () => {
        modal.style.display = 'block';
        setTimeout(() => modal.style.opacity = "1", 100);
        document.body.style.overflow = "hidden"; //possibility of page-scroll is disabled		
        document.addEventListener('keyup', keyHandler);
        stop && clearInterval(stop);
        if (!opened) {
            opened = true;
        }
    };
    const closeMod = () => {
        modal.style.opacity = "";
        document.body.style.overflow = ""; //possibility of page-scroll is enabled
        setTimeout(() => modal.style.display = "", 800);
        document.removeEventListener('keyup', keyHandler);
    };
    const keyHandler = (e) => {
        if (e.code == 'Escape') {
            closeMod();
        }
    };
    const stop = setTimeout(open, 10000);

    openBtn.forEach(value => value.addEventListener('click', open));

    modal.addEventListener('click', (e) => {
        let target = e.target.classList;
        if (target.contains(modalClose) || target.contains(overlay)) {
            closeMod();
        }
    });

    document.addEventListener('scroll', function handl() {
        let scroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (~~document.documentElement.scrollTop == scroll) {
            !opened && open();
            document.removeEventListener('scroll', handl);
        }
    }); 
    
    const forms = document.querySelectorAll("form");
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Ура у нас заказ!',
        failure: 'Наверное кодер накасячил =/'
    };    

    function formInputTogleVisibility(form) {
        const formElements = form.querySelectorAll('.form__element');
        formElements.forEach(elem => {
            if (elem.classList.contains('invisible')) {
                elem.classList.remove('invisible');
            } else {
                elem.classList.add('invisible');
            }
        });
    }

    async function postData(url, data) {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
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
                        if (form.classList.contains('modal__form')) {
                            closeMod();
                        }
                    }, 3000);
                });

        });

    }
    forms.forEach(form => procForms(form));
}

export default modal;
