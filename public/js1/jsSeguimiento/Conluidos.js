

  function showSeguimientoFinal(insta){
    $('#detalleCompleto').modal('show');
    var instancia = insta;
    var datos = jQuery.parseJSON('{ "identy":"'+instancia+'"}' )   ;
    var formURL = baseRut+"/seguimiento/index/resumenseguimientofinalizado";
    var preload = '#MSJ_all';
    var errores = '#MSJ_all';
    var condicional='1';
    //console.log("Estas en el metodo");
    sendInfo(formURL,datos,preload,errores,condicional);


  }
  $(document).ready(function() {
  $('#table_id').DataTable( {
      dom: 'Bfrtip',
      buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print'
      ]
  } );
} );


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

  function respuestas(data,condicional,action_of){

    switch(condicional) {
      case '1':
        $('#Cliente_detalle').html(data.Seguimiento[0]['cliente']);
        $('#Asunt_detallle').html(data.Seguimiento[0]['asunto']);
        $('#regi_fecha_detalle').html(data.Seguimiento[0]['fecha_ini']);
        $('#limi_fecha_detalle').html(data.Seguimiento[0]['fecha_fin']);
        var prio = data.Seguimiento[0]['prioridad'];
        var estrellas = "";
        switch(prio) {
          case 'Alta':
            estrellas = '<span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star" aria-hidden="true"></span>';
          break;
          case 'Media':
            estrellas = '<span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star" aria-hidden="true"></span>';
          break;
          case 'Baja':
            estrellas = '<span class="glyphicon glyphicon-star" aria-hidden="true"></span>';
          break;
        }
        $('#prioridad_detalle').html(estrellas+'('+data.Seguimiento[0]['prioridad']+')');
        $('#CreoPrinc_detalle').html(data.Seguimiento[0]['C_nomb1']+' '+data.Seguimiento[0]['C_AP1']);
        $('#AsginPrin_detalle').html(data.Seguimiento[0]['P_nomb2']+' '+data.Seguimiento[0]['P_AP2']);
        var fin = data.ContinuidadASC.length;
        console.log(fin);
        for (var i = 0; i != fin; i++) {
            var nombre_fin = data.ContinuidadASC[i]['nombreU']+" "+data.ContinuidadASC[i]['apellidosU'];
            $('#status_detalle').html(nombre_fin);
        }


        var elementosASIG = data.reasignados.length;
        if(elementosASIG >0){
          // alert("entro");
          var reaS = "";
          var asign = "";
          var fecha = "";
          //console.log('Esto es lo que tiene -> '+elementosASIG);
          for (var i = 0 ; i < elementosASIG; i++) {
            reaS += data.reasignados[i]['R_nomb1']+' '+data.reasignados[i]['R_AP1']+'<br>';
            asign += data.reasignados[i]['A_nomb2']+' '+data.reasignados[i]['A_AP2']+'<br>';
            fecha += data.reasignados[i]['fecha_asignacion']+'<br>';
          }

          $('#reasigno_detalle').html(reaS);
          $('#asigno_detalle').html(asign);
          $('#fecha_asigno_detalle').html(fecha);


        }
         $('#descripcion_detallle').html(data.Seguimiento[0]['destalle']);




         var InterExisten = data.ContinuidadASC.length;
         var seguiContinuidadDetalle ="";
         var contador = 0;
        if(InterExisten>0){
           for (var i = 0; i < InterExisten; i++) {
            contador=contador+1;
            seguiContinuidadDetalle+='<p class="col-sm-12"><strong>'+contador+'</strong> <span class="glyphicon glyphicon-hand-right" aria-hidden="true"></span>.- <strong> Por : </strong>'+data.ContinuidadASC[i]['nombreU']+' '+data.ContinuidadASC[i]['apellidosU']+'. <strong>fecha :</strong> '+data.ContinuidadASC[i]['fecha_ini']+'.  <strong>Descripción :</strong> '+data.ContinuidadASC[i]['destalle']+'</p>';
          }
        }
         $('#todos_conti_segui').html(seguiContinuidadDetalle);


         break;



        default:
          break;
    }
  }
