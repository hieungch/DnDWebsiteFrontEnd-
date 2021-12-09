import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CharacterSheetPage from "../views/CharacterSheetPage.vue";
import ClassesPage from "../views/ClassesPage.vue";
import backgroundPage from "../views/backgroundPages.vue";
import racePage from "../views/RacePages.vue";
import featPage from "../views/FeatPages.vue";
import charCreationPage from "../views/charCreationPage.vue";
import charEditPage from "../views/charEditPage.vue";
import spellPage from "../views/spellPages.vue";

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
  {
    path: "/editPage/:id",
    name: "charEditPage",
    component: charEditPage,
    // for id routing
    props: true,
  },
  {
    path: "/spellList",
    name: "spellPage",
    component: spellPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
