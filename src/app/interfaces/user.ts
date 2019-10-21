export interface User {
    // El símbolo ? marca el campo como no obligatorio
    nick: string;
    subnick?: string;
    age?: number;
    email: string;
    friend: boolean;
    uid: any;
}
