import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CharacterSheetPage from "../views/CharacterSheetPage.vue";
import ClassesPage from "../views/ClassesPage.vue";
import backgroundPage from "../views/backgroundPages.vue";
import racePage from "../views/RacePages.vue";
import featPage from "../views/FeatPages.vue";
import charCreationPage from "../views/charCreationPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/characterSheet",
    name: "CharacterSheetPage",
    component: CharacterSheetPage,
  },
  {
    path: "/classList",
    name: "ClassesPage",
    component: ClassesPage,
  },
  {
    path: "/backgroundList",
    name: "backgroundPage",
    component: backgroundPage,
  },
  {
    path: "/raceList",
    name: "racePage",
    component: racePage,
  },
  {
    path: "/featList",
    name: "featPage",
    component: featPage,
  },
  {
    path: "/creationPage",
    name: "charCreationPage",
    component: charCreationPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
