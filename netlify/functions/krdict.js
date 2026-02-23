const https = require('https');

exports.handler = async (event) => {
  const word = event.queryStringParameters?.word;
  if (!word) {
    return { statusCode: 400, body: JSON.stringify({ error: 'word 파라미터 필요' }) };
  }

  const KEY = 'D83BE0F5DD7BCA86FB5F74F67DDA4C3';
  const path = `/api/search.do?key=${KEY}&q=${encodeURIComponent(word)}&req_type=json&num=5`;

  return new Promise((resolve) => {
    https.get(`https://stdict.korean.go.kr${path}`, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          JSON.parse(body);
          resolve({
            statusCode: 200,
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
            body: body
          });
        } catch(e) {
          resolve({ statusCode: 500, body: JSON.stringify({ error: 'JSON parse error', raw: body.slice(0,200) }) });
        }
      });
    }).on('error', (e) => {
      resolve({ statusCode: 500, body: JSON.stringify({ error: e.message }) });
    });
  });
};
