<template>
  <v-card
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
				<div class="d-flex row-direction justify-space-between">
					<a :href="link" target="_blank" class="text-h5 mt-1 mb-2">
						{{ title }}
					</a>
					<v-card-actions>
						<ModalDelete @deleteTool="$emit('deleteTool')" :id="id" :dialog="dialog" :title="title"/>
					</v-card-actions>
				</div>

        <v-list-item-title class="mb-3">
          {{ description }}
        </v-list-item-title>
				<div class="d-flex row-direction">
					<v-list-item-subtitle v-for="(tag, i) in tags" :key="i">#{{ tag }}</v-list-item-subtitle>
				</div>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import ModalDelete from '../modal/ModalDelete.vue';

export default Vue.extend({
	props: {
		title: {
			type: String,
			required: true
		},
		id: {
			type: String
		},
		link: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		tags: {
			type: Array,
			default: []
		},
	},

	computed: {
		dialog: {
			get(): Boolean {
				return this.value
			},
			set(val: Boolean) {
				this.$emit('input', val)
			}
		},
	},

	components: {ModalDelete}
})
</script>
