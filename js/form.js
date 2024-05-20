'use strict';

const labelAll = document.querySelectorAll('label');

const labelVal = [];

labelAll.forEach(elem => {
    labelVal.push(elem.innerText);
});

const showError = (label, textError) => {
    label.innerText = textError;
    label.classList.add('alert', 'alert-danger');
}

const getDataFromSrv = async dataFromForm => {

    const urlRestApi = 'http://localhost:8888/validate';
    const method = 'post';
    const dataToSend = dataFromForm;
    const headers = {
        'Content-Type': 'application/json'
    }

    try {

        const response = await fetch(urlRestApi, {
            method,
            body: JSON.stringify(dataToSend),
            headers
        });

        const dataFromSrv = await response.json();

        return dataFromSrv;

    } catch(err) {
        console.error(err);
    }

}



const form = document.querySelector('form');

form.addEventListener('submit', (e) => {

    e.preventDefault();

    getDataFromSrv({
        "mail": '',
        "subject": '',
        "message": ''
    }).then(data => {
        console.log(data);
    });

});