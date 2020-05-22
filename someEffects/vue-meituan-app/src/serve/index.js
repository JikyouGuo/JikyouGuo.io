import axios from 'axios'
import urls from './urls'
import params from './params'
const request = axios.create({
  baseURL: urls.baseUrl,
  params
})
const serve = {}
Object.keys(urls).splice(1).forEach(ele => {
  serve[ele] = (option = {}) => request.get(urls[ele], {params: {...option}})
})
export default serve
