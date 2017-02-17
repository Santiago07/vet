  //Envio de Formulario
$('#FormNuevaCita').submit(function(e) {
  e.preventDefault();
  var cliente  = $('#Cli').val();
  var selec_cli= $('#cliente option[value="'+cliente+'"]').html();
  $('#id_cliente').val(selec_cli);
  var info      = $('#FormNuevaCita').serialize();
  var ruta      = "../../administrador/index/sendformcita";
  var respuesta = '2';
  EnvioInfo(ruta,info,respuesta);
});

//Cargar clientes
function clientes(){
  var info      = "";
  var ruta      = "../../administrador/index/clientes";
  var respuesta = '3';
  EnvioInfo(ruta,info,respuesta);
}

//Cargar pacientes
$('#Cli').change(function(){
  var cliente  = $('#Cli').val();
  var selec_cli= $('#cliente option[value="'+cliente+'"]').html();
  $('#id_cliente').val(selec_cli);
  $('#idCat_Paciente').removeAttr("disabled",'false');
  var info     = jQuery.parseJSON('{ "id" : "'+selec_cli+'"}');
  var ruta     = "../../administrador/index/paciente";
  var respuesta= '1';
  EnvioInfo(ruta, info, respuesta);
});


//Cargar razas
$('#idCat_Sucursales').change(function(){
  var idespacio = $('#idCat_Sucursales').val();
  var info      = jQuery.parseJSON('{ "id" : "'+idespacio+'"}');
  var ruta      = "../../administrador/index/espacio";
  var respuesta = '4';
  EnvioInfo(ruta,info,respuesta);
  $('#idCat_Espacio').prop('disabled',false);
});

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
      var paciente  = '<option value="">SELECCIONE</option>'
      for (var i = 0; i < data[0].length; i++){
        paciente+='<option value="'+data[0][i].idCat_Paciente+'">'+data[0][i].NombrePaciente+'</option>';
      };
      $('#idCat_Paciente').html(paciente);
        break;
    case '2':
      swal({
        title: "Se realizó correctamente",
        timer: 2000,
        imageUrl: "/sweetalert/img/ok.png",
        showConfirmButton: false });
      setTimeout(function () {
          location.assign("agenda");
        }, 2500);

      break;
    case '3':
    var cliente = '<option value=""></option>'
    for (var i = 0; i < data[0].length; i++) {
      cliente+='<option  value="'+data[0][i].Nombre+" "+data[0][i].Apellidos+'">'+data[0][i].idCat_Cliente+'</option>';
    };
    $("#cliente").html(cliente);

      break;
  case '4':
    var espacio = '<option value"">ESPACIO</option>';
    for (var i = 0; i < data[0].length; i++){
      espacio+='<option value="'+data[0][i].idCat_Espacio+'">'+data[0][i].NombreEspacio+'</option>';
    };
    $('#idCat_Espacio').html(espacio);
    break;
    default:
  }
}
