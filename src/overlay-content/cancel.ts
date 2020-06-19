import {router} from "../router";

function makePath(runId: string): string {
    return `/hp/cancel/run/${runId}`
}

export function runCancellationPromise(runId: string): Promise<void> {
    return new Promise<void>(res => {
        router.addRoute(makePath(runId), () => {
            console.warn('got cancellation message');
            res();
        })
    })
}

export function cancelRun(runId: string): Promise<void> {
    return router.sendMessage(makePath(runId))
}
