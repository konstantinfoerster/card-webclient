import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchByName = createAsyncThunk('search/fetchAll',
  async ({ query, page = 1 }, { getState, requestId, rejectWithValue }) => {
    const { loading, currentRequestId } = getState()
    if (!loading || requestId !== currentRequestId) {
      return []
    }
    try {
      const response = await fetch(
        `https://api.scryfall.com/cards/search?q=${query}&page=${page}`)
      const json = await response.json()
      return json || {}
    } catch (err) {
      return rejectWithValue(err)
    }
  })

export const nextPage = () => async (dispatch, state) => {
  const { query, loading, hasMore, page } = state()
  if (loading) {
    return
  }
  if (!hasMore) {
    return
  }

  await dispatch(fetchByName({ query, page: page + 1 }))
}

const initialState = {
  list: [],
  query: '',
  page: 1,
  hasMore: false,
  error: null,
  loading: false,
  currentRequestId: undefined,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchByName.pending, (state, action) => {
      if (state.loading) {
        return
      }
      state.query = action.meta.arg.query
      state.page = action.meta.arg.page || 1
      state.currentRequestId = action.meta.requestId
      state.loading = true
      if (state.page === 1) {
        state.list = []
      }
    }).addCase(fetchByName.rejected, (state, action) => {
      if (state.loading && state.currentRequestId === action.meta.requestId) {
        state.loading = false
        state.currentRequestId = undefined
        state.error = action.payload
        state.hasMore = false
      }
    }).addCase(fetchByName.fulfilled, (state, action) => {
      if (state.loading && state.currentRequestId === action.meta.requestId) {
        state.loading = false
        state.currentRequestId = undefined
        state.hasMore = action.payload.has_more || false
        if (state.page === 1) {
          state.list = []
        }
        const data = action.payload.data || []
        const imageUris = data.filter(c => c.image_uris !== undefined)
        .map(c => c.image_uris.normal)
        state.list = state.list.concat(imageUris)
      }
    })
  },
})

export const { reducer } = searchSlice
