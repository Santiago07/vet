
function edit_pass(id){
var id_usr = id;
$('#pass1').removeClass("hide");
$('#pass2').removeClass("hide").val('');
$('#cancela').removeClass("hide");
$('#btn_edit').html("Guardar cambios").attr('type','submit').attr('onclick','update_pass()');

//console.log("Estas aquí"+id_usr);
}
function update_pass(){

	swal({
		title :"Contraseña modificada",
		type	:"success",
		showConfirmButton : false,
	});
	setTimeout(function () {
        location.reload()
    }, 3000);

}
$('#change_pass').submit(function(e){
	e.preventDefault();
	var datos = $("#change_pass").serialize();
	var formURL = baseRut+"/administrador/index/passchange";
	var condicional = '3';
	var preload		= "";
	var errores		= "";
	//console.log("Estás aquí");
	sendInfo(formURL,datos,preload,errores,condicional);
});

function cancelar(id){
var id = id;
$('#pass1').addClass("hide");
$('#pass2').addClass("hide");
$('#cancela').addClass("hide");
$('#btn_edit').html("Editar contraseña").attr('onclick','edit_pass('+id+')');
}

function edit_data(){

$('#nombre_usr').removeAttr("disabled").show('slow');
$('#emp_apat').removeAttr("disabled");
$('#emp_amat').removeAttr("disabled");
$('#emp_email').removeAttr("disabled");
$('#emp_cel').removeAttr("disabled");
$('#emp_tel').removeAttr("disabled");
$('#emp_calle_no').removeAttr("disabled");
$('#emp_colonia').removeAttr("disabled");
$('#ef_clave').removeAttr("disabled");
$('#emp_fec_nac').removeAttr("disabled");
$('#edit').html("Guardar cambios").attr("onclick",'save_data()').attr('type','submit');
}


	$('#personal_data').submit(function(e){
		e.preventDefault();
		var datos = $("#personal_data").serialize();
		var formURL = baseRut+"/administrador/index/editempleado";
		var condicional = '2';
		var preload		= "";
		var errores		= "";
		//console.log(condicional+"1");
		sendInfo(formURL,datos,preload,errores,condicional);
	});

	//console.log("hola mundo "+$("#personal_data").serialize());
	//console.log(baseRut+"/administrador/index/editempleado");
function save_data(){
	swal({
		title: "Su información se actualizó correctamente",
		timer: 2000,
		imageUrl: "/sweetalert/img/pago-ok.png",
		showConfirmButton: false });
	setTimeout(function () {
        location.reload()
    }, 2500);
}




$('#ef_clave').change(function(){
	$("#mun_clave").removeAttr("disabled");
	var municipio = $("#ef_clave").val();
	var datos 		= jQuery.parseJSON('{"identy" :"'+municipio+'"}');
	var formURL 	= baseRut+"/administrador/index/getmunicipios";
	var preload		= "";
	var errores		= "";
	var condicional= '1';
	sendInfo(formURL,datos,preload,errores,condicional);
	$('#mun_clave').prop('disabled', false);
	//console.log(condicional+"1");

	//console.log(municipio+" "+formURL);
});

function sendInfo(ruta,datos,preload,errores,condicional){
	$.ajax({
    url : ruta,
    type: "POST",
    data : datos,
    dataType: "json",
  	beforeSend: function(x) {
    	if(x && x.overrideMimeType) {
     	}
     	$(preload).html('<center> Espere un momento.... </center><br><center></center>');
 	},
 	success:function(data){
	//console.log(ruta+"2");
 		respuestas(data,condicional);
	},
	error: function(jqXHR, exception) {
    var complemento;
    if (jqXHR.status === 0) {
        complemento ='No hay coneccion.\n Verifica tu conección.';
        } else if (jqXHR.status == 404) {
            complemento ='Respuesta fallida';
        } else if (jqXHR.status == 500) {
            complemento ='Error interno del servidor [500]';
        } else if (exception === 'parsererror') {
            complemento ='Error interno, consulta con el área de sistemas';
        } else if (exception === 'timeout') {
            complemento= 'Demasiado tiempo de espera';
        } else if (exception === 'abort') {
            complemento= 'Petición abortada';
        } else {
            complemento= 'NO detectadO\n'+jqXHR.responseText;
        }
        $(errores).html('<div class="alert alert-danger alert-dismissible fade in text-center" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><h4 style="color: red;"><span class="glyphicon glyphicon-warning-sign" aria-hidden="true"></span> Evento inesperado : '+complemento+'</h4><br><small style="color:red;">Si este problema continúa, póngase en contacto con el administrador</small></div> ');
        }
    });

}


function respuestas(data,condicional){
switch (condicional) {
	case '1':
	var opt = '<option value="">SELECCIONE</option>';
	for (var i = 0; i < data[0].length; i++) {
		opt+='<option value="'+data[0][i].idEle1+'" >'+data[0][i].nomEle2+'</option>';
	};
	$("#mun_clave").html(opt);
		break;
	case '2':
		break;
	default:

}


}
