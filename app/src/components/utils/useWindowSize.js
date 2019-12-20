import { useState, useEffect, useCallback } from 'react';
import { throttle } from 'lodash';
import { isClient } from '.';

export default () => {
    if (!isClient) {
        return { loading: 0 };
    }
    const [width, setWidth] = useState(window.innerWidth);
    const updateWidth = useCallback(throttle(() => setWidth(window.innerWidth), 100), [width]);
    useEffect(() => {
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    return { width: width };
}
