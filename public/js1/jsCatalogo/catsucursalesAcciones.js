

function showpreeview(action_of,instancia){
	var inst = instancia;
	var title = (action_of=='insert_sucursal')?'Insertar un nuevo registro':'Actualizar el registro existente';
	var type  = (action_of=='insert_sucursal')?1:2;
	$('#head_all').html(title);
	$('#insert_to_update').modal('show');
	$('#ValueAA').val(type);
	$('.form-control').val('');
	$('#MSJ_all').html(' ');
	$('#activo').hide();
	$("#Guardar_all").show('slow');
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
	var formURL = baseRut+"/catalogo/index/getsomeinfosuc";
	var preload = '#MSJ_all';
	var errores = '#MSJ_all';
	var condicional='3';
	sendInfo(formURL,datos,preload,errores,condicional);
}


$('#report_form').submit(function(e){
	e.preventDefault();
	var datos = $("#report_form").serialize();
	var formURL = baseRut+"/catalogo/index/thingsallsuc";
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
			var status = (data.estado=="1")?'Activo':'Inactivo';
			var ent_fed = $("#ValueG option:selected").html();
			var muni		= $('#ValueH option:selected').html();
			$('#MSJ_all').html('<div class="alert alert-success text-center" role="alert">'+data.mensaje+'</div>');
			$("#table_id > tbody").append("<tr id="+data.idsuc+"><td style=text-transform:uppercase>"+data.suc+"</td><td style=text-transform:uppercase>"+data.calle+"<b>  COL.  "+data.colonia+"</b>"+"</td><td style=text-transform:uppercase;>"+ent_fed+ "</td><td style=text-transform:uppercase;>"+muni+ "</td><td style=text-transform:uppercase;>"+status+ "</td><td class='text-center'><a onclick=showpreeview('update','"+data.idsuc+"')><span class='glyphicon glyphicon-search aria-hidden=true'></span></a></td></tr>");
				location.reload();
	        break;
    case '2':
			var status = (data.estado=="1")?'Activo':'Inactivo';
			var ent_fed = $("#ValueG option:selected").html();
			var muni		= $("#ValueH option:selected").html();
    	$('#MSJ_all').html('<div class="alert alert-success text-center" role="alert">'+data.mensaje+'</div>');
			var registro = $('#ValueBB').val();
			$("#"+registro+" td:nth-child(1)").text($('#ValueA').val());
    	$("#"+registro+" td:nth-child(2)").text(""+data.calle+' COL. '+data.colonia);
    	$("#"+registro+" td:nth-child(3)").text(""+ent_fed+"");
    	$("#"+registro+" td:nth-child(4)").text(""+muni+"");
			$("#"+registro+" td:nth-child(5)").text(""+status+"");
			$("#"+registro+" td:nth-child(6)").append("<a onclick=showpreeview(update,"+data.idsuc+")><span class=glyphicon glyphicon-search aria-hidden=true></span></a>")

				break;

	  case '3':
			//console.log(data[0][0]);


			var munis = $("#valHHH").html();
			var local = $("#valIII").html();

			$("#ValueH").html(munis);
			$("#ValueI").html(local);

	   	$('#ValueA').val(data[0][0].suc_nombre);
			$('#ValueB').val(data[0][0].suc_calle_no);
			$('#ValueC').val(data[0][0].suc_colonia);
			$('#ValueD').val(data[0][0].suc_cp);
			$('#ValueE').val(data[0][0].suc_tel);
			$('#ValueF').val(data[0][0].suc_fax);
			$('#ValueG').val(data[0][0].ef_clave);
			$('#ValueH').val(data[0][0].mun_clave);
			$('#ValueI').val(data[0][0].loc_clave);
			$('#ValueJ').val(data[0][0].fab_clave);
			$('#ValueK').val(data[0][0].suc_no_contable);
			$('#ValueL').val(data[0][0].codigo_factura);


			var status = data[0][0].status_suc;
			if (status==1) {
				$('#status').prop('checked',true);
			}else {
				$('#status').prop('checked',false);
			}

		case '4':
				for (var i = 0 ; i < data[0].length; i++) {
					opt+='<option value="'+data[0][i].idEle1+'" >'+data[0][i].nomEle2+'</option>';
				};

				$("#ValueH").html(opt);
				$("#MSJ_all").html("");

				break;
			case '5':
				var opt = '<option value="">Seleccione</option>';
				for (var i = 0; i < data[0].length; i++) {
					opt+='<option value="'+data[0][i].idEle1+'" >'+data[0][i].nomEle2+'</option>';
				};
				$("#ValueI").html(opt);
				$("#MSJ_all").html("");
				break;
	    default:
	    	break;
				$('.form-control').val('');
	}

}

$("#ValueG").change(function(){
	$("#ValueH").prop('disabled',false);
	var instancia = $("#ValueG").val();
	var datos = jQuery.parseJSON('{ "identy":"'+instancia+'"}' )   ;
	var formURL = baseRut+"/catalogo/index/getmunicipios";
	var preload = '#MSJ_all';
	var errores = '#MSJ_all';
	var condicional='4';
	sendInfo(formURL,datos,preload,errores,condicional);
});


$("#ValueH").change(function(){
	$("#ValueI").prop('disabled',false);
	var instancia = $("#ValueH").val();
	var datos = jQuery.parseJSON('{ "identy":"'+instancia+'"}' )   ;
	var formURL = baseRut+"/catalogo/index/getlocalidades";
	var preload = '#MSJ_all';
	var errores = '#MSJ_all';
	var condicional='5';
	sendInfo(formURL,datos,preload,errores,condicional);
});
$(document).ready(function() {
	$('#table_id').DataTable( {
			dom: 'Bfrtip',
			buttons: [
					'copy', 'csv', 'excel', 'pdf', 'print'
			]
	} );
} );
