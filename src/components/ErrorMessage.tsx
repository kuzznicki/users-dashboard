import { Bug as Icon } from 'react-bootstrap-icons'
import '@/styles/components/ErrorMessage.scss';

export default function ErrorMessage({ title = 'Something went wrong', message = 'Please try again.'}) {
    return (
        <div className="error-indicator">
            <div className="title">
                <Icon/>
                <span>{title}</span>
            </div>
            {message && <div className="error-message">{message}</div>}
        </div>
    )
}