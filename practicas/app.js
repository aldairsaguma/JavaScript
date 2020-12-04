const selector = document.querySelector('.uno');
selector.textContent = 'Js';

//innerHTML permite agregar etiquetas y texto
selector.innerHTML = '<b>Inner HTML</b>';

//ClassList
selector.classList.add('add');

/** Reflow genera lentitud ya que dibuja por ciclo de nuevo todo **/

//createElement (Genera Reflow) and appendChild
const lista = document.querySelector('.lista');

const arrayLi = [
    'Primer',
    'Segundo',
    'Tercero'
];

arrayLi.forEach( res  => {
    const li = document.createElement('li');
    li.textContent=res;
    lista.appendChild(li);
});

//innerHTML -> Genera Reflow
console.time();
const lista2 = document.querySelector('.lista-2');
const arrayLi2 = [
    'aldair',
    'anderson',
    'emerson'
];

arrayLi2.forEach( data => {
    lista2.innerHTML += `<li>${data}</li>`;
    
});
console.timeEnd();

//Fragment 
//Lo que hace es que en vez de ir pintando una etiqueta por etiqueta 
// guarda todas las etiquetas y una vez que acaba recien pinta todo
console.time();
const noReflow = [
    'noReflow1',
    'noReflow2',
    'noReflow3'
]
const reflow = document.querySelector('.no-reflow');

//Opción 1
const fragment = document.createDocumentFragment();
//Opción 2
// const fragment = new DocumentFragment();
noReflow.forEach( data =>  {
    //No se puede usar innerHTML ya que fragment no lo acepta
    const li = document.createElement('li');
    li.textContent = data;
    fragment.appendChild(li);
}); 
reflow.appendChild(fragment);
console.timeEnd();

//insertBefore lista descendente

const arrayAscendente = [
    'ascendente1',
    'ascendente2',
    'ascendente3'
]
const ascendente = document.querySelector('.ascendente');

const fragmentAscendente = document.createDocumentFragment();
arrayAscendente.forEach( data =>  {
    //No se puede usar innerHTML
    const li = document.createElement('li');
    li.textContent = data;

    //insertBefore
    const childNode = fragmentAscendente.firstChild;
    fragmentAscendente.insertBefore(li,childNode);
}); 
ascendente.appendChild(fragmentAscendente);

//Template
console.time();
const template = document.querySelector('.template');
const template_li = document.querySelector('.template-li').content;
const arrayTemplate = [ 'Template1', 'Template2', 'Template3'];
const fragmentTemplate = document.createDocumentFragment();
arrayTemplate.forEach(data =>  {
    //Agregamos la data
    template_li.querySelector('.li-li .b-b').textContent = data;
    //Creamos un clon de template ya que no se puede agregar de frente
    const clone = template_li.cloneNode(true);
    fragmentTemplate.appendChild(clone);
});
template.appendChild(fragmentTemplate)
console.timeEnd();