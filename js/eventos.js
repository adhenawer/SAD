jQuery(document).ready(function() {
	realizado		= 0;
	toleranciaMin	= 0;
	toleranciaMax	= 0;
	avisoMin		= 0;
	avisoMax		= 0;
	max				= 0;
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
        	toleranciaMin = (meta - ((meta * tolerancia) / 100));
        	toleranciaMax = (((meta * tolerancia) / 100) + meta);
        	max = meta * 2;
        	changeGauge(0, toleranciaMin, toleranciaMax, null, null, max);
    	}
    });
    
    jQuery('#aviso').keyup(function(){
    	if(jQuery('#meta').val() && jQuery('#tolerancia').val()){
        	aviso 	   = parseInt(jQuery('#aviso').val());
        	avisoMin = (toleranciaMin - ((meta * aviso) / 100)); 
        	avisoMax = (((meta * aviso) / 100) + toleranciaMax);
        	changeGauge(0, toleranciaMin, toleranciaMax, avisoMin, avisoMax, max);
    	}
    });
    
    jQuery('#realizado').keyup(function(){
    	realizado  = parseInt(jQuery('#realizado').val());
    	if(realizado && toleranciaMin && toleranciaMax && avisoMin && avisoMax)
    		changeGauge(realizado, toleranciaMin, toleranciaMax, avisoMin, avisoMax, max);
    	// jQuery('.field input').attr("disabled", true);
    });   
    
    jQuery('#limpar').click(function(){
    	jQuery('.field input').removeAttr("disabled"); 
    	jQuery('.field input').each(function(){
    		  jQuery(this).val('');
    	}); 
    	if(avisoMax)
    		changeGauge(0, null, null, null, null, null)
    });
    
    jQuery('.aplicar').click(function(){

    });
    
    jQuery('#gravar').click(function(){
    	var dataIni = jQuery('#periodo1').val();
    	var dataFim = jQuery('#periodo2').val();
    	var nome	= jQuery('#nome').val();
    	if(dataIni && dataFim && nome && realizado && toleranciaMin && toleranciaMax && avisoMin && avisoMax){
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
    });
});