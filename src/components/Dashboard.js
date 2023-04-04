//building the UI of the app

import React, { useState } from "react";

export default function Dashboard() {
  const [productDescription, setProductDescription] = useState("");

  const [productName, setProductName] = useState("");
  const [keyWords, setKeyWords] = useState("");
  const [type, setType] = useState("");
  const [numWords, setNumWords] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);



  // HOW TO INTEGRATE THE NextJS API ROUTE
  
    // create the handleCopy function to copy the jobDescription state to the clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(productDescription);
    setIsCopied(true);
  };




  // creating handleSubmit function, to prevent the page from reloading when the form is submitted
  // then updating the isGenerating state into true
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    //using again the fetch API to send a POST request to NextJS API route
    const res = await fetch("/api/returnProductDescription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName,
        keyWords,
        type,
        numWords,
      }),
    });

    // setting the isGenerating state back to false, then converting the response to JSON format and set it to the jobDescription
    setIsGenerating(false);
    const data = await res.json();
    setProductDescription(data.productDescription.trim());
  };
  // HOW TO INTEGRATE THE NextJS API ROUTE end



  // creating the form
  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-y-12 md:grid-cols-2 md:gap-x-12 ">
        <div className="">

        
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex flex-col">
              <label className="sr-only" htmlFor="productName">
                Product Name
              </label>
              <input
                type="text"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="productName"
                placeholder="Product Name"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="keywords" className="sr-only">
                Keywords for AI (Optional)
              </label>
              <textarea
                rows={7}
                value={keyWords}
                onChange={(e) => setKeyWords(e.target.value)}
                name="keyWords"
                id="keyWords"
                placeholder="Keywords for AI (Optional)"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
              />
            </div>

            <div className="flex flex-col">
              <label className="sr-only" htmlFor="type">
                Type
              </label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="type"
                id="type"
              >
                <option value="default">Select Product Type (Optional)</option>
                <option value="casual">Furniture</option>
                <option value="friendly">Cosmetics</option>
                <option value="professional">Toys</option>
                <option value="formal">Clothes</option>
              </select>
            </div>


            <div className="flex flex-col">
              <label htmlFor="words" className="sr-only">
                Words (Optional)
              </label>
              <input
                value={numWords}
                onChange={(e) => setNumWords(e.target.value)}
                type="number"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                placeholder="Number Of Words - Default 200 (Optional)"
                name="words"
                id="words"
              />
            </div>

            <button
              className={`bg-blue-600 w-full hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded
                ${
                  isGenerating || productName === ""
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
              type="submit"
              disabled={isGenerating || productName === ""}
            >
              {isGenerating ? "Generating..." : "Generate Product Description"}
            </button>
          </form>
        </div>

        
        <div className="">
          <div className="flex flex-col">
            <label htmlFor="output" className="sr-only">
              Output
            </label>
            <textarea
              rows={
                productDescription === ""
                  ? 7
                  : productDescription.split("\n").length + 12
              }
              name="output"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              disabled={productDescription === ""}
              id="output"
              placeholder="AI Generated Product Description"
              className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
            />
            <button
              onClick={handleCopy}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={productDescription === ""}
            >
              {isCopied ? "Copied" : "Copy to Clipboard"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}