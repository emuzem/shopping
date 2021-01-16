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
        el.style.cssText = `animation: rotation 0.3s`;
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

const deleteElement = (i, number) => {
    i.parentElement.parentElement.style.cssText = `animation: fade 0.5s`;
    setTimeout(() => {
        i.parentElement.parentElement.remove();
    }, 500);
    let price = itemPrice[number].textContent;
    price = price.slice(1, price.length);
    totalPriceValue = Math.round(totalPriceValue - price);
    totalTaxesValue = Math.round(totalTaxesValue - 4.04);
    totalPrice.textContent = '$' + totalPriceValue;
    totalTaxes.textContent = '$' + totalTaxesValue;
    totalSum.textContent = '$' + +(totalPriceValue + totalTaxesValue);
}

editStart.addEventListener('click', toggleEditMode);
deleteElem.forEach((el, i) => {
    el.addEventListener('click', () => {
        deleteElement(el, i);
    });
});


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

const confirmationWindow = document.querySelector('.confirmation');
const rejectConfirmation = document.querySelector('.confirmation__no');
const acceptConfirmation = document.querySelector('.confirmation__yes');
const closeConfirmation = document.querySelector('.confirmation__close');

const closeConfirmationWindow = () => {
    confirmationWindow.style.cssText = `animation: fade 0.5s`;
    setTimeout(() => {
        confirmationWindow.style.display = 'none';
    },400);
};

closeConfirmation.addEventListener('click', () => {
    closeConfirmationWindow();
});

rejectConfirmation.addEventListener('click', () => {
    closeConfirmationWindow();
});

acceptConfirmation.addEventListener('click', () => {
    closeConfirmationWindow();
    fetch("https://api.ipdata.co?api-key=test").then((response) => {
        response.json().then((res) => {
            console.log(res);
            document.querySelector('#shopping_country').value = res.country_name;
            phone.forEach(el => {
                new IMask(el, {
                    mask: `+{${res.calling_code}}(00)000-00-00`,
                });
            });
            document.querySelector('#shopping_city').value = res.city;
            document.querySelector('#shipping-zip').value = res.postal;
        });
    });
});

nextBtn.forEach((el, i) => {
    el.addEventListener('click', (ev)=> {
        ev.preventDefault();
        let validity = true;
        const inputSection = document.querySelectorAll('.shipping__form');
            const inputs = inputSection[i].querySelectorAll('.input');
            inputs.forEach((inp) => {
                        if (inp.checkValidity() === false){
                            validity = false;
                        }
            });
        if (validity) {
            if (ev.target === nextBtn[2]){
                const form = document.querySelector('#form');
                bindpostData(form);
            }
            if (offset === +width.slice(0, width.length - 2) * (formBlock.length - 1)) {
                offset = 0;
            } else {
                offset += +width.slice(0, width.length - 2);
            }
            formBlock[i + 1].classList.remove('hidden');
            setTimeout(() => {
                formBlock[i].classList.add('hidden');
            }, 300)
            inner.style.transform = `translateX(-${offset}px)`;
        } else {
            const notAllowedMessage = document.createElement('div');
            notAllowedMessage.style.color = 'red';
            notAllowedMessage.textContent = 'Please, fill in all the fields!';
            el.parentElement.appendChild(notAllowedMessage);
            setTimeout(() => {
                el.parentElement.removeChild(notAllowedMessage);
            }, 1500);
        }
    });
});

    stepElem.forEach((el, i) => {
        el.addEventListener('click', (ev) => {
            const slideTo = ev.target.getAttribute('data-slide-to');
            const wrapSection = document.querySelectorAll('.shipping');
            // wrapSection[slideTo-1].querySelector('.main__step').classList.contains('text-active'))
            if (el.parentElement.querySelectorAll('.main__step')[slideTo].classList.contains('text-active')) {
                offset = +width.slice(0, width.length - 2) * (slideTo);
                formBlock[slideTo].classList.remove('hidden');
                setTimeout(() => {
                    formBlock[slideTo - 1].classList.add('hidden');
                }, 300);
                inner.style.transform = `translateX(-${offset}px)`;
            }
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
    mask: `000`,
});

//posting

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
    //form.addEventListener('submit', (e) => {
       // e.preventDefault();

        const formData = new FormData(form);

        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('https://jsonplaceholder.typicode.com/posts', json)
            .then((response) => {
                console.log(response);
                editStart.style.visibility = 'hidden';
                window.scrollTo(0, 0);
                document.querySelectorAll('.shipping')[2].style.display = 'none';
                const bill = document.createElement('div');
                bill.innerHTML = `<div class="bill">
    <h1 class="form__heading">Thank you for your order!</h1>
    <p><b>Order number is: 172837837128</b></p>
    <p>You will receive an email confirmation shortly to <a href="#"><span id="bill-email">${response.billing_email}</span></a></p>
    <p>Estimated delivery day is <br><b>Friday 1st April 2016</b></p>
    <button><a href="#">print recipe</a></button>
</div>`;
                const content = document.querySelector('.main__content');
            content.appendChild(bill);
            })
            .catch(() => {
            });
   // });
}

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

// const getResources = async (url) => {
//     const result = await fetch(url);
//
//     if(!result.ok){
//         throw new Error(`Could not fetch ${url}, status: ${result.status}`);
//     }
//
//     return await result.json();
// }
//
// getResources('https://api.ipdata.co?api-key=test')
//     .then(data => {
//             console.log(data);
//     }).catch();

// const request = new XMLHttpRequest();
//
// request.open('GET', 'https://api.ipdata.co/?api-key=test');
//
// request.setRequestHeader('Accept', 'application/json');
//
// request.onreadystatechange = function () {
//     if (this.readyState === 4) {
//         console.log(this.responseText);
//     }
//     else {
//         console.log('error');
//     }
// };
// request.send();


