import React, { useEffect, useState } from 'react';
import './Toast.css';
const Toast = ({message,random}) => {
    const [cls,setCls] = useState('snackbar show');
    useEffect(()=>{
        setCls('snackbar show-toast');
        setTimeout(()=>{
            setCls("snackbar")
        },3000)
    },[random])
    return (<>
        { message.length !==0 ?
        <div className={cls}>{message}</div>:null}
        </>
    )
};

export default Toast;