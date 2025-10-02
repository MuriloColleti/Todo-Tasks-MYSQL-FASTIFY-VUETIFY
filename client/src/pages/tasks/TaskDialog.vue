<template>
  <v-dialog v-model="showDialog" width="50%">
    <v-card prepend-icon="mdi-update" :title="dialogTitle">
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Titulo" v-model="model.title" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-text-field label="Descrição" v-model="model.body" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-select
              v-model="model.id_users"
              :items="users"
              item-title="username"
              item-value="id_user"
              label="Selecionar Usuário"
              :return-object="false"
              multiple
              outlineds
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-select
              v-model="model.id_status"
              :items="statuses"
              item-title="title"
              item-value="id_status"
              label="Selecione o Status"
              :return-object="false"
              outlineds
            />
          </v-col>
        </v-row>
      </v-card-text>
      <template v-slot:actions>
        <v-btn @click="close">Cancelar</v-btn>
        <v-btn @click="submit">Salvar</v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
import usersQuery from '@/queries/users.query'
import taskQuery from '@/queries/task.query'
import { computed, ref } from 'vue'

const showDialog = ref(false)
const model = ref({ title: '', body: '', id_task: '', id_status: '', id_users: [] })
const users = ref([])
const statuses = ref([])

const emit = defineEmits(['hide', 'submit'])

const dialogTitle = computed(() => (model.value.id_task ? 'Editar Tarefa' : 'Criar Tarefa'))

async function show(data = {}) {
  model.value = {
    title: data.title || '',
    body: data.body || '',
    id_status: data.id_status || '',
    id_task: data.id_task ? data.id_task : undefined,
    id_users: data.id_users || [],
  }

  users.value = await usersQuery.getAllUsers()
  statuses.value = await taskQuery.getAllStatus()

  showDialog.value = true
}

function close() {
  emit('hide')
  showDialog.value = true
}

function hide() {
  showDialog.value = false
}

function submit() {
  emit('submit', {
    id_task: model.value.id_task,
    title: model.value.title,
    body: model.value.body,
    id_status: model.value.id_status,
    id_users: model.value.id_users,
  })
}

defineExpose({
  show,
  hide,
})
</script>
