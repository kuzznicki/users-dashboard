import { Spinner } from 'react-bootstrap';
import '@/styles/components/Loading.scss';

export default function Loading({ message = 'Loading'}) {
    return (
        <div className="loading-indicator">
            <Spinner animation="border" variant="primary"/>
            <div className='loading-text'>{message}</div>
        </div>
    );
}