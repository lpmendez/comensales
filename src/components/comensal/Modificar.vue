<template>
  <form @submit.prevent="mod">
    <p>{{ centro }}</p>
    <p class="h4 mb-4">Modificar comensal</p>

    <select
      name="nombre"
      class="form-control mb-4"
      placeholder="Nombre"
      v-model="nombre"
      @change="cargar()"
    >
      <option value disabled selected>Nombre</option>
      <option v-for="(o,j) in nombres" :key="j" :value="o.id">{{o.data.nombre}}</option>
    </select>

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
    <button class="btn btn-info" type="submit">Modificar</button>

    <span class="msg">{{msg}}</span>

    <span class="exito">{{exito}}</span>

    <!-- <pre>{{ $data}}</pre> -->
  </form>
</template>


<script>
import firebase from "firebase";
import { db } from "../../db.js";

var tiempos = db.ref("tiempos");
var personas = db.ref("personas");

export default {
  data() {
    return {
      centro: this.$route.params.id,
      nombre: "",
      nombres: [],
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
      msg: "",
      exito: ""
    };
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
    cargarPersonas(nombres) {
      this.nombres = [];
      console.log("firebase", nombres, "centro", this.centro);

      for (let c in nombres) {
        if (nombres[c].centro == this.centro)
          this.nombres.push({ id: c, data: nombres[c] });
      }
      console.log("personas", this.nombres);
    },
    mod(object) {
      if (this.nombre) {
        // let newPeople = {
        //   nombre: this.nombre,
        //   tiempos: this.valores,
        //   centro: this.centro
        // };
        // personas.push(newPeople);
        personas
          .child(this.nombre)
          .child("tiempos")
          .set(this.valores);

        //guardando adicionales
        personas
          .child(this.nombre)
          .child("adicional")
          .set(this.adicional);
      } else this.msg = "Debes seleccionar un nombre";
    },
    cargar() {
      if (this.nombre) {
        const firebase = this.nombres.filter(x => this.nombre == x.id)[0].data;
        this.adicional = firebase.adicional;
        for (let v in this.valores) {
          this.valores[v] = firebase.tiempos[v];
        }
      }
    },
    initialLoad() {
      console.log("id", this.centro, this.$route.params.id);
      tiempos.on("value", snapshot => this.cargarTiempos(snapshot.val()));
      personas.on("value", snapshot => this.cargarPersonas(snapshot.val()));
    }
  },
  created() {
    this.initialLoad();
  },
  watch: {
    "$route.params.id"(newId, oldId) {
      this.centro = newId;
      this.initialLoad();
    }
  }
};
</script>

<style>
</style>