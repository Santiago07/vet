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
  var idpaciente = id;
  var titulo    = (type == 'agregar')?'Agregar nuevo paciente':'Editar';
  $('#tituloModal').html(titulo);
  $('#btn-edit').hide();
  $('#Est_pac').hide();
  clientes();
  if (type == 'editar') {
    $('#NombrePaciente').prop('disabled',true);
    $('#Cli').prop('disabled',true);
    $('#SexoPaciente').prop('disabled',true);
    $('#FecNacPaciente').prop('disabled',true);
    $('#imagen').prop('disabled',true);
    $('#Especie').prop('disabled',true);
    $('#Raza').prop('disabled',true);
    $('#ColorPaciente').prop('disabled',true);
    $('#EstatusPaciente').prop('disabled',true);
    $('#Est_pac').show();

    editarPaciente(idpaciente);
  }
}



//Envio de Formulario
$('#FormPaciente').submit(function(e) {
  e.preventDefault();
  var cliente  = $('#Cli').val();
  var selec_cli= $('#cliente option[value="'+cliente+'"]').html();
  $('#id_cliente').val(selec_cli);
  var info      = $('#FormPaciente').serialize();
  var ruta      = "../../administrador/index/sendformpac";
  var respuesta = '2';
  EnvioInfo(ruta,info,respuesta);
});


//Recibir datos de paciente
function editarPaciente(idPaciente){
  var info      = jQuery.parseJSON('{"id" :"'+idPaciente+'"}');
  var ruta      = "../../administrador/index/infoPaciente";
  var respuesta = '3';
  EnvioInfo(ruta,info,respuesta);
}

//Cargar clientes
function clientes(){
  var info      = "";
  var ruta      = "../../administrador/index/clientes";
  var respuesta = '4';
  EnvioInfo(ruta,info,respuesta);
}

//Cargar razas
$('#Especie').change(function(){
  var idraza = $('#Especie').val();
  var info      = jQuery.parseJSON('{ "id" : "'+idraza+'"}');
  var ruta      = "../../administrador/index/razas";
  var respuesta = '1';
  EnvioInfo(ruta,info,respuesta);
  $('#Raza').prop('disabled',false);
});

//Editar
function editar(){
  $('#NombrePaciente').prop('disabled',false);
  $('#Cli').prop('disabled',false);
  $('#SexoPaciente').prop('disabled',false);
  $('#FecNacPaciente').prop('disabled',false);
  $('#imagen').prop('disabled',false);
  $('#Especie').prop('disabled',false);
  $('#Raza').prop('disabled',false);
  $('#ColorPaciente').prop('disabled',false);
  $('#EstatusPaciente').prop('disabled',false);
  $('#paciente_edit').val('1');
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
      var raza  = '<option value="">SELECCIONE</option>'
      for (var i = 0; i < data[0].length; i++){
        raza+='<option value="'+data[0][i].idCat_Razas+'">'+data[0][i].NombreRaza+'</option>';
      };
      $('#Raza').html(raza);
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
        $('#NombrePaciente').val(data[0][0]['NombrePaciente']);
        $('#Cli').val(data[0][0]['NombreCliente']+" "+data[0][0]['ApeCliente']);
        $('#SexoPaciente').val(data[0][0]['SexoPaciente']);
        $('#FecNacPaciente').val(data[0][0]['FechaNacPaciente']);
        $('#Especie').val(data[0][0]['idCat_Especie']);
        $('#Raza').val(data[0][0]['idCat_Razas']);
        $('#ColorPaciente').val(data[0][0]['ColorPaciente']);
        var estatus = (data[0][0]['EstatusPaciente']==1)?1:0;
        if (estatus == '1') {
        $('#EstatusPaciente').prop('checked',true);
        }else{
        $('#EstatusPaciente').prop('checked',false);
        }
        $('#id_paciente').val(data[0][0]['idCat_Paciente']);
        $('#btn-send').hide();
        $('#btn-edit').show();
        $('#btn-edit').removeAttr('type','submit').attr('onclick','editar()').attr('type','button');
      break;

    case '4':
    var cliente = '<option value=""></option>'
    for (var i = 0; i < data[0].length; i++) {
      cliente+='<option  value="'+data[0][i].Nombre+" "+data[0][i].Apellidos+'">'+data[0][i].idCat_Cliente+'</option>';
    };
    $("#cliente").html(cliente);

      break;
    default:
  }
}
