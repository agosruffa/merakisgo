// SECCION COMENTARIOS DE CLIENTES- AJAX

/* DECLARACIÓN DE VARIABLES */

//ESTA URL ES PARA OBTENER TODAS LAS PUBLICACIONES
const URLGETPUBLICACIONES = "https://jsonplaceholder.typicode.com/comments?postId=1";
//ESTA URL ES PARA ENVIAR UNA PUBLICACION (POST)
const URLPOSTUSUARIOS = "https://jsonplaceholder.typicode.com/posts/1/comments";
//ESTA URL ES PARA OBTENER LOS USUARIOS
const URLGETUSUARIOS = "https://jsonplaceholder.typicode.com/users";
/* DECLARACIÓN DE FUNCIONES */
// COMO JavaScript síncrono (AJAX) pausa el parseo del DOM.PODEMOS USAR EL EVENTO DOMContentLoaded PARA MOSTRAR UN MENSAJE MIENTRAS SE CARGAN LOS DATOS DESDE EL API.
$(document).on("DOMContentLoaded",function(){
    //AGREGAMOS UN MENSAJE, CON ETIQUETA "h2" AL SELECTOR id=mensajeGenerado
    $("#mensajeGenerado").append("<h2 id='mensaje'>Cargando...</h2>");
});
//FORMA ACOTADA DE ESCRIBIR LA FUNCION .ready()
$(function(){
    //OCULTAMOS EL ELEMENTO DEL DOM CON ID "domGenerado"
    $("#comentarios").hide();
    //OCULTAMOS EL ELEMENTO DEL DOM CON ID "usuarioGenerado"
    $("#usuarioGenerado").hide();
    //TOGGLE AL EL ELEMENTO DEL DOM CON ID "fPublicacion"
    $("#fPublicacion").toggle();

    $.get(URLGETPUBLICACIONES,callbackGetPublicaciones);
    //LAMADA ASINCRONA GET PARA OBTENER LA INFORMACION DE LOS USUARIOS POR MEDIO DE UNA PETICION A LA DIRECCION DEFINIDA EN URLGETUSUARIOS.
    $.get(URLGETUSUARIOS,callbackGetUsuarios);
    //DEFINIMOS QUE VAMOS A ESCUCHAR EL EVENTO "change" DEL ELEMENTO id="usuarioGenerado". CUANDO OCURRE EL EVENTO EJECUTAMOS LA FUNCION callbackEventSelect.
    $("#usuarioGenerado").on("change",callbackEventSelect);
    //DEFINIMOS QUE VAMOS A ESCUCHAR EL EVENTO "click" DEL ELEMENTO id="bPublicacion". CUANDO OCURRE EL EVENTO EJECUTAMOS LA FUNCION callbackEventButton.
    $("#bPublicacion").on("click",callbackEventButton);
    //DEFINIMOS QUE VAMOS A ESCUCHAR EL EVENTO "submit" DEL ELEMENTO id="fPublicacion". CUANDO OCURRE EL EVENTO EJECUTAMOS LA FUNCION callbackEventForm.
    $("#fPublicacion").on("submit",callbackEventForm);
});
//FUNCION CALLBACK PARA EL GET DE PUBLICACIONES
function callbackGetPublicaciones(respuesta,estado){
    //NOS PREGUNTAMOS SI EL ESTADO RESPONDIDO POR EL SERVIDOR ES SUCCESS
    if(estado === "success"){
        //SI ES SUCCESS ENTONCES EN LA RESPUESTA TENEMOS EL JSON DE PUBLICACION Y PODEMOS ITERARLO
        for (const publicacion of respuesta) {
            //AGREGAMOS UN ELEMENTO POR PUBLICACION EN LA RESPUESTA, EMPLEAMOS MEJOR LA NOTACION DE TEMPLATE DE CARACTERES (EJ:`cadena${variable}cadena2`) PARA DEFINIR EL ELEMENTO AGREGAR AL DOM.
            $("#comentarios").append(`<div><h4>${publicacion.email}</h4><p>${publicacion.body}</p>
            </div>`);
        }
        //UNA VEZ CONCLUIDO EL FOR...OF TODOS LOS ELEMENTOS FUERON AGREGADOS AL DOM, ENTONCES MOSTRAMOS EL CONTENEDOR CON UNA ANIMACIÒN
        $("#comentarios").fadeIn(3000);
        //UNA VEZ CONCLUIDO EL FOR...OF TODOS LOS ELEMENTOS FUERON AGREGADOS AL DOM, ENTONCES OCULTAMOS EL MENSAJE DE CARGANDO.
        $("#mensajeGenerado").fadeOut(1000);
    }
}
//FUNCION CALLBACK PARA EL GET DE USUARIOS
function callbackGetUsuarios(respuesta){
    //EN LA RESPUESTA TENEMOS EL JSON DE USUARIOS Y PODEMOS ITERARLO
    for (const usuario of respuesta) {
        //AGREGAMOS UNA OPCION AL SELECT POR USUARIO EN LA RESPUESTA, EMPLEAMOS MEJOR LA NOTACION DE TEMPLATE DE CARACTERES (EJ:`cadena${variable}cadena2`) PARA DEFINIR EL ELEMENTO AGREGAR AL DOM.
        $("#usuarioGenerado").append(`<option value="${usuario.id}">${usuario.name}</option>`);
    }
    //UNA VEZ CONCLUIDO EL FOR...OF TODAS LAS OPCIONES FUERON AGREGADOS AL DOM, ENTONCES MOSTRAMOS EL CONTENEDOR CON UNA ANIMACIÒN
    $("#usuarioGenerado").fadeIn(3000);
}
//FUNCION CALLBACK EN RESPUESTA AL POST DEL FORMULARIO
function callbackPostPublicacion(respuesta){
   //AGREGAMOS UN TEXTO AL ELEMENTO DE id="mensaje" USANDO LA INFORMACION DE LA RESPUESTA, EMPLEAMOS MEJOR LA NOTACION DE TEMPLATE DE CARACTERES (EJ:`cadena${variable}cadena2`) PARA DEFINIR EL ELEMENTO AGREGAR AL DOM.
   $("#mensaje").text(`Publicamos: ${respuesta.title} - Autor Nº : ${respuesta.userId}`);
   //SE OCULTA EL FORMULARIO DE id="fPublicacion" CON LA ANIMACION TOGGLE
   $("#fPublicacion").toggle();
   //SE MUESTA EL NUEVO MENSAJE CON UN FADEIN, LUEGO SE ESPERA CON DELAY Y SE VUELVE A OCULTA EL MENSAJE CON FADEOUT.
   $("#mensajeGenerado").fadeIn(1000).delay(3000).fadeOut(1000);
}
//FUNCION CALLBACK EN RESPUESTA AL EVENTO CHANGE DEL SELECT(PARA VERIFICAR EL ID DEL SELECT).
function callbackEventSelect(event){
    console.log(event.target.value);
}
//FUNCION CALLBACK EN AL ENVIO DEL FORMULARIO, USAMOS LA INFORMACION DEL EVENTO COMO PARAMETRO.
function callbackEventForm(event){
    //CANCELAMOS LA RESPUESTA AL EVENTO "SUBMIT" DEL FORMULARIO. ASI PODEMOS HACER LA LLAMADA POST.
    event.preventDefault();
    //LAMADA ASINCRONA POST PARA ENVIAR AL SERVIDOR LA INFORMACION DEL FORMULARIO A LA DIRECCION EN URLPOSTUSUARIOS. ES NECESARIO PASAR COMO SEGUNDO PARAMETO LA INFORMACION A ENVIAR, PREFERENTEMENTE EN CLAVE-VALOR.
    $.post(URLPOSTUSUARIOS,{title: event.target[0].value ,body:event.target[1].value, userId:event.target[2].value}, callbackPostPublicacion);

}
//FUNCION CALLBACK EN RESPUESTA AL EVENTO CLICK DEL BOTON "NUEVA PUBLICACION"
function callbackEventButton(event){
    //USAMOS LA ANIMACION TOGGLE SOBRE EL FORMULARIO PARA OCULTARLO/MOSTRARLO.
    $("#fPublicacion").toggle();
}