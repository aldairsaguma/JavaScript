// const incrementar = document.getElementById('incrementar');
// const decrementar = document.getElementById('decrementar');
// const numero = document.getElementById('numero');
// let initialState = 0;
// incrementar.addEventListener('click', (e) => {
//     initialState++;
//     numero.textContent = initialState;
// });


// decrementar.addEventListener('click', (e) => {
//     initialState--;
//     numero.textContent = initialState;
// });


//Delegar eventos

const container = document.getElementById('container');
const numero = document.getElementById('numero');
let initialState = 0;
container.addEventListener('click', (e) => {
    if(e.target.classList.contains('incrementar')) {
        initialState ++;
        numero.textContent = initialState;
    }
    if(e.target.classList.contains('decrementar')) {
        initialState --;
        numero.textContent = initialState;
    }
    e.stopPropagation();
});

document.body.addEventListener('click', () => {
    console.log('click');
});