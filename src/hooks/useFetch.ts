import useSWR from 'swr'
import { api } from '../services/apiClient'

export function useFetch<Data = any, Error = any>(
  url: string,
  refreshInterval?: number,
  idEmpresa?: string
) {
  const { data, error, mutate } = useSWR<Data, Error>(
    url,
    async url => {
      const response = await api.get(url, {
        headers: {
          id_empresa: idEmpresa
        }
      })

      return response.data
    },
    {
      refreshInterval
    }
  )

  return { data, error, mutate }
}
