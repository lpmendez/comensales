import Login from "./components/signin/Login.vue";
import Error from "./components/error/Error.vue";
import Main from "./components/main/Main.vue";
import Principal from "./components/main/Principal.vue";

import Agregar from "./components/comensal/Agregar.vue";
import Dashboard from "./components/comensal/Dashboard.vue";
import Modificar from "./components/comensal/Modificar.vue";

export const routes = [
  { path: "*", redirect: "/" },
  {
    path: "/",
    name: "main",
    component: Main,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "/principal",
        name: "principal",
        component: Principal
      },
      {
        path: "/errorForm",
        name: "errorForm",
        component: Error
      },
      {
        path: "/agregar",
        name: "agregar",
        component: Agregar
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "/modificar/:id",
        name: "modificar",
        component: Modificar
      }
    ]
  },
  { path: "/login", name: "login", component: Login },
  { path: "/error", name: "error", component: Error }
];
