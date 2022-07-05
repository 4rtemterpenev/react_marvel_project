import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {
  const {loading, request, error, clearError} = useHttp();

  const _apiBase ='https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=e0ed57186b9321bb13c89f9d423e30c7';
  const _baseOffset = 210;


  const getAllComics = async (offset = 0) =>{
    const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformComics);
  }

  const getComics = async (id) =>{
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  }


  const getAllCharacters = async (offset = _baseOffset) =>{
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  }

  const getCharacter = async (id) =>{
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  }


  const _transformCharacter = (char) => {
    return{
        id: char.id,
        name: (char.name.length > 20) ? `${char.name.slice(0,19)}...` : char.name,
        description: char.description ? `${char.description.substr(0,150)}` : 'No descr',
        thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
        homepage: char.urls[0].url,
        wiki: char.urls[1].url,
        comics: char.comics.items
    }
  }

  const _transformComics = (comics) => {
    return{
      id: comics.id,
      title: (comics.title.length > 40) ? `${comics.title.slice(0,39)}...` : comics.title,
      description: comics.description || 'There is no descr',
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      pageCount: comics.pageCount ? `${comics.pageCount} pages` : null,
      price: comics.prices.price ? `${comics.prices.price}$` : 'Not avalible'
    }
  }

  return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComics}
}

export default useMarvelService;