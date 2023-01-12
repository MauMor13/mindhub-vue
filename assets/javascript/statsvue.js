const { createApp } = Vue
createApp({
    data() {
        return {
            eventos:undefined,
            eventosCalculados:{},
            cardsPasadas:[],
            cardsPorVenir:[],
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(res=>res.json())
        .then(datos=>{
            this.eventos=[...datos.events];
            this.eventos.forEach((evento)=>{
            evento[aux] = 1;
            evento[porcentaje] = Math.round(Number( evento[evento.date < datos.currentDate ? 'assistance':'estimate'] / (evento.capacity / 100)));
            evento[ganancias] = Number(evento.price * evento[evento.date < datos.currentDate ? 'assistance':'estimate']);
            });
            console.log(this.eventos)
            this.cardsPasadas=this.eventos.filter(evento=>evento.date>datos.currentDate).sort();//filtrar pasadas
            this.cardsPorVenir=this.eventos.filter(evento=>evento.date<datos.currentDate).sort();//filtrar futuras
            this.eventos.sort((mayor,menor)=>mayor.porcentaje-menor.porcentaje);
            this.cardsPasadas.sort((mayor,menor)=>mayor.porcentaje-menor.porcentaje);

            this.eventosCalculados[mayorPorcentaje]=`${this.cardsPasadas[this.cardsPasadas.length-1].name} : ${this.cardsPasadas[this.cardsPasadas.length-1].porcentaje} %`;
            this.cardsPasadasCalculados[menorPorcentaje]=`${this.cardsPasadas[0].name} : ${this.cardsPasadas[0].porcentaje} %`;
            this.eventosCalculados[mayorCapacidad]=`${this.eventos.sort((menor,mayor)=>mayor.capasidad-menor.capacity)[0].name} : ${this.eventos.sort((menor,mayor)=>mayor.capacity-menor.capacity)[0].capacity} people`;
            console.log(this.eventosCalculados)
        })
        .catch(err=>console.log(err));
    },
    methods:{
            reducirEventos:function(){
                            let reducidas={};
                            for(let card of reducirCards) {
                                if (!Object.hasOwn(reducidas,card.categoria))
                                {
                                reducidas[card.categoria]={...card};}
                                else
                                {
                                reducidas[card.categoria].porcentaje+=card.porcentaje;
                                reducidas[card.categoria].ganancias+=card.ganancias;
                                reducidas[card.categoria].aux_incremento++;
                                }
                            };
                            reducidas=Object.values(reducidas);
                            reducidas.forEach(card=>{
                                card.porcentaje/=card.aux_incremento;
                            })
                            return reducidas;
                        },
            filtrarPrimeraLinea:function(){
                                
            },
        },
    
}).mount('#app-vue')