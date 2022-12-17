import '@/styles/components/ErrorMessage.scss';
import { Bug } from 'react-bootstrap-icons'

type Props = { 
    title?: string;
    message?: string
};

export default function ErrorMessage({ title = 'Something went wrong', message = 'Please try again.'}: Props) {
    return (
        <div className="error-indicator">
            <div className="title">
                <Bug/>
                <span>{title}</span>
            </div>
            {message && <div className="error-message">{message}</div>}
        </div>
    )
}

