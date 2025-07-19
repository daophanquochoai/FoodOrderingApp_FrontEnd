import React from 'react';

export type FloatingInputProps = {
    label: string;
    id: string;
    type?: string;
    error: boolean;
    helperText: string;
    small?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;
