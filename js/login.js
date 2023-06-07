function login(email, password) {
    fetch(`https://fakestoreapi.com/users`)
        .then(res => res.json())
        .then(json => {
            let user = json.find(user => user.email == email && user.password == password);

            if (user != undefined) {
                localStorage.setItem('user', JSON.stringify(user));
                if (window.location.href.includes('pages')) {
                    window.location.href = '../index.html?login=true';
                } else {
                    window.location.href = './index.html?login=true';
                }
            } else {
                alert('Usuário ou senha incorretos!');
            }
        });
}

window.onload = function () {
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.addEventListener('click', function () {
        let email = document.getElementById('inputEmail').value;
        let password = document.getElementById('inputPassword').value;

        login(email, password);
    });
}
