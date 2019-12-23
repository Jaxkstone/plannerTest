import axios from "axios";

const instanse = axios.create({
    baseURL: `http://localhost:4000/api/`,
    //open key = FMWWRDOF
    //Private key = 29165b1b-a34f-4999-9d4f-8e9799b9d37d
    //id project = 5df1108fff7a25af8a26255c
})

export const todoApi = {
    getTodos(){
        return instanse.get(`todo`)
    },

    addTodoApi(text:string, completed = false ){
        return instanse.post(`todo`, {text, completed} )
    },

    deleteTodoApi(id:number){
        return instanse.delete(`todo/${id}`)
    },

    deleteTodoAll(){
        return instanse.delete(`todo`)
    },

    deleteTodoCompleted(ids:number[]){
        return instanse.post(`todo/delete-array`, {ids})
    },

    toggleCompleted(id:number, completed:boolean){
        return instanse.put(`todo/${id}`, {completed})
    },
}
