import { EventEmitter } from 'events';

export class CallAwaiter extends EventEmitter {
    public awaitCall(event: string): Promise<any[]> {
        return new Promise<any[]>((resolve): void => {
            this.once(event, resolve);
        });
    }

    public resolveCall(event: string): (...args: any[]) => boolean {
        return (...args: any[]): boolean => this.emit(event, ...args); // eslint-disable-line @typescript-eslint/no-unsafe-argument
    }
}
