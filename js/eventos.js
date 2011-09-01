jQuery(document).ready(function() {
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
    	jQuery('.field input').removeAttr("disabled"); 
    	jQuery('.field input').each(function(){
    		  jQuery(this).val('');
    	}); 
    	if(tolerance)
    		changeGauge(0, null, null, null, null, null);
    });
    
    jQuery('#gravar').click(function(){
    	var dataIni = jQuery('#periodo1').val();
    	var dataFim = jQuery('#periodo2').val();
    	var nome	= jQuery('#nome').val();
    	if(realizado && tolerance && warning){
	    	jQuery('#grid .indicadores').append( 
	    		"<tr>" + 
	    		"<td>"+ dataIni +"</td>"+
	    		"<td>"+ dataFim +"</td>"+
	    		"<td>"+ nome +"</td>"+
	    		"<td class='tMeta'>"+ meta +"</td>"+
	    		"<td class='tTolerancia'>"+ tolerancia +"</td>"+
	    		"<td class='tAviso'>"+ aviso +"</td>"+
	    		"<td class='tRealizado'>"+ realizado +"</td>"+
	    		"<td><span class='aplicar'>Aplicar</span></td>"+
	    		"</tr>"
	    	);
    	}
        jQuery('.aplicar').click(function(){
        	var rowMeta 		= parseInt(jQuery('.tMeta').html());
        	var rowTolerancia	= parseInt(jQuery('.tTolerancia').html());
        	var rowAviso 		= parseInt(jQuery('.tAviso').html());
        	var rowRealizado	= parseInt(jQuery('.tRealizado').html());
        	console.log(jQuery('.tRealizado').parent().html());
        	max = airspeedMax(meta);
        	toleranceBand(meta, tolerancia);
        	warningBand(meta, aviso);
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