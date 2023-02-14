/* eslint-disable import/named */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Plugin } from '@nuxt/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

declare module '@nuxt/types' {
	interface Context {
		$api: NuxtAxiosInstance
	}
}

declare module 'vuex/types/index' {
	interface Store<S> {
		$api: NuxtAxiosInstance
	}
}

declare module 'vue/types/vue' {
	interface Vue {
		$api: NuxtAxiosInstance
	}
}

let Api: NuxtAxiosInstance


const options: Object = {
	baseURL: 'localhost:3000',
	timeout: 1000 * 60,
	maxContentLength: 5242880,
	// withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json'
	}
}

const axiosApi: Plugin = ({ $axios, $auth }, inject) => {
	const api: NuxtAxiosInstance = $axios.create(options)

	api.interceptors.request.use(
		(config) => {

			return config
		},
		(error) => error
	)

	Api = api

	inject('api', api)
}

export default axiosApi

export { Api }

export type APIResponse = [null, AxiosResponse] | [Error]
