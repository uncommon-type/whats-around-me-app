import fetch from "node-fetch";

const fetchFromWiki = async (lat, lng) => {
  let url = `https://en.m.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=coordinates|pageimages|description&colimit=max&generator=geosearch&ggsradius=10000&ggsnamespace=0&ggslimit=50&ggscoord=${lat}|${lng}&piprop=thumbnail&pithumbsize=500&pilimit=50&codistancefrompoint=${lat}|${lng}`;
  const res = await fetch(url);
  return res.json();
};

exports.handler = async ({ queryStringParameters }) => {
  let { lat, lng } = queryStringParameters;

  try {
    let data = await fetchFromWiki(lat, lng);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.log(error);
  }
};
