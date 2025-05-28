"use client";
import classes from "./image-picker.module.css";
import React, { useRef, useState } from 'react';
import Image from "next/image";

function ImagePicker({label,name}) {
  const imageRef =  useRef(),
  [pickedImage,setPickedImage] = useState(null); 

  function handleImagePick(){
    imageRef.current.click();
  }

  function handleChange(event){
    const file = event.target.files[0];
    if(!file){
        setPickedImage(null);
        return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
        setPickedImage(fileReader.result)
    }
    fileReader.readAsDataURL(file);

    event.preventDefault();

  }

  return (
    <div className={classes.picker}>
        <label htmlFor="image">{label}</label>
        <div className={classes.controls}>
            <div className={classes.preview}>
                {!pickedImage ? 
                    <p>No Image Picked Yet</p>
                :
                    <Image 
                        src={pickedImage} 
                        alt="Picked Image"
                        fill
                    />}
            </div>
            <input
                className={classes.input}
                type="file"
                id={name}
                accept="image/png, image/jpeg"
                name={name}
                ref={imageRef}
                multiple
                onChange={handleChange}
                required
            />
            <button 
                className={classes.button} 
                onClick={handleImagePick}
                type="button">
                    Pick the Image
            </button>
        </div>
    </div>
  )
}

export default ImagePicker