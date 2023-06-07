let numProducts = 9;
let products = [];

function getFooter() {
    let date = new Date();
    let year = date.getFullYear();

    document.getElementById('footer').innerHTML = ` &copy; ${year} - Fake Store`;
}

function loadNav() {
    const navLogin = document.getElementById('navLogin');
    if (window.location.href.includes('login=true')) {
        navLogin.classList.add('disabledLink');
    }
}

function getCarousel(category) {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(res => res.json())
        .then(json => {
            let images = [];
            for (let i = 0; i < 3; i++) {
                images.push(json[i].image);
            }

            let html = `
                <div class="carousel-item active">
                    <img src="${images[0]}" class="w-100">
                </div>
            `;
            for (let i = 1; i < images.length; i++) {
                html += `
                    <div class="carousel-item">
                        <img src="${images[i]}" class="w-100">
                    </div>
                `;
            }

            const carousel = document.getElementById('carousel');
            if (carousel === null) {
                return;
            } else {
                carousel.innerHTML = html;
            }
        });
}

function getCards() {
    fetch(`https://fakestoreapi.com/products`)
        .then(res => res.json())
        .then(json => {
            products = json;

            let html = ``;
            for (let i = 0; i < numProducts && i < products.length; i++) {
                html += `
                    <div class="col">
                        <div class="card h-100">
                            <a href="./pages/details.html?id=${products[i].id}"><img src="${products[i].image}" class="card-img-top imgCards"></a>
                            <div class="card-body">
                                <h5 class="card-title">${products[i].title}</h5>
                                <p class="card-text">${products[i].description}</p>
                            </div>
                            <div class="card-footer">
                                <small class="text-body-secondary">R$${products[i].price}</small>
                            </div>
                        </div>
                    </div>
                `;
            }

            document.getElementById('cards').innerHTML = html;

            const loadMoreButton = document.getElementById('loadBtn');
            if (numProducts >= products.length) {
                loadMoreButton.disabled = true;
            } else {
                loadMoreButton.disabled = false;
            }
        });
}

function loadMore() {
    const remainingProducts = products.length - numProducts;
    const productsToAdd = Math.min(remainingProducts, 3);

    numProducts += productsToAdd;

    getCards();
}

window.onload = function () {
    const select = document.getElementById('carouselSelect');

    if (select === null) {
        return;
    } else {
        select.addEventListener('change', function () {
            const selected = select.value;
            if (selected !== 'Select category') {
                getCarousel(selected);
            }
        });
    }

    getCards();

    const loadBtn = document.getElementById('loadBtn');
    loadBtn.addEventListener('click', function () {
        loadMore();
    });
}


document.addEventListener('DOMContentLoaded', function () {
    const defaultCategory = 'electronics';
    getCarousel(defaultCategory);

    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const input = document.getElementById('searchInput').value;
        if (input === '') {
            return;
        } else {
            if (window.location.href.includes('/pages/')) {
                window.location.href = `./search.html?input=${input}`;
                return;
            } else {
                window.location.href = `./pages/search.html?input=${input}`;
                return;
            }
        }
    });

    getFooter();
    loadNav();
});