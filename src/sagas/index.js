import { put, takeLatest, all } from 'redux-saga/effects';
const delay = (ms) => new Promise(res => setTimeout(res, ms));
const apiUrl = process.env.REACT_APP_API_URL;

function* fetchItems() {
   const json = yield fetch(apiUrl)
      .then(response => response.json());
   //simulate server response with delay   
   yield delay(1000)
   yield put({ type: "ITEMS_RECEIVED", json: json.items, });
}
function* actionWatcher() {
   yield takeLatest('GET_ITEMS', fetchItems)
}
export default function* rootSaga() {
   yield all([
      actionWatcher(),
   ]);
}