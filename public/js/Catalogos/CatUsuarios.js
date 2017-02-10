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
  var idusuario = id;
  var titulo    = (type == 'agregar')?'Agregar usuario':'Editar';
  $('#tituloModal').html(titulo);
  $('#btn-edit').hide();
  $('#Est_usr').hide();
  empleados();
  if (type == 'editar') {
    $('#NombreUsuario').prop('disabled',true);
    $('#Emp').prop('disabled',true);
    $('#PassUsuario').prop('disabled',true);
    $('#EstatusUsuario').prop('disabled',true);
    $('#Est_usr').show();
    editarUsuario(idusuario);
  }
}



//Envio de Formulario
$('#FormUsuario').submit(function(e) {
  e.preventDefault();
  var empleado  = $('#Emp').val();
  var selec_emp= $('#empleado option[value="'+empleado+'"]').html();
  $('#id_empleado').val(selec_emp);
  var info      = $('#FormUsuario').serialize();
  var ruta      = "../../administrador/index/sendformusr";
  var respuesta = '2';
  EnvioInfo(ruta,info,respuesta);
});


//Recibir datos de paciente
function editarUsuario(idusuario){
  var info      = jQuery.parseJSON('{"id" :"'+idusuario+'"}');
  var ruta      = "../../administrador/index/infoUsuario";
  var respuesta = '3';
  EnvioInfo(ruta,info,respuesta);
}

//Cargar empelados
function empleados(){
  var info      = "";
  var ruta      = "../../administrador/index/empleados";
  var respuesta = '1';
  EnvioInfo(ruta,info,respuesta);
}


//Editar
function editar(){
  $('#NombreUsuario').prop('disabled',false);
  $('#Emp').prop('disabled',false);
  $('#PassUsuario').prop('disabled',false);
  $('#EstatusUsuario').prop('disabled',false);
  $('#usuario_edit').val('1');
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
      var empleado = '<option value=""></option>'
      for (var i = 0; i < data[0].length; i++) {
        empleado+='<option  value="'+data[0][i].NombreEmpleado+" "+data[0][i].ApeEmpleado+'">'+data[0][i].idCat_Empleado+'</option>';
      };
      $("#empleado").html(empleado);
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
        $('#Emp').val(data[0][0]['NombreEmpleado']+" "+data[0][0]['ApeEmpleado']);
        $('#NombreUsuario').val(data[0][0]['NombreUsuario']);
        $('#PassUsuario').val(data[0][0]['PassUsuario']);
        var estatus = (data[0][0]['EstatusUsuario']==1)?1:0;
        if (estatus == '1') {
        $('#EstatusUsuario').prop('checked',true);
        }else{
        $('#EstatusUsuario').prop('checked',false);
        }
        $('#id_usuario').val(data[0][0]['idCat_Usuarios']);
        $('#btn-send').hide();
        $('#btn-edit').show();
        $('#btn-edit').removeAttr('type','submit').attr('onclick','editar()').attr('type','button');
      break;


    default:
  }
}
