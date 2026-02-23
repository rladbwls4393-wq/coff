exports.handler = async (event) => {
  const word = event.queryStringParameters?.word;
  if (!word) {
    return { statusCode: 400, body: JSON.stringify({ error: 'word 파라미터 필요' }) };
  }

  const KEY = 'D83BE0F5DD7BCA86FB5F74F67DDA4C3';
  const url = `https://stdict.korean.go.kr/api/search.do?key=${KEY}&q=${encodeURIComponent(word)}&req_type=json&num=5`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data)
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};