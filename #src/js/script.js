const nextBtn = document.querySelectorAll('.next');
const formBlock = document.querySelectorAll('.shipping');
const wrapper = document.querySelector('.form__wrapper');
const inner = document.querySelector('.slides__inner');

const width = window.getComputedStyle(inner).width;

let offset = 0;

inner.style.width = 100 * formBlock.length + '%';
inner.style.transition = '0.5s all';
inner.style.display = 'flex';

wrapper.style.overflow = 'hidden';
formBlock.forEach(el => {
    el.style.width = width;
});

nextBtn.forEach((el, i) => {
    el.addEventListener('click', ()=> {
        if (offset === +width.slice(0, width.length - 2) * (formBlock.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }
        formBlock[i+1].classList.remove('hidden');
        inner.style.transform = `translateX(-${offset}px)`;
    });
});
