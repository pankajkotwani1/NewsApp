const API_KEY = '1f0f803ce7msh3fb48fc7b11379dp1f270djsnf48962c270e3'; // Replace with your actual API key
const HOST_SERVER = 'news-api14.p.rapidapi.com';

export interface NewsArticle {
  title: string;
  url: string;
}

export const fetchTopHeadlines = async (): Promise<any> => {
  var myHeaders = new Headers();
  myHeaders.append('X-RapidAPI-Key', API_KEY);
  myHeaders.append('X-RapidAPI-Host', HOST_SERVER);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(
    'https://news-api14.p.rapidapi.com/top-headlines?country=us&language=en&pageSize=1000&category=all%20categories',
    requestOptions,
  )
    .then(response => response.text())
    .then(result => result)
    .catch(error => console.log('error', error));
};
