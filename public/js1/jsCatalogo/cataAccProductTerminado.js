

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
	if(instancia!='null'){
		$('#ValueBB').val(inst);
		$('#activo').show();
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
	var formURL = baseRut+"/catalogo/index/getsomeinfoprovedor";
	var preload = '#MSJ_all';
	var errores = '#MSJ_all';
	var condicional='3';
	sendInfo(formURL,datos,preload,errores,condicional);
}


$('#report_form').submit(function(e){
	e.preventDefault();
	var datos = $("#report_form").serialize();
	var formURL = baseRut+"/catalogo/index/thingsallprovedor";
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
			var Estado = $("#Entida_lis option:selected").text();
			var Municipio = $("#Muni_list option:selected").text();
			var Localidad = $("#Local_list option:selected").text();
			var dir = $("#VH").val();
			$("#table_id_XD > tbody").append('<tr id="'+data.identidad+'"><td>'+status+'</td><td>'+$('#VB').val()+'</td><td>'+$('#VC').val()+'</td><td>'+$('#VD').val()+'</td><td>'+Estado+'</td><td>'+Municipio+'</td><td>'+Localidad+'</td><td>'+dir+'</td><td><a onclick="showpreeview('+variantes+')"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a></td></tr>');

			linpiador_campos();
	        break;
	    case '2':
	    	$('#MSJ_all').html('<div class="alert alert-success text-center" role="alert">'+data.mensaje+'</div>');
	    	var registro = $('#ValueBB').val();
	    	var status = ($("input[name='valA']:checked").val()=="A")?'Activo':'Inactivo';
	    	$("#"+registro+" td:nth-child(1)").text(""+status+"");
	    	$("#"+registro+" td:nth-child(2)").text($('#VB').val());
	    	$("#"+registro+" td:nth-child(3)").text($('#VC').val());
	    	$("#"+registro+" td:nth-child(4)").text($('#VD').val());
	    	$("#"+registro+" td:nth-child(5)").text($("#Entida_lis option:selected").text());
	    	$("#"+registro+" td:nth-child(6)").text($("#Muni_list option:selected").text());
	    	$("#"+registro+" td:nth-child(7)").text($("#Local_list option:selected").text());
	    	$("#"+registro+" td:nth-child(7)").text($("#VH").val());
	    	restable_edit();
	        break;
	    case '3':
	    	//get information and put in the form
	    	$("#Muni_list").html($('#sourceMuni').html());
	    	$("#Local_list").html($('#sourceLocal').html());
		    var sele1 = (data[0][0].prov_status=='1')?1:2;
		    $("#VA"+sele1).prop("checked", true);
		    $("#VB").val(data[0][0].prov_razon_social);
		    $("#VC").val(data[0][0].prov_rfc);
		    $("#VD").val(data[0][0].prov_email);
		    $("#VE").val(data[0][0].no_cuenta_contable);
		    $("#VF").val(data[0][0].prov_diasmax);
		    $("#VG").val(data[0][0].prov_homepage);
		    $("#VH").val(data[0][0].prov_calle_no);
		    $("#VI").val(data[0][0].prov_colonia);
		    $("#VJ").val(data[0][0].prov_cp);
		    $("#VK").val(data[0][0].prov_cel);
		    $("#VL").val(data[0][0].prov_tel);
		    $("#VM").val(data[0][0].prov_ext);
		    $("#VN").val(data[0][0].prov_tel2);
		    $("#VO").val(data[0][0].prov_fax);
		    $('#Entida_lis option[value="'+data[0][0].ef_clave+'"]').attr("selected", "selected");
		    $('#Muni_list option[value="'+data[0][0].mun_clave+'"]').attr("selected", "selected");
		    $('#Local_list option[value="'+data[0][0].loc_clave+'"]').attr("selected", "selected");
	        break;
	    case '4':
	    	Console.log("Estas en el caso 4");
	    	var opt = '<option value="">Seleccione</option>';
	    	for (var i = 0; i < data[0].length; i++) {
	    		opt+='<option value="'+data[0][i].Ele1+'" >'+data[0][i].Ele2+'</option>';
	    	};
	    	$("#propiedad_lis").html(opt);
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
// Mod Luis 1
$("#linea_lis").change(function(){
	var instancia = $("#linea_lis").val();
	var datos = jQuery.parseJSON('{ "identy":"'+instancia+'"}' )   ;
	var formURL = baseRut+"/catalogo/index/getPropiedadesrela";
	var preload = '#MSJ_all';
	var errores = '#MSJ_all';
	var condicional='4';
	sendInfo(formURL,datos,preload,errores,condicional);
	// $('#Muni_list').prop('disabled', false);
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
