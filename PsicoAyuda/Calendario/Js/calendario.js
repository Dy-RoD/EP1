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



// Variables Que Se Usaran Para Los Dias, Semanas, Meses y Eventos
const calendario = document.querySelector(".calendario"),
    fecha = document.querySelector(".fecha"),
    dias = document.querySelector(".dias"),
    mesAnterior = document.querySelector(".bi-arrow-left-short"),
    mesSiguiente = document.querySelector(".bi-arrow-right-short"),
    fechaInput = document.querySelector(".fecha-input");
    btnIr = document.querySelector(".ir-fecha"),
    btnHoy = document.querySelector(".btn-hoy"),
    diaEvento = document.querySelector(".dia-evento"),
    fechaEvento = document.querySelector(".fecha-evento"),
    contenedorEventos = document.querySelector(".eventos"),
    agregarEventoSubmit = document.querySelector(".agregar-bt-evento");
    
// PARTE IZQUIERDA DE CALENDARIO

// Creamos Variables con Funciones Que Usaremos

let hoy = new Date();
let diaHoy = "";
let mes = hoy.getMonth();
let anio = hoy.getFullYear();
    
// Variable Que Contiene un Arreglo con Todos Los Meses

const ArrMeses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

// Creamos un Arreglo Vacio
let arrEventos = [];

// Y Llamamos a la Funcion getEventos Para Rellenar (Si es que Tiene Eventos)
cargarEventos();

// Funcion Para Agregar Dias

function updateCalendario(){
    // Variables Para Tener Los Dias del Mes Actual, Anterior y Siguiente
    const primerDia = new Date(anio, mes, 1);
    const ultimoDia = new Date(anio, mes + 1, 0);
    const ultimoDiaPrevio =  new Date(anio, mes, 0);
    const diasPrevio =  ultimoDiaPrevio.getDate();
    const ultimaFecha = ultimoDia.getDate();
    const dia = primerDia.getDay();
    const siguientesDias = 7 - ultimoDia.getDay() - 1;
    
    // Actualizar y Mostrar El Mes y Año en Parte Superior del Calendario
    fecha.innerHTML = ArrMeses[mes] + " " + anio;
    
    // Agregar los Dias en el DOM (Calendario)
    let diasCalendario = "";

    // Agregamos los Dias del Mes Anterior
    for (let i = dia ; i > 0 ; i--){
        diasCalendario += `<div class="dia previo">${diasPrevio - i + 1}</div>`;
    }

    
    // Agregamos los Dias de Este Mes
    for (let j = 1 ; j <= ultimaFecha ; j++){
        // Verificamos si Existe un Evento en los Dias Visibles
        let evento = false;
        //console.log(arrEventos);
        arrEventos.forEach((reserva) => {
            
            if (reserva.dia === j && reserva.mes === mes + 1 && reserva.anio === anio){
                evento = true;
            }
        })

        // Si el Dia es Hoy Se Agrega Con la Clase hoy + Clase Evento Si Existe + Clase seleccionado al Inicializar Calendario
        if(j === new Date().getDate() && anio === new Date().getFullYear() && mes === new Date().getMonth()){
            
            diaHoy = j;
            // Inicializamos Funciones Escenciales
            fechaDiaSelec(j);
            updateEventos(j);

            if (evento) {
                diasCalendario += `<div class="dia hoy evento seleccionado">${j}</div>`;
            }
            else{
                diasCalendario += `<div class="dia hoy seleccionado">${j}</div>`;
            }
        }
        // Agregamos los Demas Dias
        else{
            if (evento) {
                diasCalendario += `<div class="dia evento">${j}</div>`;
            }
            else{
                diasCalendario += `<div class="dia">${j}</div>`;
            }
        }
    }
    
    // Agregamos los Dias Del Siguiente Mes
    for(let k = 1 ; k <= siguientesDias ; k++){
        diasCalendario += `<div class="dia siguiente">${k}</div>`;
    } 

    // Mostramos los Dias En El Calendario
    dias.innerHTML = diasCalendario;

    // Inicializamos el dia Seleccionado (Ninguno)
    diaSeleccionado();
}   

// Llamamos a Funcion Para Inicializar el Calendario
updateCalendario();

// Funcion Para Ir al Mes Anterior
function mesPrevio(){
    mes--;
    if (mes < 0) {
        mes = 11;
        anio--;
    }
    updateCalendario();
}

// Funcion Para Ir al Siguiente Mes
function mesContinuo(){
    mes++;
    if (mes > 11){
        mes = 0;
        anio++;
    }
    updateCalendario();
}

// Agregar evento Para Ejecutar Funciones Anteriores
mesAnterior.addEventListener("click", mesPrevio);
mesSiguiente.addEventListener("click", mesContinuo);


// Funcion Para que al Dar Click en Boton Hoy Se Vuelva al Mes Actual
btnHoy.addEventListener("click", () => {
    hoy = new Date();
    mes = hoy.getMonth();
    anio = hoy.getFullYear();
    updateCalendario();
});

// Funcion Para Formatear Input Para la Busqueda de Una Fecha Manualmente
fechaInput.addEventListener("input", (x) => {
    // Formateamos a Solo Numero
    fechaInput.value = fechaInput.value.replace(/[^0-9/]/g, "");
    if (fechaInput.value.length === 2){
        // Separamos Por un Slash (/) el Mes del Año
        fechaInput.value += "/";
    }
    // Solo Permitir Hasta 7 Caracteres
    if (fechaInput.value.length > 7){
        fechaInput.value = fechaInput.value.slice(0, 7);
    }
    
    // Eliminamos el Slash si se Pasa de Año a Mes
    if (x.inputType === "deleteContentBackward"){
        if (fechaInput.value.length === 3){
            fechaInput.value = fechaInput.value.slice(0, 2);
        }
    }
});

// Evento Para Llamar a La Funcion irFecha
btnIr.addEventListener("click", irFecha);

// Funcion Para Ir a la Fecha Escrita en Input fecha-Input
function irFecha(){
    const ArrFecha = fechaInput.value.split("/");
    if (ArrFecha.length === 2){
        if (ArrFecha[0] > 0 && ArrFecha[0] < 13 && ArrFecha[1].length === 4){
            mes = ArrFecha[0] - 1;
            anio = ArrFecha[1];
            updateCalendario();
            return;
        }
    }
    alert("Fecha Invalida");
}

// PARTE DERECHA DE CALENDARIO

// Variables Para Abrir o Cerrar Apartado Agregar Evento (Reserva)
const agregarEventoBtn = document.querySelector(".aniadir-evento"),
    detallesEventos = document.querySelector(".agregar-evento"),
    cerrarEventos = document.querySelector(".bi-x"),
    nombreEvento = document.querySelector(".nombre-evento"),
    inicioEvento = document.querySelector(".inicio-evento"),
    terminoEvento = document.querySelector(".termino-evento");

// Funcion Donde Se Abre Pestaña Haciendo Click en Boton AgregarEventoBtn
agregarEventoBtn.addEventListener("click", () => {
    detallesEventos.classList.toggle("select");
});

// Funcion Donde Se Cierra la Pestaña Haciendo Click en Boton CerrarEventos
cerrarEventos.addEventListener("click", () => {
    detallesEventos.classList.remove("select");
});

// Permitir Hasta 50 Caracteres en el Nombre de Reserva
nombreEvento.addEventListener("input", (x) => {
    nombreEvento.value = nombreEvento.value.slice(0, 50);
})


// Formato de Hora Para Hora Inicio
inicioEvento.addEventListener("input", (x) => {
    inicioEvento.value = inicioEvento.value.replace(/[^0-9:]/g, "");
    if (inicioEvento.value.length === 2) {
        inicioEvento.value += ":";
    }
    if (inicioEvento.value.length > 5){
        inicioEvento.value = inicioEvento.value.slice(0, 5);
    }
    if (x.inputType === "deleteContentBackward"){
        if (inicioEvento.value.length === 3){
            inicioEvento.value = inicioEvento.value.slice(0, 2);
        }
    }
});

// Formato de Hora Para Hora Inicio
terminoEvento.addEventListener("input", (x) => {
    terminoEvento.value = terminoEvento.value.replace(/[^0-9:]/g, "");
    if (terminoEvento.value.length === 2) {
        terminoEvento.value += ":";
    }
    if (terminoEvento.value.length > 5){
        terminoEvento.value = terminoEvento.value.slice(0, 5);
    }
    if (x.inputType === "deleteContentBackward"){
        if (terminoEvento.value.length === 3){
            terminoEvento.value = terminoEvento.value.slice(0, 2);
        }
    }
});

// Funcion Para Resaltar el Dia Clickeado
function diaSeleccionado(){
    const calendarioDias = document.querySelectorAll(".dia");
    calendarioDias.forEach((dia) => {
        dia.addEventListener("click", (x) => {
            // Guardamos Dia Seleccionado en Una Variable
            diaHoy = Number(x.target.innerHTML);
            // Llamamos a la Funciones Necesarias Despues de Clickear un Dia
            fechaDiaSelec(x.target.innerHTML);
            updateEventos(Number(x.target.innerHTML));

            // Removemos la Clase seleccionado de Todos los Dias
            calendarioDias.forEach((dia) => {
                dia.classList.remove("seleccionado");
            });
            
            // Si el Usuario Hace Click en Un Dia Con Clase previo
            if (x.target.classList.contains("previo")){
                mesPrevio();
                // Despues de Ir Al Mes Anterior Actualizamos el Dia Seleccionado
                setTimeout(() => {
                    const calendarioDias = document.querySelectorAll(".dia");
                    calendarioDias.forEach((dia) => {
                        if(!dia.classList.contains("previo") && dia.innerHTML === x.target.innerHTML){
                            dia.classList.add("seleccionado");
                        }
                    }); 
                }, 100);
            }
            else if (x.target.classList.contains("siguiente")){
                mesContinuo();
                // Despues de Ir Al Mes Siguiente Actualizamos el Dia Seleccionado
                setTimeout(() => {
                    const calendarioDias = document.querySelectorAll(".dia");
                    calendarioDias.forEach((dia) => {
                        if(!dia.classList.contains("siguiente") && dia.innerHTML === x.target.innerHTML){
                            dia.classList.add("seleccionado");
                        }
                    }); 
                }, 100);
            }
            else {
                // Hacemos lo Mismo Con los Dias del Mes Que se Muestra en Pantalla
                x.target.classList.add("seleccionado");
            }
        });
    });
}

// Funcion Activa los Eventos del Dia Seleccionado y Fecha de Arriba de la Parte Derecha (Abajo Version Mobile)
function fechaDiaSelec(fecha){
    const dia = new Date(anio, mes, fecha);
    // Usar Intl.DateTimeFormat para obtener el nombre del día en español y abreviado
    const opciones = { weekday: 'short' };
    const nombreDia = new Intl.DateTimeFormat('es-ES', opciones).format(dia);
    diaEvento.innerHTML = nombreDia;
    fechaEvento.innerHTML = fecha + " " + ArrMeses[mes] + " " + anio;
}

// Funcion Para Mostrar Eventos del Dia Seleccionado
function updateEventos(fecha){
    let eventos = "";
    arrEventos.forEach((evento) => {
        if (fecha === evento.dia && mes + 1 === evento.mes && anio === evento.anio){
            // Si Hay Eventos Se Muestran en Pantalla
            evento.eventos.forEach((reserva) => {
                eventos += `
                <div class="evento">
                    <div class="titulo">
                        <i class="bi bi-balloon-heart"></i>
                        <h3 class="titulo-evento">${reserva.titulo}</h3>
                    </div>
                    <div class="hora-evento">
                        <span class="hora-evento">${reserva.hora}</span>
                    </div>
                </div>`;
            });
        }
    });
    // Si no Hay Eventos Para Mostrar
    if ((eventos === "")) {
        eventos =  `<div class="no-eventos">
                        <h3>No hay reservas</h3>
                    </div>`;
    }
    contenedorEventos.innerHTML = eventos;

    //Guardamos Eventos Cuando Actualizamos los Eventos
    guardarEventos();
    //console.log(arrEventos);
}

// Funcion Para Agregar Eventos
agregarEventoSubmit.addEventListener("click", () => {
    const tituloEvento = nombreEvento.value;
    const horaInicio = inicioEvento.value;
    const horatermino = terminoEvento.value;

    // Validacion
    if (tituloEvento === "" || horaInicio === "" || horatermino === ""){
        alert("Rellene todos los campos!");
        return;
    }

    // Obtenemos las Horas Sin los :
    const arrHoraInicio = horaInicio.split(":");
    const arrHoraTermino = horatermino.split(":");

    // Validamos
    if(arrHoraInicio.length !== 2 || arrHoraTermino.length !== 2 || arrHoraInicio[0] > 23 || arrHoraInicio[1] > 59 || arrHoraTermino[0] > 23 || arrHoraTermino[1] > 59){
        alert("Formato de hora incorrecto!");
    }

    const horaComienzo = convertirTiempo(horaInicio);
    const horaFinalizado = convertirTiempo(horatermino);

    const nuevoEvento = {
        titulo: tituloEvento,
        hora: horaComienzo + " - " + horaFinalizado,
    };

    let eventoAgregado = false;

    // Vemos si arrEventos no Esta Vacio
    if (arrEventos.length > 0){
        // Vemos si el Dia Seleccionado Tiene Eventos y Agregamos el Nuevo Evento
        arrEventos.forEach((evento) => {
            if (evento.dia === diaHoy && evento.mes === mes + 1 && evento.anio === anio){
                evento.eventos.push(nuevoEvento);
            }
        })
    }

    // Si el Arreglo de Eventos Esta Vacio o no Tiene Eventos el Dia Seleccionado
    if (!eventoAgregado){
        arrEventos.push({
            dia: diaHoy,
            mes: mes+1,
            anio: anio,
            eventos: [nuevoEvento],
        });
    }
    contenedorEventos.classList.remove("seleccionado");

    // Limpiar los Campos del Formulario
    nombreEvento.value = "";
    inicioEvento.value = "";
    terminoEvento.value = "";

    // Mostramos el Evento Creado
    updateEventos(diaHoy);

    // Agregamos la Clase evento a los Dias que no Tenian Eventos Previamente
    const addClaseEvento = document.querySelector(".dia.seleccionado");
    if (!addClaseEvento.classList.contains("evento")){
        addClaseEvento.classList.add("evento");
    }

});

// Funcion Para Formatear la Hora Para Tener Modelo PM y AM
function convertirTiempo(tiempo){
    let arrHora = tiempo.split(":");
    let tiempoHora = arrHora[0];
    let tiempoMin = arrHora[1];
    let horaFormato = tiempoHora >= 12 ? "PM" : "AM";
    tiempoHora = tiempoHora % 12 || 12;
    tiempo = tiempoHora + ":" + tiempoMin + " " + horaFormato;
    return tiempo;
}

// Funcion Para Eliminar Evento al Hacer Click
contenedorEventos.addEventListener("click", (x) => {
    if (x.target.classList.contains("evento")){
        const tituloEvento = x.target.children[0].children[1].innerHTML;
        // Obtenemos el Titulo de un Evento y Buscamos el Mismo Titulo en el arrEventos
        arrEventos.forEach((evento) => {
            if (evento.dia === diaHoy && evento.mes === mes + 1 && evento.anio === anio){
                evento.eventos.forEach((item, index) => {
                    if (item.titulo === tituloEvento){
                        evento.eventos.splice(index, 1);
                    }
                });
                // Si no Quedan Mas Eventos en el Dia Seleccionado, Remover el Dia Completo
                if (evento.eventos.length === 0){
                    arrEventos.splice(arrEventos.indexOf(evento), 1);
                    
                    // Y Finalmente Remover La Clase evento
                    const removeClaseEvento = document.querySelector(".dia.seleccionado");
                    if (removeClaseEvento.classList.contains("evento")){
                        removeClaseEvento.classList.remove("evento");
                    }

                }
            }
        });
        // Despues de Remover el Evento Actualizamos los Eventos que se Muestran en Pantalla
        updateEventos(diaHoy);
    }
});


// Guardamos Eventos en JSON
function guardarEventos(){
    localStorage.setItem("eventos", JSON.stringify(arrEventos));
}

// Función para cargar el archivo JSON y guardar los datos en arrEventos
async function cargarEventos() {
    fetch('../eventos.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al cargar el archivo JSON");
        }
        return response.json();
    })
    .then(data => {
        // Guardamos los datos obtenidos en el arreglo arrEventos
        arrEventos = data;
        
        // Agregamos Clase eventos a los Dias que Tengan Eventos
        const calendarioDias = document.querySelectorAll(".dia");
        calendarioDias.forEach((dia) => {
            diaHoy = Number(dia.innerText);
            arrEventos.forEach((reserva) => {
                if(diaHoy === Number(reserva.dia)){
                    dia.classList.add("evento");
                }
            });
        });
    })
    .catch(error => {
        console.error("Hubo un problema con la carga del archivo JSON:", error);
    });
}



// Llamamos a la función para cargar los eventos cuando la página se cargue
window.onload = cargarEventos;


