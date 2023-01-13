const { createApp } = Vue
createApp({
    data() {
        return {
            eventos: [] ,
            eventosCalculados: {} ,
            eventosPasados: [] ,
            eventosPorVenir: [] ,
            imprimirEventosPasados: [] ,
            imprimirEventosPorVenir: [] ,
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(res=>res.json())
        .then(datos=>{
            this.eventos=[...datos.events];
            for (let evento of this.eventos) {
                evento.aux= 1;
                evento.porcentaje = Math.round(Number( evento[evento.date < datos.currentDate ? 'assistance':'estimate'] / (evento.capacity / 100)));
                evento.ganancias = Number(evento.price * evento[evento.date < datos.currentDate ? 'assistance':'estimate']);
            }
            // this.eventos.push(
            //     {   aux: 1,
            //         capacity: 3000000,
            //         category: "Race",
            //         date: "2020-03-01",
            //         description: "We'll be raising funds for hospitals and medical care in this unique event held in The Big Apple.",
            //         estimate: 2569800,
            //         ganancias: 100000000000000000000,
            //         image: "https://i.postimg.cc/zv67r65z/15kny.jpg",
            //         name: "15K NY",
            //         place: "New York",
            //         porcentaje: 96,
            //         price: 3,
            //         __v: 0,
            //         _id:"639c723d992482e5f2834bfb",}
            //         );//elemento de prueba para filtro de eventos de igual categoria
            this.eventosPasados=this.eventos.filter(evento=>evento.date<datos.currentDate).sort();//filtrar pasadas
            this.eventosPorVenir=this.eventos.filter(evento=>evento.date>datos.currentDate).sort();//filtrar futuras
            this.filtrarPrimeraLinea();
            this.imprimirEventosPasados=this.reducirEventos(this.eventosPasados);
            this.imprimirEventosPorVenir=this.reducirEventos(this.eventosPorVenir);
        })
        .catch((err)=>console.log(err));
    },
    methods:{
            reducirEventos:function(eventosParaReducir){
                            let reducidas={};
                            for(let evento of eventosParaReducir) {
                                if (!Object.hasOwn(reducidas,evento.category))
                                {
                                reducidas[evento.category]={...evento};}
                                else
                                {
                                reducidas[evento.category].porcentaje+=evento.porcentaje;
                                reducidas[evento.category].ganancias+=evento.ganancias;
                                reducidas[evento.category].aux++;
                                }
                            };
                            reducidas=Object.values(reducidas);
                            reducidas.forEach(evento=>{
                                evento.porcentaje/=evento.aux;
                            })
                            return reducidas;
                        },
            filtrarPrimeraLinea:function(){
                this.eventos.sort((mayor,menor)=>mayor.porcentaje-menor.porcentaje);
                this.eventosPasados.sort((mayor,menor)=>mayor.porcentaje-menor.porcentaje);
                this.eventosCalculados.mayorPorcentaje=`${this.eventosPasados[this.eventosPasados.length-1].name} : ${this.eventosPasados[this.eventosPasados.length-1].porcentaje} %`;
                this.eventosCalculados.menorPorcentaje=`${this.eventosPasados[0].name} : ${this.eventosPasados[0].porcentaje} %`;
                this.eventosCalculados.mayorCapacidad=`${this.eventos.sort((menor,mayor)=>mayor.capacity-menor.capacity)[0].name} : ${this.eventos.sort((menor,mayor)=>mayor.capacity-menor.capacity)[0].capacity} people`;
            },
        },
    
}).mount('#app-vue')