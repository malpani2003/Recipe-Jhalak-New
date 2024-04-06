import React from 'react'
import { useState } from 'react';

function Form() {
  const [filename,setfilename]=useState(null);

  const SubmitFormHandler=(e)=>{
    // let name=e.target.files[0];
    console.log(e.target.files[0]);
    setfilename(e.target.files[0].name+Date.now());
  }
  return (
    <div>
        <h2>Upload Image Here {filename}</h2>
        <form>
            <input type='file' id='image' name='image' accept="image/png, image/jpeg" onChange={SubmitFormHandler}></input>
            <input type='submit'></input>
        </form>
    </div>
  )
}

export default Form