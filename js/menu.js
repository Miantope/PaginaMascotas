const hamburguesa = document.getElementById('hamburguesa');
const menuNav = document.getElementById('menu-nav');

hamburguesa.addEventListener('click', function() {
    menuNav.classList.toggle('abierto');
});