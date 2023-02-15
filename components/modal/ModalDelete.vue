<template>
  <v-row justify="center">
		<v-icon small @click.stop="dialog = true">mdi-delete</v-icon>

    <v-dialog
      v-model="dialog"
      max-width="450"
    >
      <v-card>
        <v-card-title class="text-h5 d-flex align-center">
          <v-icon class="mt-2">mdi-close </v-icon> Remove Tool
        </v-card-title>

        <v-card-text>
          Are you sure you want to remove <strong>{{ title }}</strong>?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
						outlined
            @click="dialog = false"
          >
						Cancel
          </v-btn>

          <v-btn
            outlined
            @click="$emit('deleteTool', $event)"
          >
            Yes, remove
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	props: {
		title: {
			type: String,
		},
		id: {
			type: String
		},
		dialog: {
			default: false
		},
	},
})

</script>
