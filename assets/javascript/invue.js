const { createApp } = Vue
createApp({
    data() {
        return {
            eventos:undefined,
            imprimirEventos:undefined,
            cajaCheckeo:undefined,
            entradaDeBusqueda:"",
            entradaChekeado:[],
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(res=>res.json())
        .then(datos=>{
            let nombrePagina=location.pathname;
            if(nombrePagina.includes("upcomig"))
            this.eventos=datos.events.filter(evento=>evento.date > datos.currentDate);
            else if(nombrePagina.includes("past"))
            this.eventos=datos.events.filter(evento=>evento.date < datos.currentDate);
            else
            this.eventos=datos.events;
            this.imprimirEventos=this.eventos;
            this.cajaCheckeo=[...new Set(this.eventos.map(evento=>evento.category))];
        })
        .catch(err=>console.log(err));
    },
    methods:{
        filtroCruzado:function(){
            let filtroEntradaDeBuqueda=this.eventos.filter(evento=>evento.name.toLowerCase().includes(this.entradaDeBusqueda.toLowerCase()));
            if(this.entradaChekeado.length===0){
                this.imprimirEventos=filtroEntradaDeBuqueda;}
            else{
                let filtradoCompleto=filtroEntradaDeBuqueda.filter((evento)=>this.entradaChekeado.includes(evento.category));
                this.imprimirEventos=filtradoCompleto;}
                
        },
    },

}).mount('#app-vue')