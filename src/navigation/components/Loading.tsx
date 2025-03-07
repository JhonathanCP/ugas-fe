import { forwardRef } from 'react';
import "../assets/loading.css";

const Loading = forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <div className="loading-container" ref={ref}>
            <div className="loading-spinner"></div>
        </div>
    );
});

export default Loading;