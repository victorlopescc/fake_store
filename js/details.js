function getDetails(id) {
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(json => {
            let html = `
                <p>${json.title}</p>
            `;

            console.log(document);
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
