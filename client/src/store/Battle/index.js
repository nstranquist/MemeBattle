

// Battle Types
const ADD_GIF = 'ADD_GIF'
const SET_PROMPT = 'SET_PROMPT'
const RESET_BATTLE_DATA = 'RESET_BATTLE_DATA'


// Battle Actions
export const addGif = (gifId) => ({
  type: ADD_GIF,
  gif: gifId
})
export const resetBattleData = () => ({
  type: RESET_BATTLE_DATA
})
export const setPrompt = (prompt) => ({
  type: SET_PROMPT,
  prompt
})


// Battle Reducer
const initialState = {
  gifs: [],
  prompt: undefined,
  errors: null
}

export default (
  state=initialState,
  action
) => {
  switch(action.type) {
    case ADD_GIF:
      return {
        ...state,
        gifs: [
          ...state.gifs,
          action.gif
        ]
      }
    case SET_PROMPT:
      return {
        ...state,
        prompt: action.prompt,
      }
    case RESET_BATTLE_DATA:
      return initialState;
    default:
      return state;
  }
}