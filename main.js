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

            document.getElementById('carousel').innerHTML = html;
        });
}

function getCards() {
    fetch(`https://fakestoreapi.com/products`)
        .then(res => res.json())
        .then(json => {
            let html = ``;

            for (let i = 0; i < 9; i++) {
                html += `
                    <div class="col">
                        <div class="card h-100">
                            <img src="${json[i].image}" class="card-img-top imgCards">
                            <div class="card-body">
                                <h5 class="card-title">${json[i].title}</h5>
                                <p class="card-text">${json[i].description}</p>
                            </div>
                            <div class="card-footer">
                                <small class="text-body-secondary">R$${json[i].price}</small>
                            </div>
                        </div>
                    </div>
                `;
            }

            document.getElementById('cards').innerHTML = html;
        });
}

function getFooter() {
    let date = new Date();
    let year = date.getFullYear();

    document.getElementById('footer').innerHTML = ` &copy; ${year} - Fake Store`;
}

window.onload = function () {
    const select = document.getElementById('carouselSelect');

    select.addEventListener('change', function () {
        const selected = select.value;
        if (selected !== 'Select category') {
            getCarousel(selected);
        }
    });

    getCards();
    getFooter();
}
