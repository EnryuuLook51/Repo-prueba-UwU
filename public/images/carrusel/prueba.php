<html>
<body>

<script type="text/javascript">


function ramdom_num(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*linea impresora a pc1*/
setInterval(function(){
document.getElementById("net").getSVGDocument().getElementById("printer2pc1").setAttribute('stroke-dashoffset',  Math.floor((Math.random() * 10) + 1) );
},500);

/*linea conectora modem 1 a tplink*/
setInterval(function(){
document.getElementById("net").getSVGDocument().getElementById("modem12tplink").setAttribute('stroke-dashoffset',  Math.floor((Math.random() * 100) + 1) );
},500);

/*linea conectora modem 2 a tplink*/
setInterval(function(){
document.getElementById("net").getSVGDocument().getElementById("modem22tplink").setAttribute('stroke-dashoffset',  Math.floor((Math.random() * 100) + 1) );
},500);

/*linea conectora modem 3 a tplink*/
setInterval(function(){
document.getElementById("net").getSVGDocument().getElementById("modem32tplink").setAttribute('stroke-dashoffset',  Math.floor((Math.random() * 100) + 1) );
},500);                

/*linea conectora server mk a tplink*/
setInterval(function(){
document.getElementById("net").getSVGDocument().getElementById("mk2tplink").setAttribute('stroke-dashoffset',  Math.floor((Math.random() * 100) + 1) );
},500); 

/*linea conectora pc 4 a switch*/
setInterval(function(){
document.getElementById("net").getSVGDocument().getElementById("pc42switch").setAttribute('stroke-dashoffset',  Math.floor((Math.random() * 100) + 1) );
},500); 

/*linea conectora pc 5 a switch*/
setInterval(function(){
document.getElementById("net").getSVGDocument().getElementById("pc52switch").setAttribute('stroke-dashoffset',  Math.floor((Math.random() * 100) + 1) );
},500); 

/*linea conectora pc 6 a switch*/
setInterval(function(){
document.getElementById("net").getSVGDocument().getElementById("pc62switch").setAttribute('stroke-dashoffset',  Math.floor((Math.random() * 100) + 1) );
},500); 


/*linea pc1 a switch*/
setInterval(function(){
document.getElementById("net").getSVGDocument().getElementById("pc12switch").setAttribute('stroke-dashoffset',  Math.floor((Math.random() * 100) + 1) );
},500); 

/*linea pc2 a switch*/
setInterval(function(){
document.getElementById("net").getSVGDocument().getElementById("pc22switch").setAttribute('stroke-dashoffset',  Math.floor((Math.random() * 100) + 1) );
},500); 

/*linea pc3 a switch*/
setInterval(function(){
document.getElementById("net").getSVGDocument().getElementById("pc32switch").setAttribute('stroke-dashoffset',  Math.floor((Math.random() * 100) + 1) );
},500); 


/*mk a switch */
setInterval(function(){
document.getElementById("net").getSVGDocument().getElementById("mk2switch").setAttribute('stroke-dashoffset',  Math.floor((Math.random() * 100) + 1) );
},500); 


</script>


<embed id="net" src="/img/dibujo.svg" width="800" height="600" />

</body>
</html>





