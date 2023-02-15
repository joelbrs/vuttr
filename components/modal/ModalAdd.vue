<template>
    <v-dialog
      v-model="dialog"
      max-width="600px"
			@addTool="$emit('addTool')"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
					outlined
          v-bind="attrs"
          v-on="on"
        >
          +Add
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="ml-3 text-h5">+Add new tool</span>
        </v-card-title>
        <v-card-text>
          <v-container>
							<v-form>
									<v-row dense>
										<v-col cols="12" sm="12">
											<v-text-field
												dense
												v-model="tool.title"
												label="Tool Name"
												placeholder="Tool Name"
												:clearable="true"
												outlined
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="12">
											<v-text-field
												dense
												v-model="tool.link"
												label="Tool Link"
												placeholder="Tool Link"
												:clearable="true"
												outlined
											></v-text-field>
										</v-col>
								<v-col cols="12" sm="12">
									<v-textarea
										outlined
										v-model="tool.description"
										label="Tool Description"
										placeholder="Tool Description"
										:clearable="true"
									></v-textarea>
								</v-col>
										<v-col cols="12" sm="12">
											<v-text-field
												dense
												v-model="tool.tags"
												label="Tool Tags"
												placeholder="Tool Tags"
												:clearable="true"
												outlined
											></v-text-field>
										</v-col>
									</v-row>
							</v-form>
						</v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
						outlined
            @click="addTool"
						class="mb-2 mr-5"
          >
            Add tool
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { postTools } from '~/services/repos';

export default Vue.extend({
	data() {
		return {
			tool: {
				title: '' as string,
				link: '' as string,
				description: '' as string,
				tags: [] as Array<String>
			},
		}
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
	methods: {
		async addTool(): Promise<void | undefined> {
			this.tool.tags = this.tool.tags.split(' ')
			const [error, response] = await postTools({
				...this.tool
			})
			this.dialog = false

			if (error) return
		},
	}
})
</script>
