function searchProducts(input) {
    fetch(`https://fakestoreapi.com/products`)
        .then(res => res.json())
        .then(json => {
            let html = ``;
            for (let i = 0; i < json.length; i++) {
                if (json[i].title.toLowerCase().includes(input.toLowerCase())) {
                    html += `
                    <a href="./details.html?id=${json[i].id}">
                        <div class="card mb-3"">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src="${json[i].image}" class="img-fluid rounded-start">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h6 class="text-success">R$ ${json[i].price}</h6>
                                        <h5 class="card-title">${json[i].title}</h5>
                                        <p class="card-text">${json[i].description}</p>
                                        <p class="card-text"><small class="text-body-secondary">${json[i].category.toUpperCase()}</small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                    `;
                }
            }
            document.getElementById('search').innerHTML = html;
        });
}

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const input = urlParams.get('input');
    console.log(input);

    if (input != null) {

        searchProducts(input);
    }
}
