<template>
    <div
    id="demo"
    :class="[{'collapsed' : collapsed}]"
    >
    <div class="demo">
      <div class="container">
        <router-view />
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
import { SidebarMenu } from 'vue-sidebar-menu'
export default {
  components: {
    SidebarMenu
  },
  data(){
      return {
          menu: [
                    {
                        header: true,
                        title: 'Menú',
                        // component: componentName
                        // visibleOnCollapse: true
                        // class:''
                        // attributes: {}
                    },
                    {
                        title: 'Agregar',
                        icon: 'fa fa-plus',
                        href: '/agregar'
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
                        title: 'Dashboard',
                        icon: 'fa fa-table',
                        href: '/dashboard'
                    }
            ],
        selectedTheme: 'white-theme',
        collapsed: false
      }
  },
  methods:{
    onCollapse (collapsed) {
      console.log(collapsed)
      this.collapsed = collapsed
    }
  }
}

</script>

<style src="./style.css"></style>