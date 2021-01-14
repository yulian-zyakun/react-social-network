const SEND_MESSAGE = "SEND-MESSAGE";

let initialState = {
  dialogs: [
    { id: 1, name: "Derek" },
    { id: 2, name: "Thom" },
    { id: 3, name: "Jim" },
    { id: 4, name: "Garret" },
    { id: 5, name: "Victor" },
  ],

  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "Hows it doing?" },
    { id: 3, message: "Great!!!" },
  ],
  newMessageBody: "",
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.newMessageBody;

      return {
        ...state,
        messages: [...state.messages, { id: 0, message: body }],
      };

    default:
      return state;
  }
};

export const sendMessageActionCreator = (newMessageBody) => ({
  type: SEND_MESSAGE,
  newMessageBody,
});

export default dialogsReducer;
