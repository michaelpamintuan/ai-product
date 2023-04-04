// Fetching data from chatGPT


// creating async function to take this as arguments
const generateDescription = async ({
    productName,
    keyWords,
    type,
    numWords,
  }) => { 
    // using fetch API inside a try/catch block to create a POST request to the open AI ChatGPT
    try {
      const response = await fetch(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // the OpenAI API uses the API key we generated in platform.openai.com
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },

          // adding a default value for numWords and tonenin the prompt
          body: JSON.stringify({
            prompt: `Write a product description for a  ${productName} that is around ${
              numWords || 200
            } words in a ${type || "neutral"} type. ${
              keyWords ? `Incorporate the following keywords: ${keyWords}.` : ""
            }. The product name should be described in a way that is SEO friendly, highlighting its unique features and benefits.`,
            max_tokens: 100,
            temperature: 0.5,
          }),
        }
      );
      // parse the response stream from OpenAI API to JSON format and return it from the function
      const data = await response.json();
      return data.choices[0].text;

    } catch (err) {
      console.error(err);
    }
  };
  

  // This generateDescription function is used inside the NextJS API route handler, and the output from OpenAI API is returned from the API route
  export default async function handler(req, res) {
    const { productName, keyWords, type, numWords } = req.body;
  
    const productDescription = await generateDescription({
      productName,
      keyWords,
      type,
      numWords,
    });
  
    res.status(200).json({
      productDescription,
    });
  }