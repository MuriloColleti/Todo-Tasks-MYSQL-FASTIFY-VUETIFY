<template>
  <v-app id="inspire" theme="dark">
    <v-navigation-drawer
      v-if="shouldRenderTheMenus"
      v-model="showLateralMenu"
      class="justify-center px-4 pt-4"
    >
      <v-list-item title="Usuarios" to="/users"></v-list-item>
      <v-list-item title="Tarefas" to="/"></v-list-item>
    </v-navigation-drawer>

    <v-app-bar v-if="shouldRenderTheMenus">
      <v-app-bar-nav-icon @click="toggleMenu"> </v-app-bar-nav-icon>

      <v-app-bar-title>TaskList</v-app-bar-title>
      <v-btn variant="tonal" class="mr-2" @click="logout">Sair</v-btn>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'

const route = useRoute()

const router = useRouter()

const showLateralMenu = ref(true)

const shouldRenderTheMenus = computed(() => {
  if (route.path === '/login') return false
  if (route.path === '/register') return false
  return true
})

const token = computed(() => {
  return localStorage.getItem('token')
})

watch(
  token,
  (newValue) => {
    console.log(token.value)

    if (!newValue) return router.push('/login')
    router.push('/')
  },
  { immediate: true },
)

function logout() {
  localStorage.removeItem('token')

  router.push('/login')
}

function toggleMenu() {
  showLateralMenu.value = !showLateralMenu.value
  console.log(showLateralMenu, 'ola')
}
</script>

<style scoped></style>
