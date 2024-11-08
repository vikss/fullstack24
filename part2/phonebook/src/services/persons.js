import axios from "axios";
const url = "http://localhost:3001/persons"


const getAll = () => {

    return axios.get(url).then((response) => {
        console.log(response)
        return response.data


    })
}
const create = (personObject) => {
    return axios.post(url, personObject).then(response => {
        console.log(response.data)
        return response.data
    }
    )

}
const deleteEntry = (id) => {
    let deleteUrl = `${url}/${id}`
    console.log(deleteUrl)
    return axios.delete(deleteUrl).then(response => {
        console.log(response)
        console.log(response.data)
        return response.data
    }
    )

}
const updateNumber = (id, newPersonObj) => {

    return axios.put(`${url}/${id}`, newPersonObj).then(res => {
        console.log(res.data)
        return res.data
    }
    )

}
export default { getAll, create, deleteEntry, updateNumber }