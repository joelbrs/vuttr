<template>
	<v-container class="col-md-6 offset-md-3">
		<div class="text-h3 mt-10">VUTTR</div>
		<div class="text-h5 mt-5">Very Useful Tools to Remember</div>
		<div class="d-flex flex-row">
			<v-row>
				<v-container>
					<v-form>
						<div class="d-flex flex-row mt-8">
							<v-row dense>
								<v-col cols="12" :md="4" :lg="4" sm="12">
									<v-text-field
										dense
										v-model="search"
										label="Search"
										placeholder="Search"
										:clearable="true"
										:prepend-inner-icon="'mdi-magnify'"
										outlined
									></v-text-field>
								</v-col>
								<v-col>
									<v-checkbox
										v-model="onlyTags"
										label="search in tags only"
									></v-checkbox>
								</v-col>
							</v-row>
							<ModalAddVue
								@click="dialog = true"
								:dialog="dialog"
								/>
						</div>
					</v-form>
				</v-container>
			</v-row>
		</div>
		<v-row>
			<v-col cols="12" v-for="repo in repos" :key="repo">
				<TheCard @deleteTool="deleteTool(repo.id)" :id="repo.id" :dialog="true" :title="repo.title" :description="repo.description" :link="repo.link" :tags="repo.tags"/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import ModalAddVue from '~/components/modal/ModalAdd.vue'
import TheCard from '~/components/menu/TheCard.vue'
import { deleteToolById, getListRepos } from '~/services/repos'

export default Vue.extend({
	data() {
		return {
			search: '' as string,
			dialog: false,
			repos: [],
			onlyTags: false
		}
	},
	created() {
		this.listRespos()
	},
	methods: {
		async deleteTool(id: string) {
			const [error, response] = await deleteToolById(id)

			this.listRespos()
		},

		async listRespos() {
			const [error, response] = await getListRepos()

			if (error) return
			this.repos = (response as any).data

		},

		filterRepos() {
			this.repos = this.repos.filter((item: any) => {
				if (item.title.toLowerCase().includes(this.search.toLocaleLowerCase()) || item.description.toLowerCase().includes(this.search.toLocaleLowerCase()) || item.tags.includes(this.search.toLocaleLowerCase())) return item
			})
		},

		filterReposOnlyByTags() {
			this.repos = this.repos.filter((item: any) => {
					if (item.tags.includes(this.search.toLocaleLowerCase())) return item
				})
			}
		},

	watch: {
		search(novo) {
			if (novo) this.filterRepos()

			else this.listRespos()
		},
		onlyTags(novo) {
			if (novo && this.search) this.filterReposOnlyByTags()

			if (!this.search) this.listRespos()
		}
	},
	components: { ModalAddVue, TheCard }
})
</script>

