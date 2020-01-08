import React, { useRef, useState, useEffect } from 'react';
import QRCode from 'qrcode';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
// import { signIn } from '../utils/auth';

import { Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2),
  },
  largeImage: {
    transition: 'all 0.2s ease',
    width: windowWidth => `${windowWidth / 2.5}px`,
    height: windowWidth => `${windowWidth / 2.5}px`,
  },
  normalImage: {
    transition: 'all 0.2s ease',
    width: windowWidth => `${windowWidth / 6}px`,
    height: windowWidth => `${windowWidth / 6}px`,
  }
}));

const generateQR = async text => {
  try {
    const qrSource = await QRCode.toDataURL(text);
    console.log({ target: text, qrSource });
    return qrSource;
  } catch (err) {
    console.error(err)
  }
}

const QRGenerator = ({ locationText, windowWidth }) => {
  const classes = useStyles(windowWidth);
  const [qrImageSrc, setQrImageSrc] = useState('');
  const imageRef = useRef(null);

  useEffect(() => {
    generateQR(locationText).then(response => {
      setQrImageSrc(response);
    })
  }, [locationText])

  const zoomInImage = (e) => {
    imageRef.current.className = imageRef.current.className === classes.normalImage ? classes.largeImage : classes.normalImage;
  };

  return (
    <>
      <img src={qrImageSrc} alt="QR Code" ref={imageRef} className={classes.normalImage} />
      <ZoomOutMapIcon fontSize="large" onClick={zoomInImage} />
    </>
  );
}

export default QRGenerator;
