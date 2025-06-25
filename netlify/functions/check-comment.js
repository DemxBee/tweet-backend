const axios = require("axios");

exports.handler = async function (event, context) {
  const params = event.queryStringParameters;
  const tweetId = params.tweetId;
  const username = params.username;

  const BEARER_TOKEN = decodeURIComponent('AAAAAAAAAAAAAAAAAAAAAI7W0EAAAAA%2BulGuBjdJsBkpp4icVi9HMXMGdM%3Dtqg4dbQGeHGJ');
  const query = conversation_id:${tweetId} from:${username};
  const url = https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(query)}&tweet.fields=text,author_id,conversation_id;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: Bearer ${BEARER_TOKEN},
      },
    });

    const replies = response.data?.data || [];

    return {
      statusCode: 200,
      body: JSON.stringify({ username, replies }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || "Twitter API error" }),
    };
  }
};
