
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { isClient } from '../utils';
// import { signIn } from '../utils/auth';

import { Paper, makeStyles, Typography, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(1)
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  buttonContainer: {
    marginTop: theme.spacing(3)
  },
  button: {
    textTransform: "none",
    width: '100%'
  }
}));

const generateQR = async text => {
  try {
    const qrSource = await QRCode.toDataURL(text);
    console.log({target: text, qrSource});
    return qrSource;
  } catch (err) {
    console.error(err)
  }
}

const QRGenerator = ({ topicId }) => {
  const location = isClient ? `${window.location.origin}/topic/${topicId}` : '';
  const [qrImageSrc, setQrImageSrc] = useState('');

  useEffect(() => {
    generateQR(location).then(response => {
      setQrImageSrc(response);
    })
  }, [topicId])

  return (
    <img src={qrImageSrc} alt="QR Code" width="200" height="200" />
  );
}

export default QRGenerator;
