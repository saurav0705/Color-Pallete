import React from 'react';
import { FaLockOpen,FaLock } from 'react-icons/fa';
import './Color.css';
const Color = ({data,toggle}) => {
    
     
    const background = {
        'backgroundColor':data.color,
        'color':data.text ,
        'fontSize':"42px"
    }
    return (
        <div className="color-container" style={background}>
           
            <div className="lock" onClick={() => toggle(data.name)}>
                {
                    
                    data.status ?
                    <FaLock/>:
                    <FaLockOpen/>
                    
                }
            </div>
        </div>
    )
};


export default Color;