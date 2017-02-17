citas();
//Cargar citas
function citas(){
  var info      = "";
  var ruta      = "../../administrador/index/citas";
  var respuesta = '1';
  EnvioInfo(ruta,info,respuesta);
}

//Envío de datos ajax
function EnvioInfo(ruta, info, respuesta) {
  $.ajax({
    url     : ruta,
    type    : "POST",
    data    : info,
    dataType: 'json',
    success : function(data) {
      respuestas(data,respuesta);
    }
  });
}

//Recibir las respuestas
function respuestas(data,respuesta) {
  switch (respuesta) {
    case '1':
    console.log(data);
      var agenda = new Array();
      var my_events = [];
      for (var i = 0; i < data[0].length; i++) {
        var titulo = data[0][i].title;
        var inicio = (data[0][i].start);
        agenda += ("{ 'title' : '"+titulo+"', 'start' : '"+inicio+"'},");

  }
        break;
    default:
  }
}
$(document).ready(function() {
   initialLocaleCode = 'es';
       var hoy =  new Date();
   $('#calendar').fullCalendar({
     header: {
       left: 'prev,next',
       center: 'title',
       right: 'month,agendaWeek,agendaDay,listWeek'
     },
     defaultDate: hoy,
     locale: initialLocaleCode,
     navLinks: true, // can click day/week names to navigate views
     editable: false,
     eventLimit: false, // allow "more" link when too many events
     events: "../../events.php",
 });
});
