import { InitialState } from "./types"
export const initialState: InitialState = {
  channels: [
    {
      id: 'music',
      name: 'Music',
    },
    {
      id: 'movie',
      name: 'Movie',
    },
    {
      id: 'sports',
      name: 'Sports',
    }
  ],
  messages: []
}