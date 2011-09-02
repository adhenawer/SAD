jQuery(document).ready(function() {
	count = 0;
	jQuery('#meta').numeric();
	jQuery('#tolerancia').numeric();
	jQuery('#aviso').numeric();
	jQuery('#realizado').numeric();
	jQuery("#periodo1").datepicker();
	jQuery("#periodo2").datepicker();

    jQuery('#meta').blur(function(){
    	meta = parseInt(jQuery('#meta').val());
    });
    
    jQuery('#tolerancia').keyup(function(){
    	if(jQuery('#meta').val()){
        	tolerancia = parseInt(jQuery('#tolerancia').val());
        	airspeedMax(meta);
        	toleranceBand(meta, tolerancia);
        	if(tolerancia)
        		changeGauge(0, tolerance[0], tolerance[1], null, null, max);
    	}
    });
    
    jQuery('#aviso').keyup(function(){
    	if(jQuery('#meta').val() && jQuery('#tolerancia').val()){
        	aviso = parseInt(jQuery('#aviso').val());
        	warningBand(meta, aviso);
        	if(aviso)
        		changeGauge(0, tolerance[0], tolerance[1], warning[0], warning[1], max);
    	}
    });
    
    jQuery('#realizado').keyup(function(){
    	realizado  = parseInt(jQuery('#realizado').val());
    	if(realizado && tolerance && warning)
    		changeGauge(realizado, tolerance[0], tolerance[1], warning[0], warning[1], max);
    	// jQuery('.field input').attr("disabled", true);
    });   
    
    jQuery('#limpar').click(function(){
    	//jQuery('.field input').removeAttr("disabled"); 
		cleanInputs();
    	if(tolerance)
    		changeGauge(0, null, null, null, null, null);
    });
    
    jQuery('#gravar').click(function(){
    	var dataIni = jQuery('#periodo1').val();
    	var dataFim = jQuery('#periodo2').val();
    	var nome	= jQuery('#nome').val();
		var medida = jQuery('#medida optgroup option:selected').html();
    	if(dataIni && dataFim && nome && realizado && tolerance && warning && medida && aviso){
	    	jQuery('#grid .indicadores').append( 
	    		"<tr>" + 
					"<td class='tDataIni-"	 +count+"'>"	+ dataIni 	 +	"</td>"+
					"<td class='tDataFim-"	 +count+"'>"	+ dataFim 	 +	"</td>"+
					"<td class='tNome-"		 +count+"'>"	+ nome    	 +	"</td>"+
					"<td class='tMedida-"	 +count+"'>"	+ medida 	 +	"</td>"+
					"<td class='tMeta-"	     +count+"'>"	+ meta 		 + 	"</td>"+
					"<td class='tTolerancia-"+count+"'>"    + tolerancia +	"</td>"+
					"<td class='tAviso-"	 +count+"'>"	+ aviso 	 +	"</td>"+
					"<td class='tRealizado-" +count+"'>"	+ realizado  +	"</td>"+
					"<td><span class='aplicar' id='"+count+"'>Aplicar</span></td>"+
	    		"</tr>"
	    	);
			count++;
			cleanInputs();
    	}else{
			jQuery('#gravar').jAlert('<b>Preencha todos os campos para gravar</b>', "warning", 'warningboxid');
		}
        jQuery('.aplicar').click(function(){
        	var idRow = jQuery(this).attr('id');
        	var rowDataIni 		= 		   jQuery('.tDataIni-'   +idRow).html();
        	var rowDataFim 		= 		   jQuery('.tDataFim-'	 +idRow).html();
        	var rowNome 		= 		   jQuery('.tNome-' 	 +idRow).html();
			var rowMedida 		= 		   jQuery('.tMedida-' 	 +idRow).html();
        	var rowMeta 		= parseInt(jQuery('.tMeta-'		 +idRow).html());
        	var rowTolerancia	= parseInt(jQuery('.tTolerancia-'+idRow).html());
        	var rowAviso 		= parseInt(jQuery('.tAviso-'	 +idRow).html());
        	var rowRealizado	= parseInt(jQuery('.tRealizado-' +idRow).html());
        	airspeedMax(rowMeta);
        	toleranceBand(rowMeta, rowTolerancia);
        	warningBand(rowMeta, rowAviso);
        	fillsInput(rowDataIni, rowDataFim, rowNome, rowMedida, rowMeta, rowTolerancia, rowAviso, rowRealizado);
        	changeGauge(rowRealizado, tolerance[0], tolerance[1], warning[0], warning[1], max);
        });
    });
});
function toleranceBand(meta, tolerancia){
	tolerance		= new Array();
	tolerance[0]	= (meta - ((meta * tolerancia) / 100));
	tolerance[1]	= (((meta * tolerancia) / 100) + meta);
}
function warningBand(meta, aviso){
	warning		= new Array();
	warning[0]	= (tolerance[0] - ((meta * aviso) / 100)); 
	warning[1]	= (((meta * aviso) / 100) + tolerance[1]);
}
function airspeedMax(meta){
	max = meta * 2;
}
function cleanInputs(){
	jQuery('.field input, select').each(function(){
		jQuery(this).val('');
    }); 
}
function fillsInput(dataIni, dataFim, nome, medida, meta, tolerancia, aviso, realizado){
	jQuery('#periodo1').attr('value', dataIni);
	jQuery('#periodo2').attr('value', dataFim);
	jQuery('#nome').attr('value', nome);
	jQuery('#medida').attr('value', medida);
	jQuery('#meta').attr('value', meta);
	jQuery('#tolerancia').attr('value', tolerancia);
	jQuery('#aviso').attr('value', aviso);
	jQuery('#realizado').attr('value', realizado);
}