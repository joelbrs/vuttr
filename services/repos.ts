import { APIResponse } from '~/plugins/api'
const axios = require('axios').default;

const base = 'http://localhost:3000/tools'

export async function getListRepos(): Promise<any> {
	try {
		let data: any = await axios.get(`${base}`).then(r => data = r)
		return [null, data]
	} catch (error: any) {
		return [error]
	}
}

export async function postTools(param: Object): Promise<APIResponse> {
	try {
		const { data } = await axios.post(`${base}`, {...param}).then(r => console.log(r))
		return [null, data]
	} catch (error: any) {
		return [error]
	}
}
export async function deleteToolById(id: string): Promise<APIResponse> {
	try {
		const { data } = await axios.delete(`${base}/${id}`).then(r => console.log(r))
		return [null, data]
	} catch (error: any) {
		return [error]
	}
}
