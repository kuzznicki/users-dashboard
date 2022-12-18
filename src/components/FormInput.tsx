import { Form } from "react-bootstrap";
import { capitalize } from "@/utils";

type Props = {
    field: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    disabled?: boolean;
};

export default function FormInput({ field, type, value, required, disabled, onChange }: Props) {
    const fieldLabel = capitalize(field);
    return (
        <Form.Group className="mb-4" controlId={field}>
            <Form.Label>
                {fieldLabel}{required && '*'}
            </Form.Label>
            <Form.Control 
                type={type}
                value={value} 
                placeholder={`Enter ${fieldLabel}`} 
                required={required}
                disabled={disabled}
                onChange={(event) => onChange(event.target.value)}
            />
        </Form.Group>
    );
}