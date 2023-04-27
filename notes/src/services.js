import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
        return response.data}) 
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, update }


// Error handler for reject promises: 
// axios
//   .get('http://example.com/probably_will_fail')
//   .then(response => {
//     console.log('success!')
//   })
//   .catch(error => {
//     console.log('fail')
//   })