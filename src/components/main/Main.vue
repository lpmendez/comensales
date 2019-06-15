<template>
  <div id="demo" :class="[{'collapsed' : collapsed}]">
    <div class="demo">
      <div class="container">
        <router-view/>
      </div>
      <sidebar-menu
        :menu="menu"
        :theme="selectedTheme"
        :collapsed="collapsed"
        @collapse="onCollapse"
        width="250px"
      />
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../../db.js";
import { SidebarMenu } from "vue-sidebar-menu";
var centros = db.ref("centros");
export default {
  components: {
    SidebarMenu
  },
  created() {
    centros.on("value", snapshot => this.cargarCentros(snapshot.val()));
  },
  data() {
    return {
      menu: [
        {
          header: true,
          title: "Menú"
          // component: componentName
          // visibleOnCollapse: true
          // class:''
          // attributes: {}
        },
        {
          title: "Agregar",
          icon: "fa fa-plus",
          href: "/agregar"
          // disabled: true
          // class:''
          // attributes: {}
          // alias: '/path'
          /*
                        badge: {
                            text: 'new',
                            // class:''
                            // attributes: {}
                        }
                        */
        },
        {
          title: "Dashboard",
          icon: "fa fa-table",
          href: "/dashboard"
        },
        {
          title: "Modificar",
          icon: "fa fa-pencil-alt",
          child: []
        }
      ],
      selectedTheme: "white-theme",
      collapsed: false
    };
  },
  methods: {
    onCollapse(collapsed) {
      console.log(collapsed);
      this.collapsed = collapsed;
    },
    cargarCentros(centros) {
      for (let c in centros) {
        this.menu[3].child.push({
          href: `/modificar/${centros[c].name}`,
          title: centros[c].name
        });
      }
    }
  }
};
</script>

<style src="./style.css"></style>