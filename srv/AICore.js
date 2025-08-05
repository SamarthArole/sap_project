const axios = require('axios');
require('dotenv').config();

async function handleAIExtraction(inputText) {
  try {
    const response = await axios.post(
      'https://llmproxy.cfapps.ap21.hana.ondemand.com/extractAttributes',
      new URLSearchParams({ message: inputText }), // sends as x-www-form-urlencoded
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error('[AICore] ❌ Failed to extract input:', error.message);
    return {
      intent: null,
      email: null,
      groups: [],
      error: 'Failed to call AI Core proxy'
    };
  }
}

module.exports = { handleAIExtraction };

