

function showpreeview(action_of,instancia){
	var inst = instancia;
	var title = (action_of=='insert_sector')?'Insertar un nuevo registro':'Actualizar el registro existente';
	var type  = (action_of=='insert_sector')?1:2;
	$('.form-control').val('');
	$('#head_all').html(title);
	$('#insert_to_update').modal('show');
	$('#ValueAA').val(type);
	$('#activo').hide();
	$('#MSJ_all').html(' ');
	$("#Guardar_all").show('slow');
	// alert('Hola mundo');
	if(instancia!='null'){
		
		($('#Per_update').val()!=0)?$("#Guardar_all").show('slow'):$("#Guardar_all").hide();		
		$('#activo').show();
		$('#ValueBB').val(inst);
		getinform(instancia);
		$('#MSJ_all').html(' ');

	}


}

function getinform(instancia){
	//get information of the registry
	var datos = jQuery.parseJSON('{ "identy":"'+instancia+'"}' )   ;
	var formURL = baseRut+"/catalogo/index/getsomeinfosec";
	var preload = '#MSJ_all';
	var errores = '#MSJ_all';
	var condicional='3';
	sendInfo(formURL,datos,preload,errores,condicional);
}


$('#report_form').submit(function(e){
	e.preventDefault();
	var datos = $("#report_form").serialize();
	var formURL = baseRut+"/catalogo/index/thingsallsec";
	var preload = '#MSJ_all';
	var errores = '#MSJ_all';
	var condicional = $('#ValueAA').val();
	sendInfo(formURL,datos,preload,errores,condicional);
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
     	$(preload).html('<center> Espere un momento.... </center><br><center><img src="'+baseRut+'/img/preload/39_1.gif"></center>');
 	},
 	success:function(data){
 		respuestas(data,condicional);
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

function respuestas(data,condicional){

	switch(condicional) {
		case '1':
			$('#MSJ_all').html('<div class="alert alert-success text-center" role="alert">'+data.mensaje+'</div>');
			$("#table_id > tbody").append("<tr><td style=text-transform:uppercase;>"+data.sector+ "</td><td>"+((data.status=='A')?"Activo":"Inactivo")+"</td><td class='text-center'><a onclick=showpreeview('update','"+data.idsectores+"')><span class='glyphicon glyphicon-search aria-hidden=true'></span></a></td></tr>");
	        break;
	    case '2':
	    	$('#MSJ_all').html('<div class="alert alert-success text-center" role="alert">'+data.mensaje+'</div>');
				var registro = $('#ValueBB').val();
	    	var status = ($("input[name='status']:checked").val()=="A")?'Activo':'Inactivo';
	    	$("#"+registro+" td:nth-child(1)").text($('#ValueA').val());
	    	$("#"+registro+" td:nth-child(2)").text(""+status+"");
				location.reload();
					break;
	     case '3':
	     	$('#ValueA').val(data[0][0].Ele2);
				var sele1 = (data[0][0].Ele3=="A")?"A":"I";
	     	$("#status"+sele1).prop("checked", true);


	        break;
	    default:
	    	break;
	}
}
$(document).ready(function() {
	$('#table_id').DataTable( {
			dom: 'Bfrtip',
			buttons: [
					'copy', 'csv', 'excel', 'pdf', 'print'
			]
	} );
} );
