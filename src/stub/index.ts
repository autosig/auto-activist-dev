import {WebBot} from "../web-bot/web-bot";

type InvocationRequest = {
    method: string,
    args: Array<any>
}

type InvocationResponse = {
    status: 'success' | 'error',
    reason?: string,
    ret?: any
}

type Route = (req: InvocationRequest) => Promise<InvocationResponse>;

function makeError(error: any): InvocationResponse {
    return {
        status: 'error',
        reason: JSON.stringify(error)
    }
}

function makeSuccess(ret: any): InvocationResponse {
    return {
        status: 'success',
        ret: ret
    }
}

export function stubDispatch(req: InvocationRequest, instance): Promise<InvocationResponse> {
    if (!req.method || !req.args) {
        return Promise.resolve(makeError('method or args not present not in request'))
    }
    const method: string = req.method;
    const args: Array<any> = req.args;
    if (!instance[method]) {
        return Promise.resolve(makeError('method ' + method + ' not in instance'));
    }
    try {
        const callable: (...args: Array<any>) => Promise<any> | any = instance[method];
        const ret: Promise<any> | any = callable.apply(instance, args);
        return Promise.resolve(ret).then(makeSuccess).catch(makeError)
    } catch (err) {
        return Promise.resolve(makeError(err))
    }
}

export function stubbify(route: Route, instance) {
    Object.getOwnPropertyNames(Object.getPrototypeOf(instance))
        .filter(k => typeof instance[k] === 'function')
        .forEach(method => {
            instance[method] = (...args: any[]) => sendToStub(route, method, args);
        });
}

function sendToStub<T>(route: Route, method: string, args: Array<any>): Promise<any> {
    if (args === undefined)
        args = [];
    const req: InvocationRequest = {method, args};
    return route(req).then(response => {
        console.info(`${req.method}(${req.args.map(a => JSON.stringify(a)).join(", ")}) -> ${JSON.stringify(response)}`);
        if (response.status === "success") {
            return response.ret;
        } else if (response.status === "error") {
            throw new Error(response.reason);
        }
    })
}
