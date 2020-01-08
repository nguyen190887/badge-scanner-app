import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { isClient } from '../utils';

const useStyles = makeStyles(theme => ({
  margin: {
    '& >*': {
      marginRight: theme.spacing(2),
    },
  }
}));

const PlainTextSection = ({ locationText }) => {
  const classes = useStyles();
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  const copyToClipboard = (e) => {
    textAreaRef.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    // e.target.focus();
    setCopySuccess('Copied!');
  };

  return (
    <div>
      <form className={classes.margin}>
        <Input inputRef={textAreaRef} value={locationText} inputProps={{ 'aria-label': 'QR Url', readOnly: true }} />
        {
          document.queryCommandSupported('copy') && <>
            <Button onClick={copyToClipboard} variant="contained" color="secondary">Copy</Button>
            {copySuccess}
          </>
        }
      </form>
    </div>
  );
}

export default PlainTextSection;
