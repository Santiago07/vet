

function showpreeview(action_of,instancia){
	var inst = instancia;
	var title = (action_of=='insert')?'Insertar un nuevo registro':'Detalles del registro existente';
	var type  = (action_of=='insert')?1:2;
	$('#Sig_Atrs').html('Siguiente');
	$('#head_all').html(title);
	$('#insert_to_update').modal('show');
	$('#ValueAA').val(type);
	$('.form-control').val('');
	$('.abil_action').prop("checked", false);
	$('#activo').hide();
	$('#Edit_Atrs').hide('slow');
	$('#save-show').show('slow');
	$('#VG').show('slow');
	$('#Upta_datos').hide('slow');
	guardadito_buton();
	$('#MSJ_all').html(' ');
	$("#ValueCC").val('null');
	(instancia!='null')?$('#Sig_Atrs').attr('onclick','SigVen(2)'):$('#Sig_Atrs').attr('onclick','SigVen(1)');
	if(instancia!='null'){
		$('#activo').show();
		$('#ValueBB').val(inst);
		getinform(instancia);
		$('#MSJ_all').html(' ');
		$('#Edit_Atrs,#Upta_datos').show('slow');
		$('#save-show').hide('slow');
		$('.enable-able-Txt,.abil_action').prop('disabled', true);
	}
}

function guardadito_buton(){
	$('.enable-able-Txt').prop('disabled', false);
	$('.ext-dif').prop('disabled', true);
}


function getinform(instancia){
	var datos = jQuery.parseJSON('{ "identy":"'+instancia+'"}' )   ;
	var formURL = baseRut+"/catalogo/index/getsomeinfocontactocat";
	var preload = '#MSJ_all';
	var errores = '#MSJ_all';
	var condicional='3';
	sendInfo(formURL,datos,preload,errores,condicional);
}


$('#report_form').submit(function(e){
	e.preventDefault();
	var datos = $("#report_form").serialize();
	var formURL = baseRut+"/catalogo/index/thingscontactoscat";
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
     	$(preload).html('<center> Espere un momento.... </center><br><center><img src="'+baseRut+'/img/preload/27.gif"></center>');
 	},
 	success:function(data){
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

	switch(condicional) {
		case '1':
			$('#MSJ_all').html('<div class="alert alert-success text-center" role="alert">'+data.mensaje+'</div>');
			var status = ($("input[name='valA']:checked").val()=="A")?'Activo':'Inactivo';
			var variantes = "'update','"+data.identidad+"'";
			$("#table_id > tbody").append('<tr id="'+data.identidad+'"><td>'+status+'</td><td>'+$("#VC").val()+' '+$("#VD").val()+' '+$("#VE").val()+'</td><td>'+$("#VB").val()+'</td><td>'+$("#VG").val()+'</td><td>'+data.fecha+'</td><td>'+$( "#sucur_list option:selected" ).text()+'</td><td><a onclick="showpreeview('+variantes+')"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a></td></tr>');
			linpiador_campos();
	        break;
	    case '2':
	    	// alert('Aqui se guardan los datos');
	    	$('#MSJ_all').html('<div class="alert alert-success text-center" role="alert">'+data.mensaje+'</div>');
	    	var registro = $('#ValueBB').val();
	    	var status = ($("input[name='valA']:checked").val()=="A")?'Activo':'Inactivo';
	    	$("#"+registro+" td:nth-child(1)").text(""+status+"");
	    	$("#"+registro+" td:nth-child(2)").text($('#VC').val()+' '+$('#VD').val()+' '+$('#VE').val());
	    	$("#"+registro+" td:nth-child(3)").text($('#VB').val());
	    	$("#"+registro+" td:nth-child(4)").text($('#VG').val());
	    	$("#"+registro+" td:nth-child(6)").text($("#sucur_list option:selected").text());
	    	restable_edit();
	        break;
	    case '3':
	     	var sele1 = (data[0][0].conta_status=='A')?'1':'2';
	     	$("#VA"+sele1).prop("checked", true);
	     	$("#VB").val(data[0][0].conta_alias);
	     	$("#VC").val(data[0][0].conta_nombre);
	     	$("#VD").val(data[0][0].conta_apat);
	     	$("#VE").val(data[0][0].conta_amat);
	     	$('#sucur_list option[value="'+data[0][0].cli_clave+'"]').attr("selected", "selected");
	     	$("#VG").val(data[0][0].conta_email);


	        break;
	    case '4':
	    	var opt = '<option value="">Seleccione</option>';
	    	for (var i = 0; i < data[0].length; i++) {
	    		opt+='<option value="'+data[0][i].idEle1+'" >'+data[0][i].nomEle2+'</option>';
	    	};
	    	$("#Muni_list").html(opt);
	    	$("#MSJ_all").html("");
	    	break;
	    case '5':
	    	var opt = '<option value="">Seleccione</option>';
	    	if(data[0].length!=0){
	    		for (var i = 0; i < data[0].length; i++) {
	    			opt+='<option value="'+data[0][i].idEle1+'" >'+data[0][i].nomEle2+'</option>';
	    		};
	    	}
	    	$("#Local_list").html(opt);
	    	$("#MSJ_all").html("");
	    	break;
	    case '6':
	    	var opt = '<option value="">Seleccione</option>';
	    	if(data[0].length!=0){
	    		for (var i = 0; i < data[0].length; i++) {
	    			opt+='<option value="'+data[0][i].idEle1+'" >'+data[0][i].Ele2+' '+data[0][i].Ele3+'</option>';
	    		};
	    	}
	    	$("#vend_list").html(opt);
	    	$("#MSJ_all").html("");
	    	break;

	    default:
	    	break;
	}

}

function restable_edit(){
	$('.enable-able-Txt,.abil_action').prop('disabled', true);
	$('#Sig_Atrs').attr('onclick','SigVen(2)');
	$('#save-show').hide('slow');
	$('#Edit_Atrs').show('slow');
}


function linpiador_campos(){
	$('.form-control').val('');
	$('.abil_action').prop("checked", false);
}



function mostrandole(){
	$('#MSJ_all').html('<div class="alert alert-info" role="alert"><center>Formulario listo para la edicion de información</center></div>');
	$('#Sig_Atrs').attr('onclick','SigVen(1)');
	$('#Edit_Atrs').hide('slow');
	$('#save-show').show('slow');
	guardadito_buton();
}








function nueva_key(acepta){
	var acept = acepta;
	$("#ValueCC").val(acept);
	$('#Upta_datos').hide();
	$('#VG').show('slow');
}

$(document).ready(function() {
	$('#table_id').DataTable( {
			dom: 'Bfrtip',
			buttons: [
					'copy', 'csv', 'excel', 'pdf', 'print'
			]
	} );
} );
