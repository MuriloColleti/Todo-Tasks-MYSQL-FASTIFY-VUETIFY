<template>
  <section class="mx-4 mt-4">
    <section>
      <v-row justify="space-between" align="baseline">
        <h1 class="mb-4">Usuarios</h1>
        <section>
          <v-btn variant="tonal" @click="showDialog">Novo Usuario</v-btn>
        </section>
      </v-row>
    </section>

    <section>
      <v-data-table
        :headers="headers"
        :items="users"
        height="400"
        item-value="id_user"
        fixed-header
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn icon size="small" @click.stop="showDialog(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <v-btn icon size="small" @click.stop="deleteUser(item.id_user)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </section>
    <UserDialog ref="userDialogRef" @hide="hideDialog" @submit="onSubmit" />
  </section>
</template>

<script setup>
import userQueries from '@/queries/users.query'
import { onMounted, ref } from 'vue'
import UserDialog from './UserDialog.vue'

const users = ref([])
const userDialogRef = ref()

const headers = [
  { title: 'Id do Usuario', align: 'start', key: 'id_user' },
  { title: 'Username', align: 'start', key: 'username' },
  { title: 'Email', align: 'start', key: 'email' },
  { title: '', key: 'actions' },
]

function showDialog(data) {
  console.log(data)
  userDialogRef.value.show(data)
}

function hideDialog() {
  userDialogRef.value.hide()
}

async function onSubmit(data) {
  console.log(data)

  data.id_user
    ? await userQueries.editUser(data.id_user, data.username, data.email, data.password)
    : await userQueries.createUser(data.username, data.email, data.password)

  hideDialog()
  users.value = await userQueries.getAllUsers()
}

async function deleteUser(id_user) {
  console.log(id_user)
  await userQueries.deleteUser(id_user)

  users.value = await userQueries.getAllUsers()
}

onMounted(async () => {
  const data = await userQueries.getAllUsers()
  users.value = data

  console.log(data)
})
</script>
