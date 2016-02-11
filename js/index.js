var resultado,correcto,respuesta;
var num1,num2,signo,intento;

$(document).ready(function(){
	var nombre;
	intento=0;
	$("#intento1").text("O");
	$("#intento2").text("O");
	$("#intento3").text("O");
	
	ion.sound({
	    sounds: [ 
	    		{name: "fondo"},
	        	{name: "aplauso"},
	        	{name: "error"},
	        	{name: "button_click"}
	    ],

	    // main config
	    path: "./sounds/",
	    preload: true,
	    multiplay: true,
	    volume: 0.9
	});

	calcular();
	
	$("#btnDesc").on("click",function(){
		ion.sound.play("button_click");
		if (correcto == undefined){
			intento += 1;
			$.blockUI({ 
	            message: $('#error'), 
	            css: { 
	                top:  ($(window).height() - 600) /2 + 'px', 
	                left: ($(window).width() - 600) /2 + 'px', 
	                width: '600px' 
	            } 
        	}); 
        	mostrarintento(0);
        	ion.sound.play("error");
        	limpiar("#resultado1 img");
			limpiar("#resultado2 img");
			$("#resultado1 figcaption").text("Resultado1");
			$("#resultado2 figcaption").text("Resultado2");
			if (intento == 3){
					intento=0;
					$("#intento1").text("O");
					$("#intento2").text("O");
					$("#intento3").text("O");
			}
        } 
		else{ 
			if (correcto == 1){
				$.blockUI({ 
		            message: $('#acierto'), 
		            css: { 
		                top:  ($(window).height() - 600) /2 + 'px', 
		                left: ($(window).width() - 600) /2 + 'px', 
		                width: '600px' 
		            } 
	        	}); 
	        	mostrarintento(1);
	        	ion.sound.play("aplauso");
				calcular();
			}
			else{
				intento += 1;
				$.blockUI({ 
		            message: $('#error'), 
		            css: { 
		                top:  ($(window).height() - 600) /2 + 'px', 
		                left: ($(window).width() - 600) /2 + 'px', 
		                width: '600px' 
		            } 
	        	}); 
	        	mostrarintento(0);
	        	ion.sound.play("error");
	        	limpiar("#resultado1 img");
				limpiar("#resultado2 img");	
				$("#resultado1 figcaption").text("Resultado1");
				$("#resultado2 figcaption").text("Resultado2");
				if (intento == 3){
					intento=0;
					$("#intento1").text("O");
					$("#intento2").text("O");
					$("#intento3").text("O");
				}
			}
		}
		setTimeout($.unblockUI, 2000); 
	});
});

function calcular(){
	signo=masomenos();
	num1=selecnums(1);
	num2=selecnums(2);
	while(signo != 1 && num1 < num2){
		num1=selecnums(1);
	}
	if (signo != 1)
	{
		resultado=num1-num2;
	}
	else
	{
		resultado=num1+num2;
	}
	limpiar("#resultado1 img");
	limpiar("#resultado2 img");
	$("#resultado1 figcaption").text("Resultado1");
	$("#resultado2 figcaption").text("Resultado2");

}

function limpiar(objeto){
	$(objeto).attr("src","");
    $(objeto).attr("alt","");
    respuesta=0;
    correcto=0;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.alt);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    imagen = "./images/" + data + ".png";
    objeto = "#" + ev.target.parentElement.id + " img";
    $(objeto).attr("src",imagen);
    $(objeto).attr("alt",data);
    var texto = numtexto(parseInt(data));
    objeto = "#" + ev.target.parentElement.id + " figcaption";
    $(objeto).text(texto);
    correcto=verificarRespuesta(resultado);
}

function masomenos(){
	var random;
	random = Math.floor((Math.random() * 2) + 1);
	if(random == 1){
		$("#signo img").attr("src","./images/mas.png");
		$("#signo figcaption").text("Mas");
	}
	else{
		$("#signo img").attr("src","./images/menos.png");
		$("#signo figcaption").text("Menos");
	}
	return random
}

function numtexto(num){
		var numero;
		switch (num){
		case 0:
			numero="Cero"
			break;
		case 1:
			numero="Uno"
			break;
		case 2:
			numero="Dos"
			break;
		case 3:
			numero="Tres"
			break;
		case 4:
			numero="Cuatro"
			break;
		case 5:
			numero="Cinco"
			break;
		case 6:
			numero="Seis"
			break;
		case 7:
			numero="Siete"
			break;
		case 8:
			numero="Ocho"
			break;
		default:
			numero="Nueve"
			break;
	}
	return numero;
}

function selecnums(num){
	var random;
	var imagen;
	var numero;
	random = Math.floor((Math.random() * 10));
	imagen = "./images/" + random + ".png";
	imagen1 = "./images/" + random + ".jpg";
	numero = numtexto(random);
	if (num == 1){
		$("#espacio1 img").attr("src",imagen);
		$("#figura1 img").attr("src",imagen1);
		$("#espacio1 figcaption").text(numero);
	}
	else{
		$("#espacio2 img").attr("src",imagen);
		$("#figura2 img").attr("src",imagen1);
		$("#espacio2 figcaption").text(numero);
	}
	return random
}

function verificarRespuesta(res){
	var res1,res2;
	res1=$("#resultado1 img").attr("alt");
	res2=$("#resultado2 img").attr("alt");
	respuesta=parseInt(res1 + res2);
	if (res == respuesta){
		return 1;
	}
	else
	{
		return 0;
	}
}

function mostrarintento(val){
	switch (intento){
		case 1:
			objeto = "#intento1"
			break;
		case 2:
			objeto = "#intento2"
			break;
		default:
			objeto = "#intento3"
			break;
	}
	if (val == 0){
		$(objeto).text("X");
	}
}