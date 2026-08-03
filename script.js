document.addEventListener('DOMContentLoaded', function(){
    let mainH1 = document.querySelector('h1');
    if(mainH1){
        mainH1.addEventListener('click', ()=> {
            document.body.style.background = 'blue';
        });
    }
/* ===================================
   SCRIPT GENERAL - ÓPTICA CAMIL
=================================== */


/* ===================================
   BOTÓN SUBIR AL INICIO
=================================== */

let btnArriba = document.getElementById("btnArriba");
if(btnArriba){
    window.onscroll = function(){
        if(document.documentElement.scrollTop > 300){
            btnArriba.style.display = "block";
        }else{
            btnArriba.style.display = "none";
        }
    };

    btnArriba.addEventListener("click", function(){
        window.scrollTo({ top:0, behavior:"smooth" });
    });
}



/* ===================================
   BOTONES DE PRODUCTOS
=================================== */


let botonesProducto = document.querySelectorAll(".btnInfo");

botonesProducto.forEach(function(boton){
    boton.addEventListener("click",function(e){
        // If the button is inside a link to a detail page, allow navigation (no alert)
        if(this.closest('a')){
            return; // navigation will occur via anchor href
        }

        alert(
            "Gracias por tu interés.\n\n" +
            "Puedes visitarnos en nuestra óptica para conocer más modelos disponibles."
        );

    });

});



/* ===================================
   FORMULARIO DE CONTACTO
=================================== */


let formulario = document.querySelector("form");
if(formulario){
    formulario.addEventListener("submit",function(event){
        event.preventDefault();
        let nombre = formulario.querySelector("input[type='text']").value;
        alert(
            "Gracias " + nombre +
            ".\n\nTu mensaje fue recibido correctamente.\n" +
            "Nos comunicaremos contigo pronto."
        );
        formulario.reset();
    });
}



/* ===================================
   ANIMACIÓN AL HACER SCROLL
=================================== */


const elementos = document.querySelectorAll(
".producto, .promo, .imagen, .nosotros"
);


function mostrarElementos(){


    elementos.forEach(function(elemento){


        let posicion = elemento.getBoundingClientRect().top;


        let alturaPantalla = window.innerHeight;


        if(posicion < alturaPantalla - 100){


            elemento.style.opacity="1";

            elemento.style.transform="translateY(0)";


        }


    });


}



window.addEventListener(
"scroll",
mostrarElementos
);



/* ESTILO INICIAL PARA ANIMACIÓN */

elementos.forEach(function(elemento){

    elemento.style.opacity="0";

    elemento.style.transform="translateY(40px)";

    elemento.style.transition="all .6s ease";

});



/* ===================================
   MENÚ DESPLEGABLE EN CELULAR
=================================== */


let desplegables = document.querySelectorAll(".dropdown > a");


desplegables.forEach(function(menu){


    menu.addEventListener("click",function(e){


        if(window.innerWidth <= 900){

            e.preventDefault();


            let submenu = this.nextElementSibling;


            if(submenu.style.display === "block"){

                submenu.style.display="none";

            }else{

                submenu.style.display="block";

            }


        }


    });


});



/* ===================================
   CAMBIO DE TÍTULO DINÁMICO
=================================== */


let tituloOriginal = document.title;


window.addEventListener(
"blur",
function(){

    document.title="¡Vuelve a visitarnos!";

});


window.addEventListener(
"focus",
function(){

    document.title=tituloOriginal;

});



/* ===================================
   FECHA AUTOMÁTICA FOOTER
=================================== */


let año = new Date().getFullYear();


let copyright = document.querySelector(".copyright p");


if(copyright){

    copyright.innerHTML =
    "© " + año +
    " Óptica Camil | Todos los derechos reservados.";

}

/* ===================================
   PRODUCT DETAIL RENDERING + CARRITO
=================================== */

const products = {
    oftalmicos: {
        title: 'Aros Oftálmicos',
        items: [
            { id: 'o1', title: 'Aro Classic', img: 'imagenes/images.png', desc: 'Aro clásico elegante, ligero.', price: 199, stock: 8 },
            { id: 'o2', title: 'Aro Retro', img: 'imagenes/images.png', desc: 'Estilo retro para un look único.', price: 249, stock: 5 },
            { id: 'o3', title: 'Aro Minimal', img: 'imagenes/images.png', desc: 'Diseño minimalista y cómodo.', price: 179, stock: 12 }
        ]
    },
    sol: {
        title: 'Anteojos de Sol',
        items: [
            { id: 's1', title: 'Sol Urban', img: 'imagenes/lentedesol.png', desc: 'Protección UV con estilo urbano.', price: 249, stock: 6 },
            { id: 's2', title: 'Sol Sport', img: 'imagenes/lentedesol.png', desc: 'Ligeros y resistentes para deporte.', price: 299, stock: 4 }
        ]
    },
    contactoLentes: {
        title: 'Lentes de Contacto',
        items: [
            { id: 'c1', title: 'Contacto Daily', img: 'imagenes/contacto.png', desc: 'Uso diario cómodo.', price: 89, stock: 30 },
            { id: 'c2', title: 'Contacto Monthly', img: 'imagenes/contacto.png', desc: 'Reemplazo mensual confiable.', price: 149, stock: 20 }
        ]
    },
    accesorios: {
        title: 'Accesorios',
        items: [
            { id: 'a1', title: 'Estuche Elegante', img: 'imagenes/accesorios.png', desc: 'Protege tus lentes con estilo.', price: 25, stock: 50 },
            { id: 'a2', title: 'Paño Microfibra', img: 'imagenes/accesorios.png', desc: 'Limpieza segura y efectiva.', price: 15, stock: 100 }
        ]
    }
};

/* --- carrito (localStorage) --- */
function getCart(){
    const raw = localStorage.getItem('oc_cart');
    return raw ? JSON.parse(raw) : [];
}

function saveCart(cart){
    localStorage.setItem('oc_cart', JSON.stringify(cart));
    renderCartCount();
}

function addToCart(item, qty = 1){
    const cart = getCart();
    const existing = cart.find(i => i.id === item.id);
    if(existing){
        existing.qty += qty;
    } else {
        cart.push({ ...item, qty });
    }
    saveCart(cart);
}

function removeFromCart(itemId){
    let cart = getCart();
    cart = cart.filter(i => i.id !== itemId);
    saveCart(cart);
}

function renderCartCount(){
    let btn = document.getElementById('cart-button');
    if(!btn){
        btn = document.createElement('button');
        btn.id = 'cart-button';
        btn.title = 'Ver carrito';
        btn.className = 'cart-btn';
        btn.innerHTML = '🛒 <span id="cart-count">0</span>';
        btn.addEventListener('click', renderCartModal);
        document.body.appendChild(btn);
    }
    const count = getCart().reduce((s,i)=>s+i.qty,0);
    const span = document.getElementById('cart-count');
    if(span) span.textContent = count;
}

function renderCartModal(){
    let modal = document.getElementById('cart-modal');
    if(modal){
        modal.remove();
        return;
    }
    const cart = getCart();
    modal = document.createElement('div');
    modal.id = 'cart-modal';
    modal.className = 'cart-modal';

    let html = '<div class="cart-inner">';
    html += '<button class="close-cart">×</button>';
    html += '<h3>Tu carrito</h3>';
    if(cart.length === 0){
        html += '<p>Carrito vacío.</p>';
    } else {
        html += '<ul class="cart-list">';
        let total = 0;
        cart.forEach(i => {
            total += i.price * i.qty;
            html += `<li data-id="${i.id}"><strong>${i.title}</strong><div class="mini-qty"> <button class="dec" data-id="${i.id}">-</button> <span class="qty">${i.qty}</span> <button class="inc" data-id="${i.id}">+</button></div> Q ${i.price} <button class="remove-item" data-id="${i.id}">Eliminar</button></li>`;
        });
        html += '</ul>';
        html += `<p class="cart-total">Total: Q ${total}</p>`;
        html += '<button id="checkout">Continuar</button>';
    }
    html += '</div>';
    modal.innerHTML = html;
    document.body.appendChild(modal);

    modal.querySelector('.close-cart').addEventListener('click', ()=> modal.remove());
    modal.querySelectorAll('.remove-item').forEach(b=> b.addEventListener('click', function(){
        const id = this.dataset.id;
        removeFromCart(id);
        modal.remove();
        renderCartModal();
    }));

    // quantity handlers
    modal.querySelectorAll('.inc').forEach(b=> b.addEventListener('click', function(){
        const id = this.dataset.id;
        const cart = getCart();
        const it = cart.find(x=>x.id===id);
        if(it){ it.qty += 1; saveCart(cart); modal.remove(); renderCartModal(); }
    }));
    modal.querySelectorAll('.dec').forEach(b=> b.addEventListener('click', function(){
        const id = this.dataset.id;
        const cart = getCart();
        const it = cart.find(x=>x.id===id);
        if(it){ it.qty = Math.max(1, it.qty - 1); saveCart(cart); modal.remove(); renderCartModal(); }
    }));

    const checkoutBtn = modal.querySelector('#checkout');
    if(checkoutBtn){
        checkoutBtn.addEventListener('click', function(){
            // simple checkout simulation
            alert('Gracias por tu compra. Total: ' + cart.reduce((s,i)=>s+i.qty*i.price,0));
            localStorage.removeItem('oc_cart');
            renderCartCount();
            modal.remove();
        });
    }
}

/* header preview */
function populateHeaderPreview(){
    const preview = document.getElementById('header-cart-dropdown');
    const countSpan = document.getElementById('header-cart-count');
    if(!preview) return;
    const cart = getCart();
    countSpan.textContent = cart.reduce((s,i)=>s+i.qty,0);
    if(cart.length === 0){
        preview.innerHTML = '<div class="mini-list"><p>Carrito vacío.</p></div>';
        return;
    }
    let html = '<div class="mini-list"><ul>';
    let total = 0;
    cart.slice(0,4).forEach(i=>{ total += i.price * i.qty; html += `<li>${i.title} x ${i.qty} - Q ${i.price}</li>`; });
    html += `</ul><p class="cart-total">Total: Q ${total}</p><p><a href="#" id="open-cart-full">Ver carrito</a></p></div>`;
    preview.innerHTML = html;
    const open = document.getElementById('open-cart-full');
    if(open) open.addEventListener('click', function(e){ e.preventDefault(); renderCartModal(); });
}

/* call populateHeaderPreview when cart changes */
const originalSaveCart = saveCart;
saveCart = function(cart){
    localStorage.setItem('oc_cart', JSON.stringify(cart));
    renderCartCount();
    populateHeaderPreview();
}

/* --- render detail / category list --- */
function renderProductDetail(){
    const container = document.getElementById('product-detail');
    if(!container) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const itemId = params.get('item');

    const cat = products[id];
    if(!cat){
        container.innerHTML = '<p>Producto no encontrado. <a href="index.html">Volver</a></p>';
        return;
    }

    // If specific item requested -> show item detail
    if(itemId){
        const item = cat.items.find(x=>x.id === itemId);
        if(!item){
            container.innerHTML = '<p>Producto no encontrado en esta categoría. <a href="index.html">Volver</a></p>';
            return;
        }
        container.innerHTML = `
            <div class="detalle-producto">
                <a class="volver" href="detail.html?id=${id}">← Volver</a>
                <h2>${item.title}</h2>
                <img src="${item.img}" alt="${item.title}">
                <p>${item.desc}</p>
                <p class="precio">Precio: Q ${item.price}</p>
                <p>Stock: ${item.stock}</p>
                <label>Cantidad: <input id="qty" type="number" min="1" max="${item.stock}" value="1"></label>
                <button id="add-to-cart" class="btnInfo">Agregar al carrito</button>
            </div>
        `;

        document.getElementById('add-to-cart').addEventListener('click', function(){
            const qty = parseInt(document.getElementById('qty').value) || 1;
            addToCart({ id: item.id, title: item.title, price: item.price }, qty);
            alert('Producto agregado al carrito');
        });

        return;
    }

    // Otherwise show list of items in the category with filter controls
    let html = `
        <div class="category-list">
            <a class="volver" href="index.html">← Volver</a>
            <h2>${cat.title}</h2>
            <div class="category-controls" id="category-controls">
                <input type="text" id="search" placeholder="Buscar producto...">
                <input type="number" id="price-min" placeholder="Precio min">
                <input type="number" id="price-max" placeholder="Precio max">
                <label><input type="checkbox" id="in-stock"> En stock</label>
                <select id="sort">
                    <option value="default">Orden</option>
                    <option value="price-asc">Precio ↑</option>
                    <option value="price-desc">Precio ↓</option>
                    <option value="title-asc">Nombre A-Z</option>
                </select>
            </div>
            <div class="items-grid" id="items-grid">
            </div>
        </div>
    `;
    container.innerHTML = html;

    const itemsGrid = document.getElementById('items-grid');

    function renderItems(list){
        itemsGrid.innerHTML = '';
        list.forEach(item => {
            const art = document.createElement('article');
            art.className = 'card item-card';
            art.innerHTML = `
                <a href="detail.html?id=${id}&item=${item.id}" class="card-link">
                    <div class="card-img"><img src="${item.img}" alt="${item.title}"></div>
                    <div class="card-body"><h3>${item.title}</h3><p class="small">${item.desc}</p><p class="precio">Q ${item.price}</p></div>
                </a>
                <div class="card-actions">
                    <button class="btnInfo add-item" data-cat="${id}" data-id="${item.id}">Agregar</button>
                </div>
            `;
            itemsGrid.appendChild(art);
        });

        // attach add buttons
        itemsGrid.querySelectorAll('.add-item').forEach(b => b.addEventListener('click', function(){
            const cid = this.dataset.cat;
            const iid = this.dataset.id;
            const item = products[cid].items.find(x=>x.id===iid);
            if(item){ addToCart({ id: item.id, title: item.title, price: item.price }, 1); alert('Agregado al carrito'); }
        }));
    }

    function applyFilters(){
        const q = (document.getElementById('search').value || '').toLowerCase();
        const pmin = parseFloat(document.getElementById('price-min').value) || 0;
        const pmax = parseFloat(document.getElementById('price-max').value) || Infinity;
        const inStock = document.getElementById('in-stock').checked;
        const sort = document.getElementById('sort').value;

        let list = cat.items.slice();
        list = list.filter(it => it.title.toLowerCase().includes(q) || it.desc.toLowerCase().includes(q));
        list = list.filter(it => it.price >= pmin && it.price <= pmax);
        if(inStock) list = list.filter(it => it.stock > 0);

        if(sort === 'price-asc') list.sort((a,b)=>a.price-b.price);
        else if(sort === 'price-desc') list.sort((a,b)=>b.price-a.price);
        else if(sort === 'title-asc') list.sort((a,b)=> a.title.localeCompare(b.title));

        renderItems(list);
    }

    // initial render
    renderItems(cat.items);

    // attach filter handlers
    ['search','price-min','price-max','in-stock','sort'].forEach(idc=>{
        const el = document.getElementById(idc);
        if(el) el.addEventListener('input', applyFilters);
    });
}

function renderCatalog(){
    try{
        const grid = document.getElementById('catalog-grid');
        console.log('renderCatalog: grid element =', grid);
        if(!grid) {
            console.warn('renderCatalog: #catalog-grid no existe en esta página');
            return;
        }

        grid.innerHTML = '';

        // Show all items across categories as cards so catalog is populated
        let totalItems = 0;
        Object.keys(products).forEach(function(catKey){
            const cat = products[catKey];
            (cat.items || []).forEach(function(item){
                totalItems++;
                const card = document.createElement('article');
                card.className = 'card item-card';
                card.innerHTML = `
                    <div class="card-img"><img src="${item.img}" alt="${item.title}"></div>
                    <div class="card-body">
                        <h3>${item.title}</h3>
                        <p class="small">${item.desc}</p>
                        <p class="precio">Q ${item.price}</p>
                    </div>
                    <div class="card-actions">
                        <a href="detail.html?id=${catKey}&item=${item.id}" class="btnInfo">Ver</a>
                        <button class="btnInfo add-item" data-cat="${catKey}" data-id="${item.id}">Agregar</button>
                    </div>
                `;
                grid.appendChild(card);
            });
        });

        console.log('renderCatalog: total items added =', totalItems);

        // attach add buttons in catalog
        grid.querySelectorAll('.add-item').forEach(b => b.addEventListener('click', function(){
            const cid = this.dataset.cat;
            const iid = this.dataset.id;
            const item = products[cid].items.find(x=>x.id===iid);
            if(item){ addToCart({ id: item.id, title: item.title, price: item.price }, 1); alert('Agregado al carrito'); }
        }));

        if(totalItems === 0){
            grid.innerHTML = '<p>No hay productos en el catálogo por el momento.</p>';
        }
    }catch(err){
        console.error('renderCatalog error:', err);
    }
}

// initialize
    // initialize after full load
    window.addEventListener('load', function(){
        renderCatalog();
        renderProductDetail();
        renderCartCount();
        populateHeaderPreview();
    });
});