
var contador = 0;



// Especificas


$('#clientepaciente').change(function(){
	var ele = $(this).val();
	if($(this).val()){
		$("#Anexar_asc_asc").attr("data-target","#myModal");
		var ident = $(this).val();
		var formURL = baseRut+"/muestra/index/paciente/"+ident;		
		var preload = '#MSJ_all';
		var errores = '#MSJ_all';
		var condicional = '1';
		sendInfoGet(formURL,preload,errores,condicional);
		$("#client_select_anex").val(ident);
	}else{
		
		$("#Anexar_asc_asc").attr("data-target","");
		$("#Pacientes_asc_asc").html("<option value> Seleciona </option>").prop( "disabled", true );
	}

});



$("#pacient_add_new").submit(function(e){
	e.preventDefault();		
	var ident = $(this).val();
	var formURL = baseRut+"/muestra/index/pacientsave";		
	var preload = '#Carga_paciente';
	var errores = '#errors_pacient';
	var condicional = '2';
	var datos = $( this ).serialize()
	sendInfoPost(formURL,datos,preload,errores,condicional);

});


$("#principal_form").submit(function(e){
	e.preventDefault();
	var add = $('#tab_ascc_pac_clien_tab >tbody >tr').length;
	
	$("#alert_ok,#alert_cancel,#Carga_paquete_completo_error,#Carga_paquete_completo").hide('slow');
	if( add > 1 ){

		
		// $("#alert_ok").show("slow");
		// var ident = $(this).val();
		var esp_inf = '<input type="hidden" name="vueltas_asc" value="'+contador+'">';
		$("#hide_inf").append(esp_inf);
		var formURL = baseRut+"/muestra/index/paquetesconmuestras";		
		var preload = '#Carga_paquete_completo';
		var errores = '#Carga_paquete_completo_error';
		var condicional = '3';
		var datos = $( this ).serialize();
		sendInfoPost(formURL,datos,preload,errores,condicional);
	}else{
		$("#alert_cancel").show("slow");
	}
	
});


//Envios

function sendInfoGet(ruta,preload,errores,condicional){	
	
	var ajax = $.ajax({
		type: "GET",
		url: ruta,
		async: true,
		dataType: "json",
		beforeSend: function(x) {
			if(x && x.overrideMimeType) {
			}
			$(preload).show();
		},
		success: function(data){
			
			respuestas(data,condicional);
			$(preload).hide();
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

function sendInfoPost(ruta,datos,preload,errores,condicional){
	$.ajax({
		url : ruta,
		type: "POST",
		data : datos,
		dataType: "json",
		beforeSend: function(x) {
			if(x && x.overrideMimeType) {
			}
			$(preload).show();
		},
		success:function(data){
			respuestas(data,condicional);
			$(preload).hide();
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
			var opt = '<option value="">Seleciona</option>';
			for (var i = 0; i < data.length; i++) {
				opt+='<option value="'+data[i].paciente_clave+'">'+data[i].nombre+' '+data[i].ap_paterno+' '+data[i].ap_materno+'</option>';
			};			
			$("#Pacientes_asc_asc").html(opt).prop( "disabled", false );					
			break;
		case '2':			
			var contenido = data.Exito;
			var Msd_Exito = '<div class="alert alert-success alert-dismissible fade in text-center" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><h4><span class="glyphicon glyphicon-ok" aria-hidden="true"> '+contenido+' </span> </h4></div>';		
			$("#errors_pacient").html(Msd_Exito);
			var opt = '<option value="">Seleciona</option>';						
			for (var i = 0; i < data.regisAll.length; i++) {
				opt+='<option value="'+data.regisAll[i].paciente_clave+'">'+data.regisAll[i].nombre+' '+data.regisAll[i].ap_paterno+' '+data.regisAll[i].ap_materno+'</option>';
			};
			$("#Pacientes_asc_asc").html(opt);
			clearContenido();			
			break;
		case '3':
			// $("#alert_ok").show("slow");
			console.log("Todo es exitoso");
			break;
		case '4':	
			break;
		default:
			break;	
	}
}



// Generales
function especialModal(){
	clearContenido();
	elimnaMSjError();
}

function clearContenido(){
	$(".anex_pac").val("");
	
}
function elimnaMSjError(){
	$("#errors_pacient").html("");
}

function mostrarSeccionUno(){
	$("#oculta_form, #add_some_muestra, #msj-pre, #Botones_muestra_registro").toggle("slow");
	$("#alert_ok,#alert_cancel").hide('slow');

}


$("#anexa_muestra_asc").submit(function(e){
	e.preventDefault();	
	contador++;
	var stdLab = $("#std_inter_sel option:selected").text();
	var valStdlab = $("#std_inter_sel option:selected").val();
	var noInter = $("#No_int").val();
	var client = $("#clientepaciente option:selected").text();
	var noClient = $("#clientepaciente option:selected").val();
	var pacient = $("#Pacientes_asc_asc option:selected").text();
	var noPacient = $("#Pacientes_asc_asc option:selected").val();
	var identidad = "'"+noInter+"-"+contador+"'";
	var espe = "'"+contador+"'";
	var btm = '<button type="button" class="btn btn-warning" data-toggle="tooltip" data-placement="right" title="Eliminar" onclick="filaDelete('+identidad+','+espe+')"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>';
	var col = "<tr id="+identidad+"><td>"+noInter+"</td><td>"+stdLab+"</td><td>"+client+"</td><td>"+pacient+"</td><td>"+btm+"</td></tr>";
	var val1 = '<input type="hidden" name="stdLab'+contador+'" value="'+valStdlab+'">';
	var val2 = '<input type="hidden" name="noInter'+contador+'" value="'+noInter+'">';
	var val3 = '<input type="hidden" name="client'+contador+'" value="'+noClient+'">';
	var val4 = '<input type="hidden" name="pacient'+contador+'" value="'+noPacient+'">';
	var paq = '<div id="paq_hid'+contador+'">'+val1+val2+val3+val4+'</div>';
	$("#hide_inf").append(paq);
	$("#tab_ascc_pac_clien_tab tr:last").after(col);

});

function filaDelete(identidad,oculto){	
	var row = identidad; 
	var ocl = oculto
	$('#'+row).hide("slow",function(){$(this).remove()});
	$("#paq_hid"+ocl).html("");
}





