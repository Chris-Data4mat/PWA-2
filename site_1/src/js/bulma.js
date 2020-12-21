document.addEventListener('DOMContentLoaded', () => {
    var count = 0;
    console.log(`bulma, count: ${count}`);
    fetch("inc/navigation.html")
        .then(response => {
            return response.text()
        })
        .then(data => {
            document.getElementById("navbar").innerHTML = data;
            var burger = document.querySelector('.navbar-burger');
            var menu = document.querySelector('#' + burger.dataset.target);
            burger.addEventListener('click', () => {
                burger.classList.toggle('is-active');
                menu.classList.toggle('is-active');
            });
        })
    count++;
});