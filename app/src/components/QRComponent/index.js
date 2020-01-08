import React, { useState, useEffect, useRef } from 'react';
import { isClient } from '../utils';
import QRGenerator from './qrGenerator';
import PlainTextSection from './plainText';

const QRComponent = ({ topicId, loading, error }) => {
  // TODO: a better way to do Gatsby route management
  const location = isClient ? `${window.location.origin}/topic/${topicId}` : '';
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef();

  useEffect(()=> {
    setContainerWidth(containerRef.current.clientWidth);
  }, []);

  return (
    <div ref={containerRef}>
      {loading || error ? <></> : <>
        <QRGenerator locationText={location} windowWidth={containerWidth}/>
        <PlainTextSection locationText={location} />
      </>}
    </div>
  );
}

export default QRComponent;
