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
  var idCliente = id;
  var titulo    = (type == 'agregar')?'Agregar nuevo cliente':'Editar';
  $('#tituloModal').html(titulo);
  $('#Municipio').prop('disabled',true);
  $('#btn-edit').hide();
  if (type == 'editar') {
    $('#NombreCliente').prop('disabled',true);
    $('#ApellidosCliente').prop('disabled',true);
    $('#SexoCliente').prop('disabled',true);
    $('#FecNacCliente').prop('disabled',true);
    $('#CelularCliente').prop('disabled',true);
    $('#CelularAltCliente').prop('disabled',true);
    $('#whatsapp').prop('disabled',true);
    $('#CorreoCliente').prop('disabled',true);
    $('#CorreoAltCliente').prop('disabled',true);
    $('#facebook').prop('disabled',true);
    $('#twitter').prop('disabled',true);
    $('#DireccionCliente').prop('disabled',true);
    $('#ColoniaCliente').prop('disabled',true);
    $('#Estado').prop('disabled',true);
    editarCliente(idCliente);
  }else{
    $('#NombreCliente').prop('disabled',false).val('');
    $('#ApellidosCliente').prop('disabled',false).val('');
    $('#SexoCliente').prop('disabled',false).val('');
    $('#FecNacCliente').prop('disabled',false).val('');
    $('#CelularCliente').prop('disabled',false).val('');
    $('#CelularAltCliente').prop('disabled',false).val('');
    $('#whatsapp').prop('disabled',false).val('');
    $('#CorreoCliente').prop('disabled',false).val('');
    $('#CorreoAltCliente').prop('disabled',false).val('');
    $('#facebook').prop('disabled',false).val('');
    $('#twitter').prop('disabled',false).val('');
    $('#DireccionCliente').prop('disabled',false).val('');
    $('#ColoniaCliente').prop('disabled',false).val('');
    $('#Estado').prop('disabled',false).val('');
    $('#Municipio').prop('disabled',false).val('');
  }
}

//Envío de id Estado
$('#Estado').change(function(){
  var idestado  = $('#Estado').val();
  var info      = jQuery.parseJSON('{ "id" : "'+idestado+'"}');
  var ruta      = "../../administrador/index/municipios";
  var respuesta = '1';
  EnvioInfo(ruta,info,respuesta);
  $('#Municipio').prop('disabled',false);
});

//Envio de Formulario
$('#FormCliente').submit(function(e) {
  e.preventDefault();
  var info      = $('#FormCliente').serialize();
  var ruta      = "../../administrador/index/sendform";
  var respuesta = '2';
  EnvioInfo(ruta,info,respuesta);
});

//Recibir datos de usuario
function editarCliente(idCliente){
  var info      = jQuery.parseJSON('{"id" :"'+idCliente+'"}');
  var ruta      = "../../administrador/index/infoCliente";
  var respuesta = '3';
  EnvioInfo(ruta,info,respuesta);
}

//Editar
function editar(){
  $('#NombreCliente').prop('disabled',false);
  $('#ApellidosCliente').prop('disabled',false);
  $('#SexoCliente').prop('disabled',false);
  $('#FecNacCliente').prop('disabled',false);
  $('#CelularCliente').prop('disabled',false);
  $('#CelularAltCliente').prop('disabled',false);
  $('#whatsapp').prop('disabled',false);
  $('#CorreoCliente').prop('disabled',false);
  $('#CorreoAltCliente').prop('disabled',false);
  $('#facebook').prop('disabled',false);
  $('#twitter').prop('disabled',false);
  $('#DireccionCliente').prop('disabled',false);
  $('#ColoniaCliente').prop('disabled',false);
  $('#Estado').prop('disabled',false);
  $('#Municipio').prop('disabled',false);
  $('#cliente_edit').val('1');
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
        var municipio = '<option value=""> SELECCIONE </option>';
        for (var i = 0; i < data[0].length; i++) {
          municipio+='<option value="'+data[0][i].idCat_Municipio+'" style="text-transform:uppercase">'+data[0][i].NombreMunicipio+'</option>';
        }
        $("#Municipio").html(municipio);
      break;
    case '2':
      swal({
        title: "Se realizó correctamente",
        timer: 2000,
        imageUrl: "/sweetalert/img/ok.png",
        showConfirmButton: false });
      setTimeout(function () {
            location.reload()
        }, 2500);
      break;
    case '3':
        $('#NombreCliente').val(data[0][0]['NombreCliente']);
        $('#ApellidosCliente').val(data[0][0]['ApeCliente']);
        $('#SexoCliente').val(data[0][0]['Sexo']);
        $('#FecNacCliente').val(data[0][0]['FechaNacCliente']);
        $('#CelularCliente').val(data[0][0]['CelularCliente']);
        $('#CelularAltCliente').val(data[0][0]['CelularAltCliente']);
        $('#whatsapp').val(data[0][0]['WhatsAppCliente']);
        $('#CorreoCliente').val(data[0][0]['CorreoCliente']);
        $('#CorreoAltCliente').val(data[0][0]['CorreoAltCliente']);
        $('#facebook').val(data[0][0]['FBCliente']);
        $('#twitter').val(data[0][0]['TwitterCliente']);
        $('#DireccionCliente').val(data[0][0]['DireccionCliente']);
        $('#ColoniaCliente').val(data[0][0]['ColoniaCliente']);
        $('#Estado').val(data[0][0]['idCat_Estados']);
        $('#Municipio').val(data[0][0]['idCat_Municipio']);
        $('#id_cliente').val(data[0][0]['idCat_Cliente']);
        $('#btn-send').hide();
        $('#btn-edit').show();
        $('#btn-edit').removeAttr('type','submit').attr('onclick','editar()').attr('type','button');
      break;
    default:
  }
}
