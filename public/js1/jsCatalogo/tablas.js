$(document).ready( function () {
	//console.log('La pagina Se cargo');

    $('#table_id_XD').DataTable( {
        dom: 'T<"clear">lfrtip',
        tableTools: {
            "sSwfPath": "<?php echo $this->basePath()?>/img/copy_csv_xls_pdf.swf"
        }
    } );
} );
