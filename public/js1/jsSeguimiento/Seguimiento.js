  function showseg(action_of,instancia){
    var inst = instancia;
    var title = (action_of=='detalle')?'Seguimiento':'Edición de seguimiento';
    var type  = (action_of=='detalle')?1:2;
    $('#detalle').modal('show');
		$('#MSJ_all').html(' ');
    $('.Editar').html('Continuidad');
    $('.modal-1').show('');
		$('.modal-2').hide();
    if(instancia!='null'){
      $('#ValueBB').val(inst);
      getinform(instancia);
    }
  }

  function getinform(instancia){
  	//get information of the registry
  	var datos = jQuery.parseJSON('{ "identy":"'+instancia+'"}' )   ;
  	var formURL = baseRut+"/seguimiento/index/getinfoSeg";
  	var preload = '#MSJ_all';
  	var errores = '#MSJ_all';
  	var condicional='3';
  	sendInfo(formURL,datos,preload,errores,condicional);

  }
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
          case '2':
          if (data.Mensaje == 1) {
            var mensaje = "El seguimiento se añadió correctamente";
       	    var informe= '<div class="alert alert-success text-center" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+mensaje+'</div>';
       	  	$("#alert_message_segui").html(informe);
          }else {
            var mensaje = "No se pudo añadir  Estatus inactivo";
            var informe= '<div class="alert alert-danger text-center" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+mensaje+'</div>';
            $("#alert_message_segui").html(informe);
          }
     	    break;
         case '3':
					$('.modal-title').html("SEGUIMIENTO DEL CLIENTE : <br> <H2>"+(data[0][0][0].cliente)+"</H2>");
        	$('.usr_crea').html(data[0][0][0].usr_crea_nombre+" "+data[0][0][0].usr_crea_apellido);
         	$('.prioridad').html(data[0][0][0].prioridad);
         	$('.fecha_ini').html((data[0][0][0].fecha_ini).substr(0,10));
         	$('.fecha_fin').html((data[0][0][0].fecha_fin).substr(0,10));
         	$('.asunto').html(data[0][0][0].asunto);
         	$('.detalle').html(data[0][0][0].detalle);
         	$('.usr_prin').html(data[0][0][0].usr_prin_nombre+" "+data[0][0][0].usr_prin_apellido);
         	$('.contacto').html(data[0][0][0].tipo_contacto);
          $('#id_seguimiento').attr('value',data[0][0][0].id_seg);
          $('#area').attr('value',data[0][0][0].area);
          $('#cli_clave').attr('value',data[0][0][0].cli_clave);
					$('#res').addClass('reasignado');

						var cuenta = (data[1]).length;
						var usr_asignado="";
						for (var i = 0; i < cuenta; i++) {
						var asignado = (data[1][i].asignado_nombre+" "+data[1][i].asignado_apellidos);
						usr_asignado= usr_asignado+' '+asignado+'<br>';
						}
					$(".reasignado").html(usr_asignado);

					var usr_asignador = "";
					for (var i = 0; i < cuenta; i++) {
					var asignador = (data[1][i].asignador_nombre+" "+data[1][i].asignador_apellidos);
					usr_asignador= usr_asignador+' '+asignador+'<br>';
					}
				 $('.reasignador').html(usr_asignador);

				 var fecha_asig = "";
				 for (var i = 0; i < cuenta; i++) {
				 var fecha = (data[1][i].fecha).substr(0,10);
				 fecha_asig = fecha_asig+' '+fecha+'<br>';
				 }
				$('.fecha_asig').html(fecha_asig);

					if (data[0][0][0].contacto == '1' ) {
						$('.contactos').removeClass('glyphicon-envelope');
						$('.contactos').removeClass('glyphicon-earphone');
						$('.contactos').addClass('glyphicon-eye-open');
					}else if ((data[0][0][0].contacto == '2') || (data[0][0][0].contacto == '3')) {
						$('.contactos').removeClass('glyphicon-eye-open');
						$('.contactos').removeClass('glyphicon-earphone');
						$('.contactos').addClass('glyphicon-envelope');
					}else {
						$('.contactos').removeClass('glyphicon-envelope');
						$('.contactos').removeClass('glyphicon-eye-open');
						$('.contactos').addClass('glyphicon-earphone');
					}
          //Mostrar detalles de continuidad
          $('#det_seg_tabla').show();
          $('.continuidad').show().html('<hr><center>Continuidad</center>');
          det_cont = data[2][0].length;
          if (det_cont != 0) {
          $('.detalles').show();
          var i = 0;
          var usr_crea_cont="";
          var det_seg_cont="";
          var fec_seg_cont="";
          var tipo_seg_cont='';
          var detalle_cont="";
          $('.t1').html('<b> Atendió : </b>').addClass('glyphicon glyphicon-user col-md-3');
          $('.t2').html('<b> Detalle : </b>').addClass('glyphicon glyphicon-file col-md-4');
          $('.t3').html('<b> Fecha : </b>').addClass('glyphicon glyphicon-date col-md-2');
          $('.t4').html('<b> Contacto : </b>').addClass('glyphicon glyphicon-date col-md-3');
          do{
          var nombre_crea_cont    ="<br>"+ data[2][0][i].usr_crea_nombre_det+"<br>"+data[2][0][i].usr_crea_apellido_det+'<br><br><br>';
          usr_crea_cont           =usr_crea_cont+' '+nombre_crea_cont;
          var detalle_continuidad ="<br>"+ data[2][0][i].detalle+'<br><br><br>';
          det_seg_cont            =det_seg_cont+' '+detalle_continuidad;
          var fecha_seg_cont      ="<br>"+ data[2][0][i].fecha_ini.substr(0,10)+'<br><br><br>';
          fec_seg_cont            =fec_seg_cont+' '+fecha_seg_cont;
          var tipo_de_contacto    ="<br>"+ data[2][0][i].tipo_contacto+'<br><br><br>';
          tipo_seg_cont           =tipo_seg_cont+' '+tipo_de_contacto;
          var det_seg_2           =data[2][0][i].detalle+'<br>';
          detalle_cont            =detalle_cont+' '+det_seg_2;
          i++;
          }
          while (i < det_cont);
          $('.usr_crea_cont').html('<i>'+usr_crea_cont+'</i>');
          $('.det_seg').html('<i>'+det_seg_cont+'</i>');
          $('.fech_cont').html('<i>'+fec_seg_cont+'</i>');
          $('.tp_cont').html('<i>'+tipo_seg_cont+'</i>');

         	$('.detalle_cont').show().html(detalle_cont);


        }
        else {
            $('.detalles').hide();
          }
            break;
        default:
          break;
    }
  }

	function sig_vent() {
		$(".Editar").html("Guardar")
		$(".modal-2, .modal-1" ).toggle("slow");
		$('.Editar').attr('onclick','Guardar()');
		$('.cerrar').attr('onclick','cerrar()');

	}

  $( "#usr_a_reasignar" ).dblclick(function() {
  	var Valor = $( "#usr_a_reasignar option:selected" ).val();
  	var texto = $( "#usr_a_reasignar option:selected" ).text();
  	$("#select_de_usr").append("<option value='"+Valor+"'>"+texto+"</option>");
  	var Elementos = $("#id_usr_reasignados").val()+","+Valor;
  	$("#id_usr_reasignados").val(Elementos);
  });

  function eliminarReasignados(){
  	$("#select_de_usr").html("");
  	$("#id_usr_reasignados").val("");
  }

	function Guardar() {
  $('.Editar').attr('type','submit');
    $("#Continuidad").submit(function(e){
      e.preventDefault();
      // alert("Trataste de enviar ?");
      var datos = $("#Continuidad").serialize();
      var formURL = baseRut+"/seguimiento/index/insertContinuidad";
      var preload = '#MSJ_all';
      var errores = '#MSJ_all';
    	var condicional = '2';
      sendInfo(formURL,datos,preload,errores,condicional);
    });

     setTimeout(function(){
      $('#detalle').slideUp('slow').fadeOut(function() {
          window.location.reload();
      });
    }, 1000);

	}
	function cerrar() {
		location.reload();
	}


  $(document).ready(function() {
  	$('#table_id').DataTable( {
  			dom: 'Bfrtip',
  			buttons: [
  					'copy', 'csv', 'excel', 'pdf', 'print'
  			]
  	} );
  } );
