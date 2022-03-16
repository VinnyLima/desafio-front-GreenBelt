import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import Router from 'next/router'
import { AuthTokenError } from './erros/AuthTokenError'

let isRefreshing = false
let failedRequestQueue = []

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_HOST,
    headers: {
      Authorization: `Bearer ${cookies['GBAdmin.Token']}`
    }
  })

  api.interceptors.response.use(
    response => {
      return response
    },
    (error: AxiosError) => {
      if (error.response.status === 401) {
        if (error.response.data?.message === 'Token JWT invalido') {
          cookies = parseCookies(ctx)

          const { 'GBAdmin.refreshToken': refreshToken } = cookies

          const originalConfig = error.config

          if (!isRefreshing) {
            isRefreshing = true
            api
              .post('admin/sessions/refreshToken', {
                token: refreshToken
              })
              .then(response => {
                const { token } = response.data?.data
                setCookie(ctx, 'GBAdmin.token', token, {
                  maxAge: 60 * 20,
                  path: '/',
                  sameSite: 'lax'
                })

                setCookie(
                  ctx,
                  'GBAdmin.refreshToken',
                  response.data?.data.refreshToken,
                  {
                    maxAge: 60 * 60 * 24 * 3,
                    path: '/',
                    sameSite: 'lax'
                  }
                )

                api.defaults.headers.common.Authorization = `Bearer ${token}`

                failedRequestQueue.forEach(request => request.onSuccess(token))
                failedRequestQueue = []
              })
              .catch(err => {
                failedRequestQueue.forEach(request => request.OnFailure(err))
                failedRequestQueue = []
                if (process.browser) {
                  destroyCookie(ctx, 'GBAdmin.token')
                  destroyCookie(ctx, 'GBAdmin.refreshToken')
                  Router.push('/')
                }
              })
              .finally(() => {
                isRefreshing = false
              })
          }

          return new Promise((resolve, reject) => {
            failedRequestQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers.Authorization = `Bearer ${token}`
                resolve(api(originalConfig))
              },
              OnFailure: (err: AxiosError) => {
                reject(err)
              }
            })
          })
        }

        /* else {
          const { 'GBAdmin.refreshToken': refreshToken } = parseCookies();
          if (refreshToken) {
            api
              .delete('/sessions/refreshToken', {
                headers: {
                  ['x-acess-token']: refreshToken,
                },
              })
              .catch(err => {
                console.log(err);
              });
          }

          if (process.browser) {
            destroyCookie(ctx, 'GBAdmin.token', { path: '/' });
            destroyCookie(ctx, 'GBAdmin.refreshToken', { path: '/' });
            destroyCookie(ctx, 'GBAdmin.empresaSelect', { path: '/' });
            Router.push('/');
          } else {
            return Promise.reject(new AuthTokenError());
          }
        } */
      }

      return Promise.reject(error)
    }
  )

  return api
}
