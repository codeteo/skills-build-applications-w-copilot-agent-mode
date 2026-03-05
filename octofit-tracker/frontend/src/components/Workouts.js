import ResourceTablePage from './ResourceTablePage';

const API_ENDPOINT_CHECK = 'https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/workouts/';

function Workouts() {
  console.log('Workouts endpoint check:', API_ENDPOINT_CHECK);
  return <ResourceTablePage title="Workouts" resourcePath="workouts" />;
}

export default Workouts;
