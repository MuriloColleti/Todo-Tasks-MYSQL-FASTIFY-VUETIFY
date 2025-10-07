<template>
  <v-dialog v-model="showDialog" width="50%">
    <v-card prepend-icon="mdi-update" :title="dialogTitle">
      <v-card-text>
        <v-text-field label="Username" v-model="model.username" data-testid="username-input" />

        <v-text-field label="Email" v-model="model.email" data-testid="email-input" />

        <v-text-field label="Senha" v-model="model.password" data-testid="password-input" />
      </v-card-text>
      <template v-slot:actions>
        <v-btn @click="close">Cancelar</v-btn>
        <v-btn @click="submit">Salvar</v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, ref } from 'vue'

const showDialog = ref(false)
const model = ref({ username: '', email: '', password: '', id_user: undefined })

const emit = defineEmits(['hide', 'submit'])

const dialogTitle = computed(() => {
  if (model.value.id_user) return 'Editar usuario'
  return 'Criar usuario'
})

function show(data) {
  if (data.id_user) {
    model.value = {
      ...data,
    }
  }

  showDialog.value = true
}

function close() {
  showDialog.value = true
  emit('hide')
}

function hide() {
  showDialog.value = false
}

function submit() {
  emit('submit', {
    username: model.value.username,
    email: model.value.email,
    password: model.value.password,
    id_user: model.value.id_user,
  })
  hide()
}

defineExpose({
  show,
  hide,
})
</script>
