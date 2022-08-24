import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getAllDiseaseUsecase from '../../domain/usecase/getAllDiseaseUsecase';

const initialState = {
    loading: false,
    diseases: [],
    error: '',
    page: 0
}

export const diseaseSlice = createSlice({
    name: "diseases",
    initialState,
    reducers: {
        setDiseases: (state, action) => {
            return {
                ...state,
                diseases: action.payload.content,
                page: action.payload.number
            }
        },

        setPage: (state, action) => {
            return {
                ...state,
                page: action.payload
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDiseases.pending, (state) => {
            state.loading = true
        })

        builder.addCase(fetchDiseases.fulfilled, (state, action) => {
            state.loading = false
            state.diseases = action.payload.content
            state.error = ''
        })

        builder.addCase(fetchDiseases.rejected, (state, action) => {
            state.loading = false
            state.diseases = []
            state.error = action.error.message
        })
    }
})

export const fetchDiseases = createAsyncThunk('diseases/fetchAll', async (page) => {
    return await getAllDiseaseUsecase(page);
})

export const { setDiseases } = diseaseSlice.actions

export default diseaseSlice.reducer


/*export function loadDiseases() {
    return async function (dispatch) {
        const diseases = await getAllDiseaseUsecase(0);
        dispatch(setDiseases(diseases));
    }
} =*/