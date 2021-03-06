
const nextBtn = document.querySelectorAll('.next');
const formBlock = document.querySelectorAll('.shipping');
const wrapper = document.querySelector('.form__wrapper');
const inner = document.querySelector('.slides__inner');
const stepElem = document.querySelectorAll('.main__step');

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
        setTimeout(()=>{
            formBlock[i].classList.add('hidden');
        }, 300)
        inner.style.transform = `translateX(-${offset}px)`;
        console.log(offset);
    });
});

    stepElem.forEach((el, i) => {
        el.addEventListener('click', (ev) => {
            const slideTo = ev.target.getAttribute('data-slide-to');
            console.log(formBlock[slideTo+1]);
            offset = +width.slice(0, width.length - 2) * (slideTo);
            formBlock[slideTo].classList.remove('hidden');
            setTimeout(() => {
                formBlock[slideTo - 1].classList.add('hidden');
            }, 300);
            console.log(offset);
            inner.style.transform = `translateX(-${offset}px)`;
        });
    });


//countries
const phone = document.querySelectorAll('.phone');
const countryShipping = document.querySelector('#shopping_country');
const cardNumber = document.querySelector('#payment_card');
const cardDate = document.querySelector('#payment_date');
const cardCode = document.querySelector('#payment_code');

new IMask (cardNumber, {
    mask: `0000 0000 0000 0000`,
});
new IMask (cardDate, {
    mask: `00/00`,
});
new IMask (cardCode, {
    mask: `0000`,
});

    phone.forEach(el => {
        new IMask(el, {
            mask: `+{38}(000)000-00-00`,
        });
        el.setAttribute('placeholder', `+38`);
        el.value = `+38`;
    });

//posting

const form = document.querySelector('#form');
bindpostData(form);

const postData = async (url, data) => {
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: data
    });

    return await result.json();
}

function bindpostData (form) {
    form.addEventListener('submit', (e) => {

        const formData = new FormData(form);

        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('https://jsonplaceholder.typicode.com/posts', json)
            .then((response) => {
                console.log(response);
            })
            .catch(() => {
            });
    });
}

//edit
const editStart = document.querySelector('.order__edit');
const deleteElem = document.querySelectorAll('.order__delete');
const orderItem = document.querySelectorAll('.order__item');
const orderParent = document.querySelector('.order');
const itemPrice = document.querySelectorAll('.order__item-price');
let totalPrice = document.querySelector('.order__total-price');
let totalTaxes = document.querySelector('.order__total-taxes');
const totalSum = document.querySelector('.order__total-sum');

const toggleEditMode = () => {
    deleteElem.forEach(el => {
        el.classList.toggle('no-display');
    });
    if (editStart.textContent === 'edit order'){
        editStart.textContent = 'Save';
    } else {
        editStart.textContent = 'edit order';
    }
    editStart.addEventListener('click', toggleEditMode);
};

let totalPriceValue = totalPrice.textContent.slice(1, totalPrice.textContent.length);
let totalTaxesValue = totalTaxes.textContent.slice(1, totalTaxes.textContent.length);

const deleteElement = (i) => {
    orderParent.removeChild(orderItem[i]);
    let price = itemPrice[i].textContent;
    price = price.slice(1, price.length);
    console.log(price);
    totalPriceValue = Math.round(totalPriceValue - price);
    totalTaxesValue = Math.round(totalTaxesValue - 4.04);
    totalPrice.textContent = '$' + totalPriceValue;
    totalTaxes.textContent = '$' + totalTaxesValue;
    totalSum.textContent = '$' + +(totalPriceValue + totalTaxesValue);
}

editStart.addEventListener('click', toggleEditMode);
deleteElem.forEach((el, i) => {
    el.addEventListener('click', () => {
        deleteElement(i);
    });
});

//autofill

const sameAsShippingBtn = document.querySelector('.form__heading-button');
sameAsShippingBtn.addEventListener('click', () => {
    document.querySelector('#billing_name').value = document.querySelector('#shipping-name').value;
    document.querySelector('#billing_country').value = document.querySelector('#shopping_country').value;
    document.querySelector('#billing-zip').value = document.querySelector('#shipping-zip').value;
    document.querySelector('#billing_ad_address').value = document.querySelector('#shipping_ad_address').value;
    document.querySelector('#billing_address').value = document.querySelector('#shipping_address').value;
    document.querySelector('#billing_city').value = document.querySelector('#shopping_city').value;
});

const billEmail = document.querySelector('#bill-email');
billEmail.textContent = document.querySelector('#billing_email').value;
//



