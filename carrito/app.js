const cards = document.getElementById('cards');
const items = document.getElementById('items');
const footer = document.getElementById('footer');
const templateCard = document.getElementById('template-card').content;
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
const fragment = document.createDocumentFragment();
let carrito = {};


document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    if(localStorage.getItem('carrito')){
        //Recuperando de texto plano a JSON
        carrito = JSON.parse(localStorage.getItem('carrito'));
        pintarCarrito();
    }
});

cards.addEventListener('click', e => {
    addCarrito(e);
});

items.addEventListener('click', (e) => {
    btnAction(e);
});




const fetchData = async () => {
    try {
        const res = await fetch('api.json');
        const data = await res.json();
        pintarCard(data);
    } catch (error) {
        console.log(error)
    }
}

const pintarCard = data => {
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.title;
        templateCard.querySelector('p').textContent = producto.precio;
        templateCard.querySelector('img').setAttribute('src',producto.thumbnailUrl);
        //Crea una propiedada data-id
        templateCard.querySelector('.btn').dataset.id= producto.id;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    });
    cards.appendChild(fragment);
}

const addCarrito = e => {
    if(e.target.classList.contains('btn-dark')){
        setCarrito(e.target.parentElement);
    }
    e.stopPropagation();
}

const setCarrito = obj => {
    const producto = {
        id : obj.querySelector('.btn-dark').dataset.id,
        title : obj.querySelector('h5').textContent,
        precio : obj.querySelector('p').textContent,
        cantidad : 1
    }
    //Pregunta si existe el id - si existe ya no lo pinta, solo aumenta cantidad
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1;
    }
    carrito[producto.id] = {...producto};
    pintarCarrito();
}

const pintarCarrito = () => {
    items.innerHTML = '';
    //Objeto to Array
    Object.values(carrito).forEach( producto => {
        templateCarrito.querySelector('th').textContent = producto.id;
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title;
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad;
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id;
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id;
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio;

        const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone)

    });

    items.appendChild(fragment);

    pintarFooter();
    //Guardando en localStorage
    localStorage.setItem('carrito',JSON.stringify(carrito));
}

const pintarFooter = () => {
    footer.innerHTML = '';

    //Si no hay elementos pinta 
    if (Object.keys(carrito).length === 0) {
        return footer.innerHTML = `<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`;
    }
    // ,0 -> indica que quieres devolver un numero - acumulador + ese mas pasa a ser un igual algo asi
    const nCantidad = Object.values(carrito).reduce( ( acumulador, {cantidad} ) => acumulador + cantidad ,0);
    const nPrecio = Object.values(carrito).reduce( ( acumulador, {cantidad, precio} ) => acumulador + cantidad * precio ,0);
    templateFooter.querySelectorAll('td')[0].textContent = nCantidad;
    templateFooter.querySelector('span').textContent = nPrecio;
    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone);
    footer.appendChild(fragment);

    //Vaciar carrito
    const vaciarCarrito = document.getElementById('vaciar-carrito');
    vaciarCarrito.addEventListener('click', () => {
        carrito = {}
        pintarCarrito();
    });

}

const btnAction = (e) => {
    //Acción de aumentar
    if(e.target.classList.contains('btn-info')){
        const producto = carrito[e.target.dataset.id];
        console.log(producto);
        producto.cantidad = carrito[e.target.dataset.id].cantidad + 1;
        // producto.cantidad++;
        carrito[e.target.dataset.id] = {...producto};
        pintarCarrito();
    }
    if(e.target.classList.contains('btn-danger')){
        const producto = carrito[e.target.dataset.id];
        producto.cantidad = carrito[e.target.dataset.id].cantidad - 1;
        if(producto.cantidad === 0){
            //delete elimina objetos
            delete carrito[e.target.dataset.id];
        }
        pintarCarrito();
    }
    e.stopPropagation();
}