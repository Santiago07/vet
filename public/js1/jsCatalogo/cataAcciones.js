

function showpreeview(action_of,instancia){
	var inst = instancia;
	var title = (action_of=='insert')?'Insertar un nuevo registro':'Detalles del registro existente';
	var type  = (action_of=='insert')?1:2;
	$('#for-B').hide("slow");
	$('#for-A').show("slow");
	$('#activo').hide();
	$('#Sig_Atrs').html('Siguiente');
	$('#head_all').html(title);
	$('#insert_to_update').modal('show');
	$('#ValueAA').val(type);
	$('.form-control').val('');
	$('.abil_action').prop("checked", false);
	$('#save-show, #Edit_Atrs').hide('slow');
	guardadito_buton();
	$('#MSJ_all').html(' ');
	(instancia!='null')?$('#Sig_Atrs').attr('onclick','SigVen(2)'):$('#Sig_Atrs').attr('onclick','SigVen(1)');
	$("#Guardar_all").show('slow');
	if(instancia!='null'){
		($('#Per_update').val()!=0)?$("#Guardar_all").show('slow'):$("#Guardar_all").hide('slow');
		$('#activo').show();
		$('#ValueBB').val(inst);
		getinform(instancia);
		$('#MSJ_all').html(' ');
		$('.enable-able-Txt,.abil_action').prop('disabled', true);
	}
}

function guardadito_buton(){
	$('.enable-able-Txt').prop('disabled', false);
	$('.ext-dif').prop('disabled', true);
}


function getinform(instancia){
	var datos = jQuery.parseJSON('{ "identy":"'+instancia+'"}' )   ;
	var formURL = baseRut+"/catalogo/index/getsomeinfo";
	var preload = '#MSJ_all';
	var errores = '#MSJ_all';
	var condicional='3';
	sendInfo(formURL,datos,preload,errores,condicional);
}


$('#report_form').submit(function(e){
	e.preventDefault();
	var datos = $("#report_form").serialize();
	var formURL = baseRut+"/catalogo/index/thingstodo";
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
			$("#table_id > tbody").append('<tr id="'+data.identidad+'"><td>'+$('#VC').val()+'</td><td>'+$('#VD').val()+'</td><td>'+$('#VF').val()+'</td><td>'+data.fecha+'</td><td>'+status+'</td><td><a onclick="showpreeview('+variantes+')"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a></td></tr>');
			linpiador_campos();
	        break;
	    case '2':
	    	$('#MSJ_all').html('<div class="alert alert-success text-center" role="alert">'+data.mensaje+'</div>');
	    	var registro = $('#ValueBB').val();
	    	var status = ($("input[name='valA']:checked").val()=="A")?'Activo':'Inactivo';
	    	$("#"+registro+" td:nth-child(1)").text($('#VC').val());
	    	$("#"+registro+" td:nth-child(2)").text($('#VD').val());
	    	$("#"+registro+" td:nth-child(3)").text($('#VF').val());
	    	$("#"+registro+" td:nth-child(5)").text(""+status+"");
	    	restable_edit();
	        break;
	    case '3':

    		$("#vend_list").html($( "#sourceUser").html());
    		$("#Muni_list").html($( "#sourceMuni").html());
    		$("#Local_list").html($( "#sourceLocal").html());
	     	var sele1 = (data[0][0].cli_status=='A')?1:2;
	     	$("#VA"+sele1).prop("checked", true);
	     	var sele2 = (data[0][0].cli_tipo=='Fisica')?1:2;
	     	$("#VB"+sele2).prop("checked", true);
	     	if(data[0][0].cli_nombre){$("#VC").val(data[0][0].cli_nombre)}
	     	if(data[0][0].cli_alias){$("#VD").val(data[0][0].cli_alias)}
	     	if(data[0][0].cli_homepage){$("#VE").val(data[0][0].cli_homepage)}
	     	if(data[0][0].cli_rfc){$("#VF").val(data[0][0].cli_rfc)}
	     	if(data[0][0].cli_monto_max){$("#VG").val(data[0][0].cli_monto_max)}
	     	if(data[0][0].cli_dias_max){$("#VH").val(data[0][0].cli_dias_max)}
	     	var diaspag =data[0][0].cli_dia_pago;
	     	var DiaPagos = diaspag.split(',');
	     	for (var i =0 ; i <DiaPagos.length ; i++) {
	     		switch(DiaPagos[i]){
	     			case '1':
	     				$("#VI").prop("checked", true);
	     				break;
	     			case '2':
	     				$("#VJ").prop("checked", true);
	     				break;
	     			case '3':
	     				$("#VK").prop("checked", true);
	     				break;
	     			case '4':
	     				$("#VL").prop("checked", true);
	     				break;
	     			case '5':
	     				$("#VM").prop("checked", true);
	     				break;
	     			case '6':
	     				$("#VN").prop("checked", true);
	     				break;
	     			case '7':
	     				$("#VNN").prop("checked", true);
	     				break;
	     			default:
	     				break;
	     		}
	     	};
	     	var diasRev =data[0][0].cli_dia_revision;
	     	var DiaREV = diasRev.split(',');
	     	for (var i =0 ; i <DiaREV.length ; i++) {
	     		switch(DiaREV[i]){
	     			case '1':
	     				$("#VO").prop("checked", true);
	     				break;
	     			case '2':
	     				$("#VP").prop("checked", true);
	     				break;
	     			case '3':
	     				$("#VQ").prop("checked", true);
	     				break;
	     			case '4':
	     				$("#VR").prop("checked", true);
	     				break;
	     			case '5':
	     				$("#VS").prop("checked", true);
	     				break;
	     			case '6':
	     				$("#VT").prop("checked", true);
	     				break;
	     			case '7':
	     				$("#VU").prop("checked", true);
	     				break;
	     			default:
	     				break;
	     		}
	     	};
	     	if(data[0][0].cli_horario_pago){$("#VV").val(data[0][0].cli_horario_pago)}
	     	if(data[0][0].cli_horario_revision){$("#VW").val(data[0][0].cli_horario_revision)}
	     	$('#sect_list option[value="'+data[0][0].sec_clave+'"]').attr("selected", "selected");
	     	$('#sucur_list option[value="'+data[0][0].suc_clave+'"]').attr("selected", "selected");
	    	$('#vend_list option[value="'+data[0][0].usr_clave+'"]').attr("selected", "selected");
	    	if(data[0][0].cli_no_contable){$("#VAA").val(data[0][0].cli_no_contable)}
	    	if(data[0][0].cli_consignacion=='1'){$("#VBB").prop("checked", true)}
	    	if(data[0][0].cli_forma_pago){$("#VCC").val(data[0][0].cli_forma_pago)}
	    	if(data[0][0].num_cuenta){$("#VDD").val(data[0][0].num_cuenta)}

	    	if(data[0][1].dir_calle_no){$("#VEE").val(data[0][1].dir_calle_no)}
	    	if(data[0][1].dir_colonia){$("#VFF").val(data[0][1].dir_colonia)}
	    	if(data[0][1].dir_cp){$("#VGG").val(data[0][1].dir_cp)}
	    	if(data[0][1].dir_cel){$("#VHH").val(data[0][1].dir_cel)}
	    	if(data[0][1].dir_tel){$("#VII").val(data[0][1].dir_tel)}
	    	if(data[0][1].dir_extension){$("#VJJ").val(data[0][1].dir_extension)}
		    if(data[0][1].dir_tel2){$("#VKK").val(data[0][1].dir_tel2)}
		    if(data[0][1].dir_fax){$("#VLL").val(data[0][1].dir_fax)}
		    $('#Entida_lis option[value="'+data[0][1].ef_clave+'"]').attr("selected", "selected");
			$('#Muni_list option[value="'+data[0][1].mun_clave+'"]').attr("selected", "selected");
			$('#Local_list option[value="'+data[0][1].loc_clave+'"]').attr("selected", "selected");
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
	     	var informe= '<div class="alert alert-success text-center" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+data.Mensaje+'</div>';
	     	$("#alert_message_segui").html(informe);
	     	$(".clear").val("");
			$( ".clearTest" ).prop( "checked", false );
			clearReasignados();
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


function SigVen(accion){

	var acciones = accion;
	var texto =$("#Sig_Atrs").html();

	if(acciones=='1'){
		switch(texto){
			case "Siguiente":
				$("#Sig_Atrs").html("Atras");
				$('#save-show').show('slow');

				break;
			case "Atras":
				$("#Sig_Atrs").html("Siguiente");
				$('#save-show').hide('slow');
				break;
		}
	}
	if(acciones=='2'){
		switch(texto){
			case "Siguiente":
				$("#Sig_Atrs").html("Atras");
				$('#Edit_Atrs').show('slow');

				break;
			case "Atras":
				$("#Sig_Atrs").html("Siguiente");
				$('#Edit_Atrs').hide('slow');
				break;
		}
	}
	$("#for-B, #for-A" ).toggle("slow");
}

function mostrandole(){
	$('#MSJ_all').html('<div class="alert alert-info" role="alert"><center>Formulario listo para la edicion de información</center></div>');
	$('#Sig_Atrs').attr('onclick','SigVen(1)');
	$('#Edit_Atrs').hide('slow');
	$('#save-show').show('slow');
	guardadito_buton();
}

$("#Entida_lis").change(function(){
	var instancia = $("#Entida_lis").val();
	var datos = jQuery.parseJSON('{ "identy":"'+instancia+'"}' )   ;
	var formURL = baseRut+"/catalogo/index/getmunicipios";
	var preload = '#MSJ_all';
	var errores = '#MSJ_all';
	var condicional='4';
	sendInfo(formURL,datos,preload,errores,condicional);
	$('#Muni_list').prop('disabled', false);
});


$("#Muni_list").change(function(){
	var instancia = $("#Muni_list").val();
	var datos = jQuery.parseJSON('{ "identy":"'+instancia+'"}' )   ;
	var formURL = baseRut+"/catalogo/index/getlocalidades";
	var preload = '#MSJ_all';
	var errores = '#MSJ_all';
	var condicional='5';
	sendInfo(formURL,datos,preload,errores,condicional);
	$('#Local_list').prop('disabled', false);
});


$("#sucur_list").change(function(){
	var instancia = $("#sucur_list").val();
	var datos = jQuery.parseJSON('{ "identy":"'+instancia+'"}' )   ;
	var formURL = baseRut+"/catalogo/index/getvendedor";
	var preload = '#MSJ_all';
	var errores = '#MSJ_all';
	var condicional='6';
	sendInfo(formURL,datos,preload,errores,condicional);
	$('#vend_list').prop('disabled', false);
});


$('#VG, #VH').change(function(){
	var valP = $('#VG').val();
	var valS = $('#VH').val();
	if(valP > 0  && valS > 0 ){
		$('.abil_action').prop('disabled', false);

	}else{
		$('.abil_action').attr('checked',false);
		$('#ValueE, #ValueF').val("");
		$('.abil_action').prop('disabled', true);
	}


});
$(document).ready(function() {
	$('#table_id').DataTable( {
			dom: 'Bfrtip',
			buttons: [
					'copy', 'csv', 'excel', 'pdf', 'print'
			]
	} );
} );


function showseguivore(identi){

	$('#seguimientoSegmento').modal('show');
	$("#respon,#allUserResponsables").html($("#user_source").html());
	var soyYo= $("#soy_yo_principal").val();
	$('#respon option[value="'+soyYo+'"]').prop('selected', true);
	$("#Clien_Client_ident").val(identi);
	$(".clear").val("");
	$( ".clearTest" ).prop( "checked", false );
	$("#alert_message_segui").html("");
	var nombre = $('#'+identi).children('td:first').html();
	$('#persn_segui').html(nombre);
}
$("#respon").change(function(){
	var respon_new = $( "#respon option:selected" ).val();
	$("#soy_yo").val(respon_new);
});

$("#AnexaSeguimiento").submit(function(e){
	e.preventDefault();
	// alert("Trataste de enviar ?");
	var datos = $("#AnexaSeguimiento").serialize();
	var formURL = baseRut+"/catalogo/index/insertReporteSeguimiento";
	var preload = '#MSJ_all';
	var errores = '#MSJ_all';
	var condicional = '7';
	sendInfo(formURL,datos,preload,errores,condicional);
});

$( "#allUserResponsables" ).dblclick(function() {
	var Valor = $( "#allUserResponsables option:selected" ).val();
	var texto = $( "#allUserResponsables option:selected" ).text();
	$("#pegandoResponsables").append("<option value='"+Valor+"'>"+texto+"</option>");
	var Elementos = $("#reaaaasignados").val()+","+Valor;
	$("#reaaaasignados").val(Elementos);
});


function clearReasignados(){
	$("#pegandoResponsables").html("");
	$("#reaaaasignados").val("");
}
