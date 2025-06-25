const axios = require('axios');

module.exports = async function (req, res) {
  const { tweetId, username } = req.query;

  const BEARER_TOKEN = decodeURIComponent('AAAAAAAAAAAAAAAAAAAAAI7W0EAAAAA%2BulGuBjdJsBkpp4icVi9HMXMGdM%3Dtqg4dbQGeHGJ');
  const query = conversation_id:${tweetId} from:${username};
  const url = https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(query)}&tweet.fields=text,author_id,conversation_id;

  try {
    const response = await axios.get(url, {
      headers: { Authorization: Bearer ${BEARER_TOKEN} }
    });

    const replies = response.data?.data || [];
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ username, replies }));
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: error.message || 'Twitter API error' }));
  }
};

