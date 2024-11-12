import axios from "axios";
const url = "/api/persons"


const getAll = () => {

    return axios.get(url).then((response) => {
        console.log('Get operation response is ', response)
        return response.data


    })
}
const create = (personObject) => {
    return axios.post(url, personObject).then(response => {
        console.log('Post request has the response data as ',response.config.data)
        return response.config.data
    }
    )

}
const deleteEntry = (id) => {
    let deleteUrl = `${url}/${id}`
    console.log('Delete url is', deleteUrl)
    return axios.delete(deleteUrl).then(response => {
        console.log('Delete operation response is ', response)
        console.log('Delete operation response data is ',response.data)
        return response.data
    }
    )

}
const updateNumber = (id, newPersonObj) => {

    return axios.put(`${url}/${id}`, newPersonObj).then(res => {
        console.log('Update operation res data is ',res.data)
        return res.data
    }
    )

}
export default { getAll, create, deleteEntry, updateNumber }