export interface ToastEvent {
    type: EventType;
    title: string;
    message: string;
}

export enum EventType {
    Success = 'success',
    Info = 'info',
    Warning = 'warning',
    Error = 'error',
}