import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const token = localStorage.getItem('token');

const instance = axios.create({
    baseURL: 'https://first-node-js-app-r.herokuapp.com/api/',
    timeout: 1000,
    headers: { 'Authorization': 'Bearer ' + token }
});

export const getTasks = createAsyncThunk(
    'tasks/fetchAll',
    async (_, thunkApi) => {
        try {
            const response = await instance.get('/todos')
            console.log(response)
            return response.data
        } catch (err) {
            thunkApi.rejectWithValue('Не удалось загрузить задачи')
        }
    }
)
