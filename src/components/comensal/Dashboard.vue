<template>
  <div class="dashboard">
    <p class="h4 mb-4">{{fecha}}</p>
    <table class="tg">
      <tr>
        <th class="tg-s268"></th>
        <th :colspan="t.tipos" v-for="(t,i) in tiempos" :key="i" class="tg-amwm">
          <b>{{t.nombre.charAt(0).toUpperCase() + t.nombre.slice(1)}}</b>
        </th>
      </tr>
      <tr>
        <td class="tg-1wig"></td>
        <td v-for="(t,i) in tipos" :key="'t'+i" class="tg-baqh">{{t.nombre}}</td>
      </tr>
      <tr v-for="c in centros" :key="c" class="centros">
        <td class="tg-1wig">{{c}}</td>
        <td v-for="(t,i) in tipos" :key="'det'+i" class="tg-baqh">
          {{
          countBy(t.tiempo, c, t.nombre)
          }}
        </td>
      </tr>
      <tr>
        <td class="tg-1wig">Bandejas</td>
        <td v-for="(t,i) in tipos" :key="'ban'+i" class="tg-baqh"></td>
      </tr>
    </table>

    <hr>
    <div class="container">
      <label for="adicional">Observaciones para hoy</label>
      <div class="row">
        <div class="col-sm" v-for="(a,i) in adicional" :key="i">
          <b>{{a.nombre}}</b>
          <hr>
          <p v-for="(aa,j) in a.adicional" :key="j">
            <span v-if="aa != ''">
              <i>{{j.charAt(0).toUpperCase() + j.slice(1)}}:</i>
              {{aa}}
            </span>
          </p>
          <!-- <div class="row">
            <div class="col-sm" v-for="(aa,j) in a.adicional" :key="j">{{aa}}</div>
          </div>-->
        </div>
      </div>
    </div>
    <!-- <div class="form-group">
      <label for="adicional">Observaciones para hoy</label>
      <textarea v-model="adicional" id="adicional" class="form-control mb-4" rows="6"></textarea>
    </div>-->
  </div>
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
      centros: [],
      tiempos: [],
      personas: [],
      tipos: [],
      adicional: [],
      date: new Date()
    };
  },
  computed: {
    fecha() {
      let options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "numeric",
        second: "numeric",
        hour12: true
      };
      return this.date.toLocaleDateString("es-SV", options);
    }
  },
  created() {
    tiempos.on("value", snapshot => this.cargarTiempos(snapshot.val()));
    personas.on("value", snapshot => this.cargarPersonas(snapshot.val()));
    centros.on("value", snapshot => this.cargarCentros(snapshot.val()));
    setInterval(() => {
      (this.date = new Date()), 1000 * 60;
    });
  },
  methods: {
    cargarTiempos(tiempos) {
      this.tiempos = [];
      // for (let tiempo = 0; tiempo < tiempos.length; tiempo++) {

      for (let tiempo in tiempos) {
        console.log("timepo", tiempo);
        this.tiempos.push({
          nombre: tiempos[tiempo].nombre,
          tipos: tiempos[tiempo].tipos.length - 1
        });
        tiempos[tiempo].tipos.forEach(element => {
          this.tipos.push({
            nombre: element,
            tiempo: tiempo - 1
          });
        });
      }
    },
    cargarCentros(centros) {
      this.centros = [];
      for (let c in centros) {
        this.centros.push(centros[c].name);
      }
    },
    cargarPersonas(personas) {
      this.personas = [];
      this.adicional = [];
      let today = new Date();
      for (let p in personas) {
        //console.log("for in ", personas[p]);
        if (
          personas[p].adicional.comentarios ||
          personas[p].adicional.alergias ||
          personas[p].adicional.dieta
        ) {
          let newAdd = {
            nombre: personas[p].nombre,
            adicional: personas[p].adicional
          };
          this.adicional.push(newAdd);
          //this.adicional += `${personas[p].nombre}: `;
          // if (personas[p].adicional.comentarios)
          //   this.adicional += `Comentarios: ${
          //     personas[p].adicional.comentarios
          //   }. `;
          // if (personas[p].adicional.alergias)
          //   this.adicional += `Alergias: ${personas[p].adicional.alergias}. `;
          // if (personas[p].adicional.dieta)
          //   this.adicional += `Dieta: ${personas[p].adicional.dieta}. `;
          // this.adicional += `. \n`;
        }
        this.personas.push({
          nombre: personas[p].nombre,
          tiempos: personas[p].tiempos[today.getDay()],
          centro: personas[p].centro
        });
      }
    },
    filterBy(tiempo, centro) {
      if (this.personas && tiempo && centro) {
        console.log(centro);
        return this.personas.filter(
          x => x.tiempos[tiempo] != "" && x.centro == centro
        );
      } else return [];
    },
    countBy(tiempo, centro, tipo) {
      if (this.personas && centro && tipo) {
        let things = this.personas.filter(
          x =>
            x.tiempos[tiempo] != "" &&
            x.centro == centro &&
            x.tiempos[tiempo] == tipo
        );

        if ((tipo == "Ausente" || tipo == "") && things.length > 0)
          return things
            .reduce((acc, cur) => `${acc}, ${cur.nombre}`, "")
            .replace(", ", "");
        return things.length;
      } else return 0;
    }
  }
};
</script>


<style scoped>
.tg {
  border-collapse: collapse;
  border-spacing: 0;
}
.tg td {
  font-family: Arial, sans-serif;
  font-size: 14px;
  padding: 10px 5px;
  border-style: solid;
  border-width: 1px;
  overflow: hidden;
  word-break: normal;
  border-color: black;
}
.tg th {
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: normal;
  padding: 10px 5px;
  border-style: solid;
  border-width: 1px;
  overflow: hidden;
  word-break: normal;
  border-color: black;
}
.tg .tg-1wig {
  font-weight: bold;
  text-align: left;
  vertical-align: top;
}
.tg .tg-baqh {
  text-align: center;
  vertical-align: top;
}
.tg .tg-s268 {
  text-align: left;
}
.tg .tg-amwm {
  font-weight: bold;
  text-align: center;
  vertical-align: top;
}
</style>
