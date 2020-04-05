import React, { useState, useEffect } from 'react';
import { FaSave,FaPalette } from 'react-icons/fa';
import './Main.css';
import Color from '../Color/Color';
import Show from '../Show/Show';
import Toast from '../Toast/Toast';



const Main = () => {
    const [colors , setColors ] = useState([]);
    const [pallete,setPallete] = useState([]);
    const [show,setShow] = useState(false);
    const [message,setMessage] = useState('');
    const [random,setRandom] = useState('');

    const text = (data) => {
        if(data){
            if(lightOrDark(hexToRgb(data))=== 'light'){
               return 'black';
            }else{
                return 'white';
            }}
    }
    useEffect(()=>{
        let colorsArray = [];
        if(colors.length === 0){
            for(let i=0;i<5;i++){
                let clr= randomColor();
                
                console.log("color :: "+clr);
                let textcolor = text(clr);

                colorsArray.push({"name":"Container"+(i+1),"color":clr,"text":textcolor,"status":false})
            }
            setColors(colorsArray);
        }
    },[])
    function hexToRgb(hex) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})` : null;
      }

      function lightOrDark(color) {
        if(color !== null){
        let r, g, b, hsp;
       
        if (color.match(/^rgb/)) {
    
           
            color = color.match(/^rgb?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
            
            r = color[1];
            g = color[2];
            b = color[3];
        } 
        else {
            
          
            color = +("0x" + color.slice(1).replace( 
            color.length < 5 && /./g, '$&$&'));
    
            r = color >> 16;
            g = color >> 8 & 255;
            b = color & 255;
        }
      
        hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
        );
    
        if (hsp>127.5) {
    
            return 'light';
        } 
        else {
    
            return 'dark';
        }}
    }
    const randomColor = () => {
        let x = "#"+Math.floor(Math.random()*16777215).toString(16);
        while(x.length !== 7){
            x = "#"+Math.floor(Math.random()*16777215).toString(16);
        }
        return x;
    }
    const toggle = (name) => {
        let colrsArray = colors.map(color => {
            if(color.name === name){
                color.status = !color.status;
            }

            return color;
        })
        setColors(colrsArray);
    }
    const randomize = () => {
        let colorsArray = colors.map(color => {
            if(!color.status){
            color.color = randomColor();
            color.text = text(color.color);}
            return color;
        });
        setColors(colorsArray);
    }

    const savePallete = () => {

        let save = colors.map((color => {return {"background-color":color.color,"text":color.text}}));

        setPallete([...pallete,save]);
        console.log(pallete);
        updateToast('saved');
    }
    const updateToast =(message) => {
        setMessage(message);
        setRandom(Math.random());
    }
    return (<div className="main-container">
        <Toast message={message} random={random}/>
        <div className="grid-color">
        {colors.map((color,index) => {
            return (
                <Color key={index} data={color} toggle={toggle}/>
            )
        })}</div>
        <div className="controls">
            <div className="randomize"  onClick={()=> randomize()}>change pallete</div>
        </div>
        <div className="save" onClick={()=>savePallete()}>
            <FaSave/>
        </div>
        { pallete.length!==0 ?
        <div className="show" onClick={()=>setShow(!show)}>
          <FaPalette/>
        </div>:null}
        <div className="overlay" style={{"display":show? "block":"none"}}>
            <Show toggle={() => setShow(!show)} save={pallete} toast={updateToast}/>
        </div>
        </div>
    )
};

export default Main;