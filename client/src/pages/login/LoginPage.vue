<template>
  <v-container class="fill-height justify-center">
    <section>
      <v-app-bar class="px-4">
        <v-app-bar-title>LoginPage</v-app-bar-title>

        <v-btn rounded="xl" class="px-4" variant="tonal" :to="'/register'"> Register </v-btn>
      </v-app-bar>
    </section>

    <section>
      <v-card width="400">
        <v-card-title>Login</v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="user.email"
                type="email"
                :clearable="true"
                label="E-email"
                placeholder="Digite seu email"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="user.password"
                type="password"
                :clearable="true"
                label="Senha"
                placeholder="Digite sua senha"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-row class="ma-4" justify="end">
            <v-btn rounded="xl" class="px-4" variant="tonal" @click="handleLogin"> Logar </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </section>
  </v-container>
</template>

<script setup>
import { reactive } from 'vue'
import login from '@/queries/auth.query'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = reactive({
  email: '',
  password: '',
})

async function handleLogin() {
  const data = await login(user.email, user.password)

  localStorage.setItem('token', data.token)

  router.push('/')
}
</script>
