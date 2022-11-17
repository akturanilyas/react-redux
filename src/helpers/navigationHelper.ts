import { useLocation } from 'react-router-dom';

export default function changeUrl(url: string) {
  console.log('askmda');
  const location = useLocation();

  // eslint-disable-next-line no-debugger
  debugger;
  console.log(location, url);
}
