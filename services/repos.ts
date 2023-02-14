import { Api, APIResponse } from '~/plugins/api'

const base = '/tools'

export async function getListarRepositorios(): Promise<APIResponse> {
	try {
		const { data } = await Api.get(`${base}`)
		return [null, data]
	} catch (error: any) {
		return [error]
	}
}
