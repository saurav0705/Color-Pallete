import React from 'react';
import { MdCancel } from 'react-icons/md';
import './Show.css';
import fileDownload from 'js-file-download';

const Show = ({toggle,save,toast}) => {
    const downloadFile = (array) => {
        let data = array.map(arr => {
            return arr['background-color'];
        })
        fileDownload(data,"pallete.txt");
    }
    return (
        <div className="show-all" >
            <div  onClick={()=>toggle()} className="close">
                <span className="close-text">
                    <MdCancel/>
                </span>
                </div>
            <div className="download">Click on Pallete heading to download that Pallete and on color to copy it to clipboard</div>
            {
            save.map((saveArray,index) => {
                return (
                    <div className="saved-container">
                        <div className="saved-heading" onClick={() => downloadFile(saveArray)} >Pallete {index+1}</div>
                <div className="saved" key={"saved"+index}>
                    {saveArray.map(color => {return ( <div className="grid-tile" onClick={() => {toast("Copied to clipboard "+color['background-color']);navigator.clipboard.writeText(color['background-color'])}} style={{"backgroundColor":color['background-color'],"color":color['text']}}>{color['background-color']}</div>)})}</div>
                </div>)
            })
        }</div>
    )
};


export default Show;