export interface AppState { 
    counter: number,
     isAuthenticated: boolean,
    user: string,
    curPage: number;
    img: [];
};
export interface Action {
 type: string;
 payload?: string;
 }