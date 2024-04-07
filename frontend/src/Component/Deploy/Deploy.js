import React from "react";

export const Deploy = ({ prop }) => {
  return (
    <>
      <div className="grid h-[200PX] bg-red-600">
        <h1 className="place-self-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          ONLY TITLE: This is flask-react server
        </h1>
        {/* <div>
        {typeof prop.members === "undefined" ? (
          <p className="text-red-600">Loading ...</p>) : (
          prop.members.map((member, i) => <p key={i}>{member}</p>)
        )}
      </div> */}
      </div>
      <div className="grid h-[200px]">
        <form className="max-w-sm mx-auto place-self-center">
          <label
            id="countries"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Select a furniture
          </label>
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option defaultValue value={""}>Choose a furniture</option>
                {prop.furnitures && prop.furnitures.slice(0, 20).map((furniture, i) => (
                  <option key={i}>{furniture}</option>
                ))}
                {prop.furnitures && prop.furnitures.length > 20 && <option>And more...</option>}
          </select>
        </form>
      </div>
    </>
  );
};
