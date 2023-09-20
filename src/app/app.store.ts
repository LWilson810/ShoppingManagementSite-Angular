import { AppState } from './app.state'
import {
    createStore, 
    Reducer,
    Store,
    StoreEnhancer,
    
    compose } from 'redux';
import {authReducer} from './auth.reducer'
import { InjectionToken } from '@angular/core';
 export function createAppStore(): Store<AppState> {
    return createStore(
        authReducer,
    compose(devtools)
    );
    }
export const AppStore = new InjectionToken('app.store');

 const devtools: StoreEnhancer<AppState> =
 window['devToolsExtension'] ?
 window['devToolsExtension']() : f => f;


 export const appStoreProviders = [
{ provide: AppStore,useFactory: createAppStore}
];
