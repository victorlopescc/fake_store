function getDetails(id) {
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(json => {
            let stars = [];
            for (let i = 0; i < 5; i++) {
                if (i < json.rating.rate) {
                    stars.push(`<i class="bi bi-star-fill text-success"></i>`);
                } else {
                    stars.push(`<i class="bi bi-star text-success"></i>`);
                }
            }

            let html = `
                <div id="mobile" class="row">
                <div class="col-6">
                    <div id="stars" class="d-flex justify-content-center fs-2">
                        ${stars.join('')}
                    </div>
                    <div class="row">
                        <img src="${json.image}" class="detailsImg">
                    </div>
                </div>
                <div class="col-6">
                    <h3 class="text-success">R$ ${json.price}</h3>
                    <h1>${json.title}</h1>
                    <h6>${json.category.toUpperCase()}</h6>
                    <p>${json.description}</p>
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-outline-success"><i class="bi bi-bag-plus"></i></button>
                    </div>
                </div>
                </div>
            `;

            document.getElementById('details').innerHTML = html;
        });
}

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id != null) {

        getDetails(id);
    }
}
