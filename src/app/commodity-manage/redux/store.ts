import { State } from './state'
import { createStore, Reducer, Store, StoreEnhancer, compose } from 'redux';
import { AppReducer } from './reducer';
import { InjectionToken, Injectable } from '@angular/core';



export function createAppStore(): Store<State> {
  return createStore(
    AppReducer,
    compose(devtools)
  );
}

export const AppStore = new InjectionToken('app.store');

const devtools: StoreEnhancer<State> =
  window['devToolsExtension'] ?
  window['devToolsExtension']() : f => f;


export const appStoreProviders = [
  { provide: AppStore, useFactory: createAppStore}
];

@Injectable()

export class StoreService {
    public store = AppStore
}


