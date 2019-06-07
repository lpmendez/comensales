<template>
    <div class ="dashboard">
        <div v-for="(t,i) in tiempos" :key="i" class="tiempo">
            <b>{{t.charAt(0).toUpperCase() + t.slice(1)}}</b>
            <div v-for="c in centros" :key="c" class="centros">
                <b>{{ c +":  "+ filterBy(t, c).length }}</b>
                <div v-for="(p,j) in filterBy(t, c)" :key="'p'+j" >
                    {{p.nombre}}
                </div>
                <input type="text"><span><i class="fa fa-plus"></i></span>
            </div>
            
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import {db} from '../../db.js'

var tiempos = db.ref('tiempos');
var personas = db.ref('personas');
var centros = db.ref('centros');
export default {
    data(){
        return {
            centros:[],
            tiempos: [],
            personas: []
        }
    },
    created() {
        tiempos.on('value', snapshot => this.cargarTiempos(snapshot.val()))
        personas.on('value', snapshot => this.cargarPersonas(snapshot.val()))
        centros.on('value', snapshot => this.cargarCentros(snapshot.val()))
    },
    methods:{
        cargarTiempos(tiempos) {
            this.tiempos = []
            for (let tiempo in tiempos) {
                this.tiempos.push(tiempos[tiempo].nombre)
            }
        },
        cargarCentros(centros) {
            this.centros = []
            for (let c in centros) {
                this.centros.push(centros[c].name);
            }
        },
        cargarPersonas(personas){
            this.personas = []
            console.log(personas)
            for (let p in personas) {
                console.log("for in ", personas[p])
                this.personas.push({
                    nombre: personas[p].nombre,
                    tiempos: personas[p].tiempos,
                    centro: personas[p].centro
                })
            }
        },
        filterBy(tiempo, centro){
            if(this.personas && tiempo && centro){
                console.log(centro)
                return this.personas.filter(x=> x.tiempos[tiempo] != '' && x.centro == centro)
            }
            else
                return [];
            
        }
    }
}
</script>


<style scoped>
.tiempo{
    width: 30%;
    padding: 10px;
    background-color: #ddd;
    float: left;
    margin-right: 10px;
}
.centros{
    margin-top: 15px;
}
</style>
