<template>
  <!-- Default form register -->
  <form @submit.prevent="add">
    <p class="h4 mb-4">Nueva comensal</p>

    <select name="centro" class="form-control mb-4" placeholder="Centro" v-model="centro">
      <option value disabled selected>Centro</option>
      <option v-for="(o,j) in centros" :key="j" :value="o">{{o}}</option>
    </select>

    <input type="text" v-model="nombre" class="form-control mb-4" placeholder="Nombre">

    <div class="form-row mb-4">
      <div class="col" v-for="d in dias" :key="d.id">
        {{d.nombre}}
        <select
          v-for="(t,i) in tiempos"
          :key="i"
          v-model="valores[d.id][i]"
          class="form-control mb-2"
        >
          <option value disabled selected>{{t.nombre.charAt(0).toUpperCase() + t.nombre.slice(1)}}</option>
          <option v-for="(o,j) in t.tipos" :key="j" :value="o">{{o}}</option>
        </select>
      </div>
    </div>Comentarios o necesidades
    <textarea v-model="adicional.comentarios" class="form-control mb-4"></textarea>
    Alergias
    <textarea v-model="adicional.alergias" class="form-control mb-4"></textarea>
    Dieta específica
    <textarea v-model="adicional.dieta" class="form-control mb-4"></textarea>

    <!-- Sign up button -->
    <button class="btn btn-info" type="submit">Agregar</button>

    <span class="msg">{{msg}}</span>

    <span class="exito">{{exito}}</span>

    <pre>{{ $data}}</pre>
  </form>
</template>

<script>
import firebase from "firebase";
import { db } from "../../db.js";

var tiempos = db.ref("tiempos");
var personas = db.ref("personas");
var centros = db.ref("centros");
export default {
  data() {
    return {
      nombre: "",
      tiempos: [],
      adicional: {
        comentarios: "",
        alergias: "",
        dieta: ""
      },
      dias: [
        { nombre: "Lunes", id: 1 },
        { nombre: "Martes", id: 2 },
        { nombre: "Miercoles", id: 3 },
        { nombre: "Jueves", id: 4 },
        { nombre: "Viernes", id: 5 },
        { nombre: "Sábado", id: 6 },
        { nombre: "Domingo", id: 0 }
      ],
      valores: {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: []
      },
      centro: "",
      centros: [],
      msg: "",
      exito: ""
    };
  },
  created() {
    tiempos.on("value", snapshot => this.cargarTiempos(snapshot.val()));
    centros.on("value", snapshot => this.cargarCentros(snapshot.val()));
  },
  methods: {
    cargarTiempos(tiempos) {
      this.tiempos = [];
      for (let tiempo in tiempos) {
        //ese filter, es proque extrañamente aparece un registro vacío
        this.tiempos.push({
          nombre: tiempos[tiempo].nombre,
          tipos: tiempos[tiempo].tipos.filter(x => x != "")
        });

        for (let v in this.valores) {
          this.valores[v].push("");
          // console.log("valores",this.valores[v])
        }
      }
    },
    cargarCentros(centros) {
      this.centros = [];
      for (let c in centros) {
        this.centros.push(centros[c].name);
      }
      console.log(this.centros);
    },
    add() {
      if (this.nombre != "") {
        let newPeople = {
          nombre: this.nombre,
          tiempos: this.valores,
          centro: this.centro,
          adicional: this.adicional
        };
        personas.push(newPeople);
        this.nombre = "";
        // this.tiempos = [];
        this.centro = "";
      } else this.msg = "Debes digitar un nombre";
    }
  }
};
</script>

<style>
.tiempo {
  width: 150px;
}
</style>
