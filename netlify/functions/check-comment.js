const axios = require('axios');

export default async function handler(req, res) {
  const { tweetId, username } = req.query;

  const BEARER_TOKEN = decodeURIComponent('AAAAAAAAAAAAAAAAAAAAAI7W0wEAAAAA%2BulGuBjdJsBkpp4icVi9HMXMGdM%3Dtqg4dbQGeHGJ');
  const query = `conversation_id:${tweetId} from:${username}`;
  const url = `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(query)}&tweet.fields=text,author_id,conversation_id`;

  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` }
    });

    const replies = response.data?.data || [];
    res.status(200).json({ username, replies });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Twitter API error' });
  }
}
Move function to netlify/functions for Netlify deployment
