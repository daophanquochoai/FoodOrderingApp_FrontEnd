<<<<<<< HEAD
export interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    type?: string;
    value: string;
    small?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
=======
export type FloatingInputProps = {
    label: string;
    id: string;
    type?: string;
    error: boolean;
    helperText: string;
    small?: boolean;
};
>>>>>>> main
