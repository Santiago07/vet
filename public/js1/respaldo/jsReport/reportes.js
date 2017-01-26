$('#SelcRepot').change(function(){	
	if($('#SelcRepot option:selected').val()>0){
		var select_now = $('#SelcRepot option:selected').html();		
		$('#DinaSelect').html(select_now);
		$(".desha").removeAttr("disabled");
		getSelecion($('#SelcRepot option:selected').val());
	}else{
		$(".desha").val("").attr("disabled","true");
		
		$('#var_op').html('<option selected>Selecione</option>');
	}
});

function getSelecion(tipodeinfo){
	$(".rebusqueda").val('');
    var valor = tipodeinfo;      
    var ajax = $.ajax({
	type: "GET",
	url: baseRut+"/reportes/index/getmunicipios/"+valor,
	async: true,
	dataType: "json",
	beforeSend: function(x) {
		if(x && x.overrideMimeType) {
		   x.overrideMimeType("application/j-son;charset=UTF-8");
		   $('#msj_other').html('<center><img src="'+baseRut+'/img/preload/reloj.gif"><p>Espere un momento</p></center>');
		}
		},
		success: function(data){
		$('#var_op').html('');
		var options = '<option value="" selected>Selecione</option>';
		// console.log("Este es el total que hay"+data.length)
		if(valor==1){
			for (var i = 0; i < data.length; i++) {
		      // options += '<option value="' + data[i].lin_clave + '">' + data[i].lin_desc + '</option>';
		      options += '<option value="' + data[i].lin_desc  + '">' +data[i].lin_clave  + '</option>';
		   	}
		}
		if(valor==2){
			for (var i = 0; i < data.length; i++) {
		      // options += '<option value="' + data[i].suc_clave+'">' + data[i].suc_nombre + '</option>';
		      options += '<option value="' + data[i].suc_nombre+'">' + data[i].suc_clave + '</option>';
		   	}
		}
		if(valor==3){
			for (var i = 0; i < data.length; i++) {
		      // options += '<option value="' + data[i].usr_clave+'">'+data[i].usr_nombre+' '+data[i].usr_apellidos+'</option>';
		      options += '<option value="' +data[i].usr_nombre+' '+data[i].usr_apellidos+'">'+data[i].usr_clave+'</option>';
		   	}
		}

		if(valor==4){
			for (var i = 0; i < data.length; i++) {
		      // options += '<option value="' + data[i].cli_clave+'">'+data[i].cli_nombre+'</option>';
		      options += '<option value="' + data[i].cli_nombre+' / '+data[i].cli_alias+'">'+data[i].cli_clave+'</option>';
		   	}
		}
		if(valor==5){
			for (var i = 0; i < data.length; i++) {
		      // options += '<option value="' + data[i].cli_clave+'">'+data[i].cli_nombre+'</option>';
		      options += '<option value="' + data[i].prod_desc+'">'+data[i].prod_clave+'</option>';
		   	}
		}
		if(valor==6){
			for (var i = 0; i < data.length; i++) {
		      // options += '<option value="' + data[i].cli_clave+'">'+data[i].cli_nombre+'</option>';
		      options += '<option value="' + data[i].sec_desc+'">'+data[i].sec_clave+'</option>';
		   	}
		}
		$('#var_op').html(options);
		options = "";	
		$('#msj_other').html('');
		}
    });
}

$('#report_form').submit(function(e){ 
	e.preventDefault(); 
	var seleAcor = $('#re_bus').val();
	var seleValr = $('#var_op> option[value="'+seleAcor+'"]').html();
	$('#slOrden').val(seleValr);                                         
	if($('#dataI').val()>$('#dataF').val()){
		$('#msj_other').html('<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><center><span class="glyphicon glyphicon-warning-sign" aria-hidden="true"></span> La fecha de inicio tiene que ser menor a la final <span class="glyphicon glyphicon-warning-sign" aria-hidden="true"></span></center></div>');
	}else{
	var IniFe = $('#dataI').val();
	var FinFe = $('#dataF').val();
	var CaractSele= $('#SelcRepot option:selected').html();
	var postData = $("#report_form").serialize();	
	var formURL = baseRut+"/reportes/index/reportasc";
	$.ajax({
      url : formURL,
      type: "POST",
      data : postData,
      dataType: "json",
  	beforeSend: function(x) {
    if(x && x.overrideMimeType) {                    
                }      
      $("#msj_tab").html('<center> Espere un momento.... </center><br><center><img src="'+baseRut+'/img/preload/39_1.gif"></center>');
 	 },
 	success:function(data) {

 	var caso = "";
 	
 	switch($('#SelcRepot').val()) {
 		case '1':
	        caso="Linea";
	        break;
	    case '2':
	        caso="Sucursal";
	        break;
	    case '3':
	        caso="Vendedor";
	        break;
	    case '4':
	        caso="Cliente";
	        break;
	    case '4':
	        caso="Producto";
	        break;
	    case '4':
	        caso="Sector";
	        break;


 	}

    var tab = '<table id="inf_aa" class="table table-striped"><thead><th><strong>'+caso+'</strong></th><th><strong>Producto</strong></th><th><strong>Facturas</strong></th></th><th><strong>Cantidad</strong></th><th><strong>Importe</strong></th><th><strong>Importe Iva</strong></th><th><strong>Iva</strong></th><th><strong>Total</strong></th></thead><tbody>';
    var tolCantidad = 0,tolImport = 0,tolImportIva = 0,tolTotales = 0;
    
  
    for (var i = 0; i < data.length ; i++) { 
    	var Comrp =(data[i].ape_usuario)?data[i].ape_usuario:'';
    	var iden = "'"+data[i].producto_es+"'";
    	var fecI = "'"+$('#dataI').val()+"'";
    	var fecF = "'"+$('#dataF').val()+"'";
    	var variante = "'"+$('#slOrden').val()+"'";
    	var report = "'"+$('#SelcRepot').val()+"'";
      	tab+='<tr><td>'+data[i].nombre_linea+' '+Comrp+'</td><td>'+data[i].nom_producto+'</td><td><a onclick="relationfact('+iden+','+fecI+','+fecF+','+report+','+variante+')">'+data[i].num_fac+'</a></td><td>'+$.number(data[i].canarts,2)+'</td><td>$'+$.number(data[i].importtt,2)+'</td><td>$'+$.number(data[i].importeiva,2)+'</td><td>'+((data[i].iva)*100)+'%</td><td>$'+$.number(data[i].totl,2)+'</td></tr>';      	
      	tolCantidad+=parseInt(data[i].canarts);      	
      	tolImport+=parseInt(data[i].importtt);
      	tolImportIva+= parseInt(data[i].importeiva);
      	tolTotales+=parseInt(data[i].totl);      	
    };
    var tabla = '<center><h3>Reporte de venta ('+$('#re_bus').val()+')</h3><p>Resumen</p><center><br></div><table class="table table-bordered"><thead><tr><th>Productos Totales</th><th>Cantidad Total de Productos</th><th>Importe Total</th><th>Importe total de iva</th><th>Suma total</th></tr></thead><tbody><tr><td class="for_maaj">'+$.number(data.length,2)+'</td><td>'+$.number(tolCantidad,2)+'</td><td>$'+$.number(tolImport,2)+'</td><td>$'+$.number(tolImportIva,2)+'</td><td>$'+$.number(tolTotales,2)+'</td></tr></tbody</table>';    
    var inf = (data.length > 0) ? tab:'<div class="alert alert-info" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><p class="text-center"><span aria-hidden="true">&times;</span></button><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> No se encontraron registros </p></div>';
    var tabRes = (data.length > 0) ? tabla:'';
    $("#msj_tab").html(inf);
    $("#msj_resum").html(tabRes); 
    setTimeout(function() {            
        $('#inf_aa').DataTable( {
        dom: 'T<"clear">lfrtip',
        tableTools: {
              "sSwfPath": ""+baseRut+"/img/copy_csv_xls_pdf.swf"
          }
  		} );  		                  
    },900);         
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
        $('#msj_tab').html('<div class="alert alert-danger alert-dismissible fade in text-center" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><h4 style="color: red;"><span class="glyphicon glyphicon-warning-sign" aria-hidden="true"></span> Evento inesperado : '+complemento+'</h4><br><small style="color:red;">Si este problema continúa, póngase en contacto con el administrador</small></div> ');
        }
    });

	}
});    




function relationfact(prod,fecIni,fecFin,report,busca){
	var prodId = prod;
	var iniF = fecIni;
	var finF = fecFin;
	var reporte = report;
	var seleciono = busca;
	$('#report_of_fact').modal('show');
	$('#head_all').html('<center>Facturas Relacionadas</center>');	
	var postData = jQuery.parseJSON('{ "idProd":"'+prodId+'", "FechaIni": "'+iniF+'", "FechaFin" : "'+finF+'", "reporte" : "'+reporte+'", "seleciono" : "'+seleciono+'"}' )   ;	
	var formURL = baseRut+"/reportes/index/getassfacture";
	$.ajax({
      url : formURL,
      type: "POST",
      data : postData,
      dataType: "json",
  	beforeSend: function(x) {
    if(x && x.overrideMimeType) {                    
                }      
      $("#conten_all").html('<center> Espere un momento.... </center><br><center><img src="'+baseRut+'/img/preload/39_1.gif"></center>');
 	 },
 	success:function(data) {
 		var tabb = '<table id="inf_aaa" class="table table-striped"><thead><th><strong>factura</strong></th><th><strong>fecha</strong></th><th><strong>Sucursal</strong></th><th><strong>Producto</strong></th></thead><tbody>';
 		for (var i = 0; i < data.length ; i++) { 
 			var fact = "'"+data[i].factura+"'";
 			tabb+='<tr><td><a onclick="deta_fact('+fact+')">'+data[i].factura+'</a></td><td>'+data[i].fecha+'</td><td>'+data[i].sucursal+'</td><td>'+data[i].nom_producto+'</td></tr>'
 		}
 		tabb+="</tbody>";

 		$('#conten_all').html(tabb);
 		tabb="";
 		setTimeout(function() {            
        $('#inf_aaa').DataTable( {
        dom: 'T<"clear">lfrtip',
        tableTools: {
              "sSwfPath": ""+baseRut+"/img/copy_csv_xls_pdf.swf"
          }
  		} );  		                  
    },900);  	        
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
        $('#conten_all').html('<div class="alert alert-danger alert-dismissible fade in text-center" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><h4 style="color: red;"><span class="glyphicon glyphicon-warning-sign" aria-hidden="true"></span> Evento inesperado : '+complemento+'</h4><br><small style="color:red;">Si este problema continúa, póngase en contacto con el administrador</small></div> ');
        }
    });

}

