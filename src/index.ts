import Files from './components/Files';
import filesReducer from './services/fileActions';
import { fileActionWatcherSaga } from './sagas/fileActionsSaga';

export {
    Files,
    filesReducer,
    fileActionWatcherSaga
}

export function test() {
    console.log("test");
}