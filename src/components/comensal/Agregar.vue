<template>
    <div class="form-style-2">
        
    <div class="form-style-2-heading">Agregar nueva comensal</div>
    <form @submit.prevent="add">

        <label for="centro"><span>Centro</span>
            <select name="centro" v-model="centro">
                <option v-for="(o,j) in centros" :key="j" :value="o">{{o}}</option>
            </select>
        </label>

        <label for="nombre"><span>Nombre</span>
        <input type="text" name="nombre" v-model="nombre" /></label>

        <b>Valores por defecto</b>
        <div v-for="(t,i) in tiempos" :key="i" class="row">
            <label class="tiempo">
                <span>{{t.nombre.charAt(0).toUpperCase() + t.nombre.slice(1)}}</span>
            </label>
            
            <div class="col-sm">
            <select v-model="valores[t.nombre]">
                <option value="">Ninguno</option>
                <option v-for="(o,j) in t.tipos" :key="j" :value="o">{{o}}</option>
            </select>

            </div>

        </div>

        <br>

        <label style="clear:both" ><span> </span>
        <input type="submit" value="Agregar" /></label>

        <span class="msg">{{msg}}</span>
        
        <span class="exito">{{exito}}</span>

        <pre>{{ $data}}</pre>
    </form>
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
        return{
            nombre: '',
            tiempos: [],
            valores:{
                desayuno: '',
                almuerzo: '',
                cena: ''
            },
            centro: '',
            centros:[],
            msg: '',
            exito: ''
        }
    },
    created() {
        tiempos.on('value', snapshot => this.cargarTiempos(snapshot.val()))
        centros.on('value', snapshot => this.cargarCentros(snapshot.val()))
    },
    methods:{
        cargarTiempos(tiempos) {
            this.tiempos = []
            for (let tiempo in tiempos) {
                //ese filter, es proque extrañamente aparece un registro vacío
                this.tiempos.push({
                    nombre: tiempos[tiempo].nombre,
                    tipos: tiempos[tiempo].tipos.filter(x=>x!='')
                })
            }
            console.log(this.tiempos);
        },
        cargarCentros(centros) {
            this.centros = []
            for (let c in centros) {
                this.centros.push(centros[c].name);
            }
            console.log(this.centros);
        },
        add(){
            if(this.nombre != ""){
                let newPeople = {nombre: this.nombre, 
                                tiempos: this.valores,
                                centro: this.centro};
                personas.push(newPeople);
                this.nombre = "";
                this.tiempos.desayuno = ""
                this.tiempos.almuerzo = ""
                this.tiempos.cena = ""
            }
        }
    }
}
</script>

<style>
.tiempo{
    width: 150px;
}
</style>
