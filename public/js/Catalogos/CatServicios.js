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
  var idservicio= id;
  var titulo    = (type == 'agregar')?'Agregar servicio':'Editar';
  $('#tituloModal').html(titulo);
  $('#btn-edit').hide();
  $('#Est_servicio').show();
  if (type == 'editar') {
    $('#NombreServicio').prop('disabled',true);
    $('#TiempoServicio').prop('disabled',true);
    $('#UnidadServicio').prop('disabled',true);
    $('#EstatusServicio').prop('disabled',true);
    editarServicio(idservicio);
  }
}

//Envio de Formulario
$('#FormServicios').submit(function(e) {
  e.preventDefault();
  var info      = $('#FormServicios').serialize();
  var ruta      = "../../administrador/index/sendformservicio";
  var respuesta = '1';
  EnvioInfo(ruta,info,respuesta);
});

//Recibir datos de Servicios
function editarServicio(idservicio){
  var info      = jQuery.parseJSON('{"id" :"'+idservicio+'"}');
  var ruta      = "../../administrador/index/infoServicios";
  var respuesta = '2';
  EnvioInfo(ruta,info,respuesta);
}

//Editar
function editar(){
  $('#NombreServicio').prop('disabled',false);
  $('#TiempoServicio').prop('disabled',false);
  $('#UnidadServicio').prop('disabled',false);
  $('#EstatusServicio').prop('disabled',false);
  $('#servicio_edit').val('1');
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
        $('#NombreServicio').val(data[0][0]['NombreServicio']);
        $('#TiempoServicio').val(data[0][0]['TiempoServicio']);
        $('#UnidadServicio').val(data[0][0]['UnidadServicio']);
        var estatus = (data[0][0]['EstatusServicio']==1)?1:0;
        if (estatus == '1') {
        $('#EstatusServicio').prop('checked',true);
        }else{
        $('#EstatusServicio').prop('checked',false);
        }
        $('#id_servicio').val(data[0][0]['idCat_Servicio']);
        $('#btn-send').hide();
        $('#btn-edit').show();
        $('#btn-edit').removeAttr('type','submit').attr('onclick','editar()').attr('type','button');
      break;
    default:
  }
}
