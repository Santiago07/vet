

function showpreeview(action_of,instancia){
	var inst = instancia;
	var title = (action_of=='insert')?'Insertar un nuevo registro':'Detalles del registro existente';
	var type  = (action_of=='insert')?1:2;
	// $('#for-B').hide("slow");
	// $('#for-A').show("slow");
	empleados();
	$('#Sig_Atrs').html('Siguiente');
	$('#head_all').html(title);
	$('#insert_to_update').modal('show');
	$('#ValueAA').val(type);
	$('#activo').hide();
	$('.form-control').val('');
	$('.abil_action').prop("checked", false);
	// $('#save-show, #Edit_Atrs').hide('slow');
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
		$('#save-show,#VG').hide('slow');
		$('.enable-able-Txt,.abil_action').prop('disabled', true);
		$('#VC').prop('disabled',true);
	}
}

function guardadito_buton(){
	$('.enable-able-Txt').prop('disabled', false);
	$('.ext-dif').prop('disabled', true);
}

function empleados(){

		var datos = " "  ;
		var formURL = baseRut+"/catalogo/index/getempleados";
		var preload = '';
		var errores = '';
		var condicional = '9';
		sendInfo(formURL,datos,preload,errores,condicional);
}

function getinform(instancia){
	var datos = jQuery.parseJSON('{ "identy":"'+instancia+'"}' )   ;
	var formURL = baseRut+"/catalogo/index/getsomeinfousuarios";
	var preload = '#MSJ_all';
	var errores = '#MSJ_all';
	var condicional='3';
	sendInfo(formURL,datos,preload,errores,condicional);
}


$('#report_form').submit(function(e){
	e.preventDefault();
	var nombre_Emp = $('#VC').val();
	var selectEmp = $('#empleados option[value="'+nombre_Emp+'"]').html();
	$('#id_emp').val(selectEmp);
	var datos = $("#report_form").serialize();
	var formURL = baseRut+"/catalogo/index/thingusuarios";
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
		console.log(data);
			$('#MSJ_all').html('<div class="alert alert-success text-center" role="alert">'+data.mensaje+'</div>');
			var status = ($("input[name='valA']:checked").val()=="A")?'Activo':'Inactivo';
			var variantes = "'update','"+data.identidad+"'";
			$("#table_id > tbody").append('<tr id="'+data.identidad+'"><td>'+status+'</td><td>'+$('#VC').val()+' '+$('#VB').val()+'</td><td>'+data.usr+'</td><td><a onclick ="getPermisos('+data.identidad+')"><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span></a></td><td><a onclick="showpreeview('+variantes+')"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a></td></tr>');
			location.reload();
			linpiador_campos();
	        break;
	    case '2':
	    	$('#MSJ_all').html('<div class="alert alert-success text-center" role="alert">'+data.mensaje+'</div>');
	    	var registro = $('#ValueBB').val();
	    	var status = ($("input[name='valA']:checked").val()=="A")?'Activo':'Inactivo';
	    	$("#"+registro+" td:nth-child(1)").text(""+status+"");
	    	$("#"+registro+" td:nth-child(2)").text($('#VC').val()+' '+$('#VD').val());
	    	$("#"+registro+" td:nth-child(4)").text($("#sucur_list option:selected").text());
	    	restable_edit();
				location.reload();
	        break;
	    case '3':
			//console.log(data[0][0]);
	     	var sele1 = (data[0][0].usr_status=='A')?'1':'2';
	     	$("#VA"+sele1).prop("checked", true);
	     	$('#VC').val(data[0][0].nombre+" "+data[0][0].ape_pat+" "+data[0][0].ape_mat);
				$('#VB').val(data[0][0].usr_usuario);
	     	$('#element option[value="no"]').attr("selected", "selected");
	     	$('#sucur_list option[value="'+data[0][0].suc_clave+'"]').attr("selected", "selected");
	     	$('#puestos_list option[value="'+data[0][0].pto_clave+'"]').attr("selected", "selected");
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
	    case '7':
	    	var tablita = '<table id="table_id2" class="table table-striped"><thead><th><strong>Lista de los permisos en el sistema</strong></th></thead><tbody >';
	    	var permitidos = "";
	    	for (var i = 0 ; i < data[0].length ; i++) {
	    		var identificador = "selecpermiso('"+data[0][i].idEle1+"')";
	    		tablita += '<tr><td><div class="checkbox"><label><input type="checkbox" onclick="'+identificador+'" id="per'+data[0][i].idEle1+'" name="'+data[0][i].idEle1+'" value="'+data[0][i].idEle1+'" >'+data[0][i].Ele2+'</label></div></td></tr>';
	    	}
         	tablita += '</tbody></table>';
         	$('#permisasdynamicos').html(tablita);
         	if(data[1].length>0){
         		for (var w = 0 ; w < data[1].length ; w++) {
         			$( "#per"+data[1][w].perm_clave ).prop( "checked", true );
         			$( "#per"+data[1][w].perm_clave ).attr( "onclick", "deselecpermiso('"+data[1][w].perm_clave+"')");

         			permitidos+= data[1][w].perm_clave+",";
         		}

         	}

         	$('#table_id2').DataTable( {
					dom: 'Bfrtip',
					buttons: [
							'copy', 'csv', 'excel', 'pdf', 'print'
					]
			} );
			// $('#table_id2_wrapper > .dt-buttons ').hide();
			$("#asc_permi_change").val(permitidos);
			$('#Permi_tod_asc').val(data[0].length);
			$('#mensajes_permisos').html('');
	    	break;
	    case '8':
	    	$('#mensajes_permisos').html('<div class="alert alert-success text-center" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+data.Mensaje+'</div>');
	    	break;
				case '9':
				var empleado = '<option value=""></option>'
				for (var i = 0; i < data[0].length; i++) {
					empleado+='<option value="'+data[0][i].emp_nombre+" "+data[0][i].emp_apat+" "+data[0][i].emp_amat+'">'+data[0][i].emp_clave+'</option>';
				};
				$("#empleados").html(empleado);
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




function getPermisos (instancia){
	var datos = jQuery.parseJSON('{ "identy":"'+instancia+'"}' )   ;
	var formURL = baseRut+"/catalogo/index/getsistemapermisosasociados";
	var preload = '#MSJ_all';
	var errores = '#mensajes_permisos';
	var condicional='7';
	$('#myModalPermisos').modal('show');
	$('#mensajes_permisos').html('<center> Espere un momento.... </center><br><center><img src="'+baseRut+'/img/preload/cirPreload.GIF"></center>');
	$('#user_asc_permiso').val(instancia);
	sendInfo(formURL,datos,preload,errores,condicional);

}

$('#save_permisos_asc').submit(function(e){
	e.preventDefault();
	var datos = $("#save_permisos_asc").serialize();
	var formURL = baseRut+"/catalogo/index/insertsistemapermisos";
	var preload = '#MSJ_all';
	var errores = '#mensajes_permisos';
	var condicional = '8';
	$('#mensajes_permisos').html('<center> Espere un momento.... </center><br><center><img src="'+baseRut+'/img/preload/cirPreload.GIF"></center>');
	sendInfo(formURL,datos,preload,errores,condicional);
});


function selecpermiso(id){
	$( "#per"+id).attr( "onclick", "deselecpermiso('"+id+"')");
	var Elementos = $('#asc_permi_change').val();
	var Resultante = Elementos+id+",";
	$("#asc_permi_change").val(Resultante);
}

function deselecpermiso(id){
	$( "#per"+id).attr( "onclick", "selecpermiso('"+id+"')");
	var Elementos = $('#asc_permi_change').val();
	var Resultante = Elementos.replace(""+id+",", "");
	$("#asc_permi_change").val(Resultante);
}
