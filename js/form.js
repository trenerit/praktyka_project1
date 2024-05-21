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

const validateData = (e) => {
    
    e.preventDefault();

    const resPlace = document.querySelector('#resultPlace');
    resPlace.innerText = '';
    resPlace.classList.remove('alert', 'alert-success');

    labelAll.forEach((elem, i) => {

        // console.log(elem, i);
        elem.classList.remove('alert', 'alert-danger');
        elem.innerText = labelVal[i];

    });

    const mail = document.querySelector('#mail').value;
    const subject = document.querySelector('#title').value;
    const message = document.querySelector('#message').value;

    const dataFromSrv = {
        mail,
        subject,
        message
    }

    getDataFromSrv(dataFromSrv)
    .then(res => {
        console.log(res);

        if('send' in res) {
            
            resPlace.innerText = res.send;
            resPlace.classList.add('alert', 'alert-success');
            document.querySelectorAll('input:not(input[type="submit"]), textarea').forEach(elem => {
                elem.value = '';
            });

        } else {
            
            if('email' in res) {
                showError(labelAll[0], res.email);
            }
            
            if('subject' in res) {
                showError(labelAll[1], res.subject);
            }
            
            if('message' in res) {
                showError(labelAll[2], res.message);
            }
        }
    });
}

const form = document.querySelector('form');

form.addEventListener('submit', validateData);