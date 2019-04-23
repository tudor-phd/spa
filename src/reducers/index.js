const reducer = (state = {}, action) => {
     switch (action.type) {
       case 'GET_ITEMS':
            return { ...state, loading: true };
       case 'ITEMS_RECEIVED':
            return { ...state, items: action.json, loading: false }
       default: 
            return state;
     }
    };
    export default reducer;