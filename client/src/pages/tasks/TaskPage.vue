<template>
  <v-container class="mt-4">
    <v-row class="justify-center align-center gap-2">
      <v-col>
        <h1>Tarefas do Usuario</h1>
      </v-col>

      <v-col cols="12" sm="2" md="2">
        <v-btn color="primary" @click="showDialog()">Nova Tarefa</v-btn>
      </v-col>
    </v-row>

    <v-row class="mt-6" justify="center">
      <v-col v-for="card in cards" :key="card.id_task" cols="12" sm="6" md="4">
        <v-card class="ma-2 pa-4" elevation="2">
          <v-card-title class="d-flex justify-space-between align-center mb-2">
            <v-row no-gutters>
              <v-col class="justify-space-between d-flex">
                <v-chip>
                  {{ card.status_title }}
                </v-chip>
                <v-chip>
                  {{ card.prioridade_title }}
                </v-chip>
                <div>
                  <v-btn icon size="small" @click.stop="showDialog(card)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>

                  <v-btn icon size="small" @click.stop="removerCard(card.id_task)">
                    <v-icon color="red">mdi-close</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card-title>

          <v-card-text>
            <v-row class="mb-4">
              <h2>{{ card.title }}</h2>
            </v-row>
            <v-row>
              {{ card.body }}
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <TaskDialog ref="cardsDialogRef" @submit="onSubmit" @hide="hideDialog" />
  </v-container>
</template>

<script setup>
import taskQueries from '@/queries/task.query.js'
import { onMounted, ref } from 'vue'
import TaskDialog from './TaskDialog.vue'
import usersQuery from '@/queries/users.query'
import { jwtDecode } from 'jwt-decode'

const cardsDialogRef = ref(null)
const cards = ref([])
const statues = ref([])
const priorities = ref([])

const users = ref([])

function showDialog(data) {
  console.log(data)
  cardsDialogRef.value.show(data)
}

function hideDialog() {
  cardsDialogRef.value.hide()
}

async function onSubmit(data) {
  console.log('submit data:', data)

  data.id_task
    ? await taskQueries.editTask(
        data.id_task,
        data.title,
        data.body,
        data.id_status,
        data.id_users,
        data.id_priority,
      )
    : await taskQueries.createTask(
        data.title,
        data.body,
        data.id_status,
        data.id_users,
        data.id_priority,
      )

  hideDialog()

  await reload()
}

async function removerCard(id_task) {
  console.log(id_task)

  await taskQueries.deleteTask(id_task)

  await reload()
}

async function reload() {
  const jwt = localStorage.getItem('token')

  const user = jwtDecode(jwt)

  const priority = await taskQueries.getAllpriorities()
  priorities.value = priority

  const status = await taskQueries.getAllStatus()
  statues.value = status

  const data = await taskQueries.getTaskByUser(user.id_user)
  cards.value = data

  console.log(data)
}

onMounted(async () => {
  users.value = await usersQuery.getAllUsers()

  await reload()
})
</script>
