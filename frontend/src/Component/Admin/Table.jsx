import React, {useEffect, useState} from "react";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import axios from "axios";

function Table() {
  //Fetch data to table
  const [furnitureData, setFurnitureData] = useState([]);

  useEffect(() => {
      // Fetch furniture data when the component mounts
      fetchData();
  }, []);

  const fetchData = async () => {
      try {
        // Make a GET request to retrieve furniture data
        const response = await axios.get('/getFurni');
  
        if (response.data.success) {
          // Update state with the retrieved furniture data
          setFurnitureData(response.data.furnitures);
          console.log(response.data.furnitures)
        } else {
          console.error('Failed to retrieve furniture data:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching furniture data:', error);
      }
  }

  //TABLE
  const defaultSortInfo = { name: "name", dir: -1 };
  const gridStyle = { minHeight: 600, maxWidth: 1300 };
  const columns = [
    { name: "product_id", header: "Product ID", defaultFlex: 1, maxWidth: 100},
    { name: "furni_material", header: "Furni Material", defaultFlex: 1, maxWidth: 100 },
    { name: "furni_title", header: "Furni Title", defaultFlex: 1},
    { name: "furni_type", header: "Furni Type", defaultFlex: 1 },
    { name: "room_category", header: "Room  Category", defaultFlex: 1},
    {
      name: "furni_width, furni_depth, furni_height",
      header: "Furniture Dimension",
      minWidth: 160,
      render: ({ data }) => (
        <div>
          <p>({data.furni_width} x &nbsp;
          {data.furni_depth} x &nbsp;
          {data.furni_height}) mm</p>
        </div>
      ),
      headerStyle: { justifyContent: 'center' }
    },
    { name: "space_category", header: "Space Category", defaultFlex: 1, maxWidth: 100 },
    { name: "vectary_link", header: "Vectary Link", defaultFlex: 1},
    {
      name: "furni_picture",
      header: "Furniture Picture",  
      maxWidth: 400,
      defaultFlex: 1,
      render: ({ value }) => (
        <div className="image-container" style={{ height: 100 }}>
          <img
            src={`${value}`} // Assuming value is the base64 data
            alt="Furniture"
            className="image"
          />
        </div>
      ),
    },
  ];
  const dataSource = furnitureData

  
  return (
    <>
    <style>
        {`
          .image-container {
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }

          .image {
            max-width: 100%;
            max-height: 100%;
          }
        `}
      </style>
    <div className="w-full mb-[40px] flex justify-center">
      <ReactDataGrid
        idProperty="id"
        defaultSortInfo={defaultSortInfo}
        style={gridStyle}
        rowHeight={130}
        pagination
        showCellBorders={true}
        columns={columns}
        dataSource={dataSource}
      />
    </div>
{/*     <div className="flex items-center justify-center">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
          <a href="#inti">
            <iframe
                src="https://www.vectary.com/viewer/v1/?model=d6c1f27d-6a27-4c7e-bd7d-bd19d7faa56c&turntable=-2"
                frameBorder="0"
                width="100%"
                height="480">
            </iframe>
          </a>
          <div className="p-5">
              <a href="#ini">
                  <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">Noteworthy technology acquisitions 2021</h5>
              </a>
              <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
              <a href="#ini" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Read more
                  <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </a>
          </div>
      </div>
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
          <a href="#ini">
            <iframe
                src="https://www.vectary.com/viewer/v1/?model=d6c1f27d-6a27-4c7e-bd7d-bd19d7faa56c&turntable=-2"
                frameBorder="0"
                width="100%"
                height="480">
            </iframe>
          </a>
          <div className="p-5">
              <a href="#ini">
                  <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">Noteworthy technology acquisitions 2021</h5>
              </a>
              <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
              <a href="#ini" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Read more
                  <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </a>
          </div>
      </div>
    </div> */}
    </>
  );
}

export default Table;
