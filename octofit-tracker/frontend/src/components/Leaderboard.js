import ResourceTablePage from './ResourceTablePage';

const API_ENDPOINT_CHECK = 'https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/leaderboard/';

function Leaderboard() {
  console.log('Leaderboard endpoint check:', API_ENDPOINT_CHECK);
  return <ResourceTablePage title="Leaderboard" resourcePath="leaderboard" />;
}

export default Leaderboard;
