<template>
  <v-container class="fill-height justify-center">
    <section>
      <v-app-bar class="px-4">
        <v-app-bar-title>RegisterPage</v-app-bar-title>

        <section class="px-2">
          <v-btn rounded="xl" class="px-4" variant="tonal" :to="'/'"> Home </v-btn>
        </section>

        <v-btn rounded="xl" class="px-4" variant="tonal" :to="'/login'"> Login </v-btn>
      </v-app-bar>
    </section>

    <section>
      <v-card width="400">
        <v-card-title>Register</v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="data.username"
                type="text"
                :clearable="true"
                label="Username"
                placeholder="Digite seu Username"
                data-testid="username-input"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="data.email"
                type="email"
                :clearable="true"
                label="E-email"
                placeholder="Digite seu email"
                data-testid="email-input"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="data.password"
                type="password"
                :clearable="true"
                label="Senha"
                placeholder="Digite sua senha"
                data-testid="password-input"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-row class="ma-4" justify="end">
            <v-btn rounded="xl" class="px-4" variant="tonal" @click="onSubmit"> Registrar </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </section>
  </v-container>
</template>

<script setup>
import usersQuery from '@/queries/users.query'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const data = reactive({
  username: '',
  email: '',
  password: '',
})

async function onSubmit() {
  if (!data.username || !data.email || !data.password)
    return alert('Campos Obrigatorios não Prenchidos!')

  await usersQuery.createUser(data.username, data.email, data.password)

  router.push('/login')
}
</script>
