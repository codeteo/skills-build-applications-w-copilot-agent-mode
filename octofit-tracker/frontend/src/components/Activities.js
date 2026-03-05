import ResourceTablePage from './ResourceTablePage';

const API_ENDPOINT_CHECK = 'https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/activities/';

function Activities() {
  console.log('Activities endpoint check:', API_ENDPOINT_CHECK);
  return <ResourceTablePage title="Activities" resourcePath="activities" />;
}

export default Activities;
