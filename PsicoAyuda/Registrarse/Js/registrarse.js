// Variables para Menu Hamburguesa
const nav = document.querySelector("#nav"); // Obtener Id del Menu
const abrir = document.querySelector("#btAbrir"); // Boton que Abre Menu Desplegable
const cerrar = document.querySelector("#btCerrar"); // Boton que Cierra Menu Desplegable

// Funcion Donde Se Abre Menu Haciendo Click en Boton Abrir
abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

// Funcion Donde Se Cierra el Menu Haciendo Click en Boton Cerrar
cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})

// Boton Para Volver Una Pagina Atras Version Mobile
const BtonVolver = document.querySelector("#BtnAtras");

// Funcion que Hace Posible Volver Atras en Version Mobile
BtonVolver.addEventListener("click", () => {
    history.back()
})

// BUSCADOR //

// Variables Para el Buscador
const icon = document.querySelector("#icon-buscar");
const buscador = document.getElementById("contenedor-busqueda");
const cover = document.getElementById("cover-busqueda");
const inputBusqueda = document.getElementById("inputBusqueda");
const sugerencias = document.getElementById("sugestiones");

// Funcion que Hace Visible el Buscador Despues de Hacer Click en Icono de Buscar
icon.addEventListener("click", () => {
    buscador.classList.add("visible");
    cover.classList.add("visible");
    nav.classList.add("hidden");
    nav.classList.remove("visible");
    inputBusqueda.focus();
    if (inputBusqueda.value === ""){
        sugerencias.style.display = "none";
    }
})

// Funcion Donde al Hacer Click en Fondo Opaco se Cierra el Buscador
cover.addEventListener("click", () => {
    buscador.classList.remove("visible");
    cover.classList.remove("visible");
    nav.classList.remove("hidden");
    inputBusqueda.value = "";
    sugerencias.style.display = "none";
})

// Se Obtiene Letra al Pulsar y Levantar una Tecla
document.getElementById("inputBusqueda").addEventListener("keyup", buscaSugerencias);

// Funcion Busca Sugerencias Al Obtener una Tecla o Mas en el Input Para Asi Mostrar Sugerencias (Regiones o Psicologos) 
function buscaSugerencias(){
    const letras = inputBusqueda.value.toUpperCase();
    const listas = sugerencias.getElementsByTagName("li");
    for (i = 0; i < listas.length; i++){
        const a = listas[i].getElementsByTagName("a")[0];
        const valorTexto = a.textContent || a.innerText;

        if(valorTexto.toUpperCase().indexOf(letras) > -1){
            listas[i].style.display = "";
            sugerencias.style.display = "block";
            if (inputBusqueda.value === ""){
                sugerencias.style.display = "none";
            }
        }else{
            listas[i].style.display = "none";
        }
    } 
}

// Validacion del Form
document.getElementById('formRegistro').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar Envio del Formulario

    // Obtener Valores de los Campos
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const nomUsuario = document.getElementById('nomUsuario').value.trim();
    const rut = document.getElementById('rut').value.trim();
    const region = document.getElementById('region').value.trim();
    const comuna = document.getElementById('comuna').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const tycCheckbox = document.getElementById('tycCheckbox').checked;

    // Validar Campos Null
    if (!nombre || !apellido || !nomUsuario || !rut || !region || !comuna || !email || !password || !confirmPassword) {
        alert('Todos los campos son obligatorios');
        return;
    }

     // Nombre Solo Letras
     const soloLetrasRegex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/;
     if (!soloLetrasRegex.test(nombre)) {
         alert('El nombre solo debe contener letras');
         return;
     }

    // Validar Formato de Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor ingresa un email válido, ej: "correoCorreo@XXXXXXX.com/cl"');
        return;
    }

    // Validar RUT
    if (!/^\d{7,8}-[0-9Kk]$/.test(rut)) {
        alert('Por favor ingresa un RUT válido, ej: "12345678-9"');
        return;
    }

    // Validar Contraseñas
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    // Validar Terminos y Condiciones
    if (!tycCheckbox) {
        alert('Debes aceptar los términos y condiciones');
        return;
    }

    alert('Formulario enviado con éxito');
    // this.submit(); // Para Enviar el Form
});