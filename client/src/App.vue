<template>
  <v-app id="inspire" theme="dark">
    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-if="shouldRenderTheMenus"
      v-model="showLateralMenu"
      class="justify-center px-4 pt-4"
      data-testid="nav-drawer-btn"
    >
      <v-list-item title="Usuarios" to="/users"></v-list-item>
      <v-list-item title="Tarefas" to="/"></v-list-item>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar v-if="shouldRenderTheMenus">
      <v-app-bar-nav-icon @click="toggleMenu"> </v-app-bar-nav-icon>
      <v-app-bar-title>TaskList</v-app-bar-title>
      <v-btn variant="tonal" class="mr-2" @click="logout">Sair</v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'

const route = useRoute()
const router = useRouter()

// controla visibilidade da sidebar
const showLateralMenu = ref(false) // <-- começa escondida

// mostra menus apenas se não estivermos nas rotas de login ou register
const shouldRenderTheMenus = computed(() => {
  return !['/login', '/register'].includes(route.path)
})

// botão para alternar sidebar
function toggleMenu() {
  showLateralMenu.value = !showLateralMenu.value
}

// logout
function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>
