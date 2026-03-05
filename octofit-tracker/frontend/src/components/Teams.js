import ResourceTablePage from './ResourceTablePage';

const API_ENDPOINT_CHECK = 'https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/teams/';

function Teams() {
  console.log('Teams endpoint check:', API_ENDPOINT_CHECK);
  return <ResourceTablePage title="Teams" resourcePath="teams" />;
}

export default Teams;
