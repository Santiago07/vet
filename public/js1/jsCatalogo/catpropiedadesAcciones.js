

function showpreeviewprop(action_of,instancia){
	var inst = instancia;
	var title = (action_of=='insert_prop')?'Insertar un nuevo registro':'Actualizar el registro existente';
	var type  = (action_of=='insert_prop')?1:2;
	$('#head_all_prop').html(title);
	$('#insert_to_update_prop').modal('show');
	$('#ValueAAA').val(type);
	$(".idSave").show('slow');
	if(instancia!='null'){
		($('#Per_update').val()!=0)?$(".idSave").show('slow'):$(".idSave").hide();		
		$('#ValueBBB').val(inst);
		getinform(instancia);
		$('#MSJ_all_prop').html(' ');

	}


}

function getinform(instancia){
	//get information of the registry
	var datos = jQuery.parseJSON('{ "identy":"'+instancia+'"}' )   ;
	var formURL = baseRut+"/catalogo/index/getsomeinfoprop";
	var preload = '#MSJ_all_prop';
	var errores = '#MSJ_all_prop';
	var condicional='3';
	sendInfoprop(formURL,datos,preload,errores,condicional);
}


$('#report_form_prop').submit(function(e){
	e.preventDefault();
	var datos = $("#report_form_prop").serialize();
	var formURL = baseRut+"/catalogo/index/thingsallprop";
	var preload = '#MSJ_all_prop';
	var errores = '#MSJ_all_prop';
	var condicional = $('#ValueAAA').val();
	sendInfoprop(formURL,datos,preload,errores,condicional);
});



function sendInfoprop(ruta,datos,preload,errores,condicional){
	$.ajax({
    url : ruta,
    type: "POST",
    data : datos,
    dataType: "json",
  	beforeSend: function(x) {
    	if(x && x.overrideMimeType) {
     	}
     	$(preload).html('<center> Espere un momento.... </center><br><center><img src="'+baseRut+'/img/preload/39_1.gif"></center>');
 	},
 	success:function(data){
 		respuestasprop(data,condicional);
	},
	error: function(jqXHR, exception) {
    var complemento;
		//console.log(respuestas);
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

function respuestasprop(data,condicional){

	switch(condicional) {
		case '1':
			$('#MSJ_all_prop').html('<div class="alert alert-success text-center" role="alert">'+data.mensaje_prop+'</div>');
			if (data.prop_status == 1 ) {
			$("#prop_clave").append("<option  style=text-transform:uppercase; value="+data.idprop+" >"+data.prop+"</option>");
			}
					break;
	    case '2':
			$('#MSJ_all').html('<div class="alert alert-success text-center" role="alert">'+data.mensaje_prop+'</div>');
					break;

	     case '3':

	     	$('#ValueA').val(data[0][0].Ele2);
				$('#prop_clave').val(data[0][0].Ele3);


	        break;
	    default:
	    	break;
	}
}
