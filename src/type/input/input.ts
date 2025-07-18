export interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    type?: string;
    value: string;
    small?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
