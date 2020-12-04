//Array
const array = [];
for (let index = 0; index < 500; index++) {
    array.push(index);
}

//Listando sin evitar Reflow 
console.time();
const reflow = document.getElementById('reflow');
array.forEach( data => {
    const li = document.createElement('li');
    li.textContent = data;
    reflow.appendChild(li);
});
console.timeEnd();

//Evitando un poco el Reflow
console.time();
const noReflowMedio = document.getElementById('noReflowMedio');
const fragment = document.createDocumentFragment();
array.forEach( data =>  {
    const li = document.createElement('li');
    li.textContent = data;
    fragment.appendChild(li);
});
noReflowMedio.appendChild(fragment);
console.timeEnd();

//Evitando Reflow
console.time();
const noReflow = document.getElementById('noReflow');
const template = document.querySelector('.template').content;
const fragment2 = document.createDocumentFragment();
array.forEach( data => {
    template.querySelector('li').textContent = data;
    const clone = template.cloneNode(true);
    fragment2.appendChild(clone);
});
noReflow.appendChild(fragment2);
console.timeEnd();
