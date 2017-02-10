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
  var idEmpleado = id;
  var titulo    = (type == 'agregar')?'Agregar nuevo empleado':'Editar';
  $('#tituloModal').html(titulo);
  $('#Municipio').prop('disabled',true);
  $('#btn-edit').hide();
  $('#baja').hide();
  $('#Est_emp').hide();
  if (type == 'editar') {
    $('#NombreEmpleado').prop('disabled',true);
    $('#ApellidosEmpleado').prop('disabled',true);
    $('#SexoEmpleado').prop('disabled',true);
    $('#FecNacEmpleado').prop('disabled',true);
    $('#CelularEmpleado').prop('disabled',true);
    $('#CelularAltEmpleado').prop('disabled',true);
    $('#whatsapp').prop('disabled',true);
    $('#CorreoEmpleado').prop('disabled',true);
    $('#facebook').prop('disabled',true);
    $('#twitter').prop('disabled',true);
    $('#DireccionEmpleado').prop('disabled',true);
    $('#ColoniaEmpleado').prop('disabled',true);
    $('#Estado').prop('disabled',true);
    $('#Sucursal').prop('disabled',true);
    $('#CedulaProfEmpleado').prop('disabled',true);
    $('#CategoriaEmpleado').prop('disabled',true);
    $('#EstatusEmpleado').prop('disabled',true);
    $('#Est_emp').show();
    $('#BajaMotivoEmpleado').prop('disabled',true);
    editarEmpleado(idEmpleado);
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
$('#FormEmpleado').submit(function(e) {
  e.preventDefault();
  var info      = $('#FormEmpleado').serialize();
  var ruta      = "../../administrador/index/sendformemp";
  var respuesta = '2';
  EnvioInfo(ruta,info,respuesta);
});

//Recibir datos de usuario
function editarEmpleado(idEmpleado){
  var info      = jQuery.parseJSON('{"id" :"'+idEmpleado+'"}');
  var ruta      = "../../administrador/index/infoEmpleado";
  var respuesta = '3';
  EnvioInfo(ruta,info,respuesta);
}

//Cambio de estatus
$('#EstatusEmpleado').click(function(){
  if ($('#EstatusEmpleado').is(':checked')) {
    $('#baja').hide();
  }else {
  $('#baja').show();
  }
});

//Cambio en baja
$('#baja').change(function() {
  $('#BajaMotivoEmpleado').prop('disabled',false);
});

//Editar
function editar(){
  $('#NombreEmpleado').prop('disabled',false);
  $('#ApellidosEmpleado').prop('disabled',false);
  $('#SexoEmpleado').prop('disabled',false);
  $('#FecNacEmpleado').prop('disabled',false);
  $('#CelularEmpleado').prop('disabled',false);
  $('#CelularAltEmpleado').prop('disabled',false);
  $('#whatsapp').prop('disabled',false);
  $('#CorreoEmpleado').prop('disabled',false);
  $('#facebook').prop('disabled',false);
  $('#DireccionEmpleado').prop('disabled',false);
  $('#ColoniaEmpleado').prop('disabled',false);
  $('#Estado').prop('disabled',false);
  $('#Municipio').prop('disabled',false);
  $('#empleado_edit').val('1');
  $('#Sucursal').prop('disabled',false);
  $('#CedulaProfEmpleado').prop('disabled',false);
  $('#CategoriaEmpleado').prop('disabled',false);
  $('#EstatusEmpleado').prop('disabled',false);
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
        $('#NombreEmpleado').val(data[0][0]['NombreEmpleado']);
        $('#ApellidosEmpleado').val(data[0][0]['ApeEmpleado']);
        $('#SexoEmpleado').val(data[0][0]['Sexo']);
        $('#FecNacEmpleado').val(data[0][0]['FechaNacEmpleado']);
        $('#CelularEmpleado').val(data[0][0]['CelularEmpleado']);
        $('#CelularAltEmpleado').val(data[0][0]['CelularAltEmpleado']);
        $('#whatsapp').val(data[0][0]['WhatsAppEmpleado']);
        $('#CorreoEmpleado').val(data[0][0]['CorreoEmpleado']);
        $('#facebook').val(data[0][0]['FBEmpleado']);
        $('#DireccionEmpleado').val(data[0][0]['DireccionEmpleado']);
        $('#ColoniaEmpleado').val(data[0][0]['ColoniaEmpleado']);
        $('#CedulaProfEmpleado').val(data[0][0]['CedulaProfEmpleado']);
        $('#CategoriaEmpleado').val(data[0][0]['CategoriaEmpleado']);
        $('#BajaEmpleado').val(data[0][0]['BajaEmpleado']);
        $('#BajaMotivoEmpleado').val(data[0][0]['BajaMotivoEmpleado']);
        var estatus = (data[0][0]['EstatusEmpleado']==1)?1:0;
        if (estatus == '1') {
        $('#EstatusEmpleado').prop('checked',true);
      }else{
        $('#EstatusEmpleado').prop('checked',false);
        $('#baja').show();
      }
        $('#Sucursal').val(data[0][0]['idCat_Sucursales']);
        $('#Estado').val(data[0][0]['idCat_Estados']);
        $('#Municipio').val(data[0][0]['idCat_Municipio']);
        $('#id_empleado').val(data[0][0]['idCat_Empleado']);
        $('#btn-send').hide();
        $('#btn-edit').show();
        $('#btn-edit').removeAttr('type','submit').attr('onclick','editar()').attr('type','button');
      break;
    default:
  }
}
