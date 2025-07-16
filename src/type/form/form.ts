import { Control, FieldError } from 'react-hook-form';

export interface FormInputProps {
    name: string;
    control: Control<any>;
    label: string;
    placeholder?: string;
    type?: string;
    error?: FieldError;
}

export interface FormRangeInputProps {
    nameFrom: string;
    nameTo: string;
    control: Control<any>;
    label: string;
    placeholderFrom?: string;
    placeholderTo?: string;
    type?: string;
    error?: FieldError;
}

export interface Option {
    label: string;
    value: string;
}

export interface FormSelectProps {
    name: string;
    control: Control<any>;
    label: string;
    options: Option[];
    placeholder?: string;
    mode?: 'multiple' | 'tags';
    error?: FieldError;
}

export interface FormDateRangePickerProps {
    name: string;
    control: Control<any>;
    label: string;
    error?: FieldError;
}
