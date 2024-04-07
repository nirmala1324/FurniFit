import React, { useState } from "react";

const UpImage = () => {
  // State 'image' as variable to hold the base64 encoded image string
  const [image, setImage] = useState("");

  // Function to convert a selected image to base64 string
  const convertToBase64 = (e) => {                  // e: event listener
    var reader = new FileReader();                  // Create a new FileReader* instance
    reader.readAsDataURL(e.target.files[0]);        // THE CONVERTER: Read the selected file as Data URL (base64 encoded string)
    // Call back when the reading operation 
    // is successful
    reader.onload = () => {
      console.log(reader.result);                   // base64 encoded string
      setImage(reader.result);                      // Set the base64 encoded string in the image state
    };
    // Callback for handling errors during 
    // reading the file
    reader.onerror = (error) => {           
      console.log("Error: ", error);
    };
  };

  return (
    <>
      {/* Component Rendering */}
      <div className="mb-[76px] items-center aspect-[1920/305] bg-red-400 justify-center flex">
        <div className="font-bold text-white">
          Let's Upload Image &nbsp;
          
          {/* Input element for selecting image file with an event listener */}
          <input accept="image/*" type="file" onChange={convertToBase64} />
          
          {/* Conditionally render image if it's exists */}
          {image === "" || image == null ? "": <img className="w-[20vw]" alt="" width={100} src={image}/>}
        </div>
      </div>
    </>
  );
};

export default UpImage;


// UNKNOWN THINGS
// FileReader(): let web app asynchronously read the contents of a file (or raw data buffers) stored in user's computer.
// Asynchronously: programming - asynchronous operations allow a program to continue execute other tasks while waiting for another operation to complete (doesn't block the entire program)