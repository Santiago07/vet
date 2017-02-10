//Tabla
$(document).ready( function () {
    $('#bootstrap-table').bdt({
        showSearchForm: 1,
        showEntriesPerPageField: 1

    });
});

//Modal
function modal(tipo,id){
  var type      = tipo;
  var idraza = id;
  var titulo    = (type == 'agregar')?'Agregar raza':'Editar';
  $('#tituloModal').html(titulo);
  $('#btn-edit').hide();
  $('#Est_raza').show();
  if (type == 'editar') {
    $('#NombreRaza').prop('disabled',true);
    $('#Especie').prop('disabled',true);
    $('#EstatusRaza').prop('disabled',true);
    editarRaza(idraza);
  }
}

//Envio de Formulario
$('#FormRazas').submit(function(e) {
  e.preventDefault();
  var info      = $('#FormRazas').serialize();
  var ruta      = "../../administrador/index/sendformraza";
  var respuesta = '1';
  EnvioInfo(ruta,info,respuesta);
});

//Recibir datos de Razas
function editarRaza(idraza){
  var info      = jQuery.parseJSON('{"id" :"'+idraza+'"}');
  var ruta      = "../../administrador/index/infoRazas";
  var respuesta = '2';
  EnvioInfo(ruta,info,respuesta);
}

//Editar
function editar(){
  $('#NombreRaza').prop('disabled',false);
  $('#Especie').prop('disabled',false);
  $('#EstatusRaza').prop('disabled',false);
  $('#raza_edit').val('1');
  $('#btn-edit').hide();
  $('#btn-send').show().html('Guardar');
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

//Envío de datos ajax img
function Envio(ruta, info, respuesta) {
  $.ajax({
    url     : ruta,
    type    : "POST",
    data    : info,
    dataType: 'json',
    contentType: 'multipart/form-data',
    success : function(data) {
      respuestas(data,respuesta);
    }
  });
}

//Recibir las respuestas
function respuestas(data,respuesta) {
  switch (respuesta) {
    case '1':
      swal({
        title: "Se realizó correctamente",
        timer: 2000,
        imageUrl: "/sweetalert/img/ok.png",
        showConfirmButton: false });
      setTimeout(function () {
            location.reload()
        }, 2500);

      break;
    case '2':
        $('#NombreRaza').val(data[0][0]['NombreRaza']);
        $('#Especie').val(data[0][0]['idCat_Especie']);
        var estatus = (data[0][0]['EstatusRaza']==1)?1:0;
        if (estatus == '1') {
        $('#EstatusRaza').prop('checked',true);
        }else{
        $('#EstatusRaza').prop('checked',false);
        }
        $('#id_raza').val(data[0][0]['idCat_Razas']);
        $('#btn-send').hide();
        $('#btn-edit').show();
        $('#btn-edit').removeAttr('type','submit').attr('onclick','editar()').attr('type','button');
      break;
    default:
  }
}
