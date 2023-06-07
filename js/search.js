function searchProducts(input) {
    fetch(`https://fakestoreapi.com/products`)
        .then(res => res.json())
        .then(json => {
            let html = ``;
            for (let i = 0; i < json.length; i++) {
                if (json[i].title.toLowerCase().includes(input.toLowerCase())) {
                    html += `
                    <a href="./details.html?id=${json[i].id}">${json[i].title}</a>
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
