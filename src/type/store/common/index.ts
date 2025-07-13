
export interface CommonType {
    messageQueue : MessageType[]
    
}

export type MessageType = {
    id : string;
    message : string;
    status : 'success' | 'info' | 'warning' | 'error';
    hasShow : boolean;
}