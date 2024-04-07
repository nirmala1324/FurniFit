import React, { useState } from "react";
import axios from "axios";

export function Forms() {
  // State to manage form data
  const [furniData, setFurniData] = useState({
    product_id: "",
    furni_title: "",
    space_category: "",
    room_category: "",
    furni_type: "",
    furni_material: "",
    furni_style: "",
    vectary_link: "",
    furni_width: "",
    furni_depth: "",
    furni_height: "",
    furni_picture: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    // Update the form data state with the new input value
    if (type === "file") {
      // Handle file input separately
      convertToBase64(e);
    } else {
      setFurniData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  /* Handles the form SUBMISSION. */
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Base64 Image:", image);

    try {
      // POST the data
      const response = await axios.post("/furniAdd", furniData); // If there is await, it need to be inside async

      if (response.data.success) {
        alert(response.data.message);
      } else {
        alert("Send data failed");
      }
    } catch (error) {
      console.log("Error submitting the form data: ", error);
      alert("An error occurred");
    }
  };

  const [image, setImage] = useState("");

  /*   // Function to convert a selected image to base64 string
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
  }; */

  const convertToBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
      // Update furniData with base64 image string
      setFurniData((prevData) => ({
        ...prevData,
        furni_picture: reader.result,
      }));
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  return (
    <>
      <div className="grid h-[600px]">
        <form
          className="flex-col flex gap-8 p-8 bg-red-400 w-[800px] rounded-lg place-self-center"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-bold place-self-center text-white">
            New Furniture Data Form
          </h1>
          <div>
            <label
              htmlFor="product_id"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product ID
            </label>
            <input
              type="text"
              name="product_id"
              id="product_id"
              value={furniData.product_id}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
              placeholder="Product x"
              required
            />
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="furni_title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Furniture Title
              </label>
              <input
                type="text"
                name="furni_title"
                id="furni_title"
                value={furniData.furni_title}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                placeholder="Input the furniture title here"
                required
              />
            </div>
            <div>
              <label
                htmlFor="space_cat"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Space Category
              </label>
              <select
                name="space_category"
                value={furniData.space_category}
                id="space_cat"
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              >
                <option defaultValue value={""} hidden>
                  Select a space category ...
                </option>
                <option value={"Indoor"}>Indoor</option>
                <option value={"Outdoor"}>Outdoor</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="room_cat"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Sub Space Category
              </label>
              <select
                name="room_category"
                value={furniData.room_category}
                id="room_cat"
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              >
                <option defaultValue value={""} hidden>
                  Select a sub space category ...
                </option>
                <option value={"Living Room"}>Living Room</option>
                <option value={"Bedroom"}>Bedroom</option>
                <option value={"Terrace/ Garden/ Balcony"}>Terrace/ Garden/ Balcony</option>
                <option value={"Kitchen"}>Kitchen</option>
                <option value={"Bathroom"}>Bathroom</option>
                <option value={"Dining Room"}>Dining Room</option>
                <option value={"Dressing Room"}>Dressing Room</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="furni_type"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Furniture Type
              </label>
              <select
                name="furni_type"
                value={furniData.furni_type}
                id="furni_type"
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              >
                <option defaultValue value={""} hidden>
                  Select a furniture type ...
                </option>
                <option value={"Coffee Table"}>Coffee Table</option>
                <option value={"Stool"}>Stool</option>
                <option value={"Dressing Table"}>Dressing Table</option>
                <option value={"Armchair"}>Armchair</option>
                <option value={"Chest of Drawer"}>Chest of Drawer</option>
                <option value={"Bed"}>Bed</option>
                <option value={"Sofa"}>Sofa</option>
                <option value={"TV Stand"}>TV Stand</option>
                <option value={"Bedside Table"}>Bedside Table</option>
                <option value={"Cabinets"}>Cabinets</option>
                <option value={"Wardrobe"}>Wardrobe</option>
                <option value={"Dining Table"}>Dining Table</option>
                <option value={"Mirror"}>Mirror</option>
                <option value={"Dining Chair"}>Dining Chair</option>
                <option value={"Bean Bags"}>Bean Bags</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="furni_material"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Furniture Material
              </label>
              <select
                name="furni_material"
                value={furniData.furni_material}
                id="furni_material"
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              >
                <option defaultValue value={""} hidden>
                  Select the furniture material ...
                </option>
                <option value={"Steel"}>Steel</option>
                <option value={"Oak"}>Oak</option>
                <option value={"Wood"}>Wood</option>
                <option value={"Synthetic Leather"}>Synthetic Leather</option>
                <option value={"Leather"}>Leather</option>
                <option value={"Glass"}>Glass</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="furni_style"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Furniture Style
              </label>
              <select
                name="furni_style"
                value={furniData.furni_style}
                id="furni_style"
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              >
                <option defaultValue value={""} hidden>
                  Select the furniture style ...
                </option>
                <option value={"Modern"}>Modern</option>
                <option value={"Classy"}>Classy</option>
                <option value={"Minimalism"}>Minimalism</option>
                <option value={"Traditional"}>Traditional</option>
                <option value={"Industrial"}>Industrial</option>
                <option value={"Scandinavian"}>Scandinavian</option>
                <option value={"Rustic"}>Rustic</option>
                <option value={"Shabby Chic"}>Shabby Chic</option>
                <option value={"Mid-Century Modern"}>Mid-Century Modern</option>
                <option value={"Japanese Zen"}>Japanese Zen</option>
                <option value={"Tropical/ Natural"}>Tropical/ Natural</option>
                <option value={"Victorian"}>Victorian</option>
                <option value={"Pop-Art"}>Pop-Art</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="vectary_link"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Vectary Link
              </label>
              <input
                type="link"
                name="vectary_link"
                id="vectary_link"
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                placeholder="Input vectary link here"
                required
              />
            </div>
            <div className="flex gap-3 mr-[2vw]">
              <div>
                <label
                  htmlFor="furni_width"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Width
                </label>
                <input
                  type="number"
                  name="furni_width"
                  id="furni_width"
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                  required
                />
              </div> 
              <div>
                <label
                  htmlFor="furni_depth"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Depth
                </label>
                <input
                  type="number"
                  name="furni_depth"
                  id="furni_depth"
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                  required
                />
              </div> 
              <div>
                <label
                  htmlFor="furni_height"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Height
                </label>
                <input
                  type="number"
                  name="furni_height"
                  id="furni_height"
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                  required
                />
              </div> 
              <div className="text-white flex ">
                <div className="mt-[1.5vw]">mm</div>
              </div>
            </div>
            <div>
              <label
                htmlFor="furni_picture"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Furniture Picture
              </label>
              <span className="sr-only">Choose profile photo</span>
              <input
                name="furni_picture"
                id="furni_picture"
                accept="image/*"
                onChange={handleInputChange}
                type="file"
                className="block w-full text-sm text-white
                          file:me-4 file:py-2 file:px-4
                          file:rounded-lg file:border-0
                          file:text-sm file:font-semibold
                        file:bg-red-600 file:text-white
                        hover:file:bg-red-700
                          file:disabled:opacity-50 file:disabled:pointer-events-none
                        dark:file:bg-red-500
                        dark:hover:file:bg-red-400
                        "
              />
              {image === "" || image == null ? (
                ""
              ) : (
                <img
                  className="w-[20vw] mt-[1.2vw] w-full"
                  alt=""
                  width={100}
                  src={image}
                />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Send To Database
          </button>
        </form>
      </div>
    </>
  );
}
