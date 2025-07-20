import React from 'react';
export type FloatingInputProps = {
    label: string;
    id: string;
    type?: string;
    error: boolean;
    helperText: any;
    small?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement> &
    React.TextareaHTMLAttributes<HTMLTextAreaElement>;
