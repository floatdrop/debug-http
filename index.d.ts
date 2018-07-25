declare module 'debug-http' {
    import { request } from 'http';

    type FirstArgument<T> = T extends (arg1: infer U, ...args: any[]) => any
        ? U
        : any;
    type SecondArgument<T> = T extends (
        arg1: any,
        arg2: infer U,
        ...args: any[]
    ) => any
        ? U
        : any;

    type callbackType = (
        original: typeof request,
        options: FirstArgument<typeof request>,
        callback: SecondArgument<typeof request>,
    ) => ReturnType<typeof request>;

    function debugHttp(fn?: callbackType): void;
    export default debugHttp;
}

