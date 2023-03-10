export const useHttp = () => {
  const HTTP_METHOD = {
    GET: 'GET',
    POST: 'POST',
  }
  const httpFetch = async (url, config = { method: HTTP_METHOD.GET }) => {
    return await fetch(url, config)
      .then((response) => processResponse(response))
      .then((data) => data)
  }

  const processResponse = (response) => {
    if (!response.ok) throw new Error('Network response was not OK')
    return response.json()
  }

  const httpGet = async (url) => await httpFetch(url)

  const httpPost = async (url) => await httpFetch(url, { method: HTTP_METHOD.POST })

  return {
    httpGet,
    httpPost,
  }
}
