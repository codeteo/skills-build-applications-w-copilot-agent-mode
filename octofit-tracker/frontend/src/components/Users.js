import ResourceTablePage from './ResourceTablePage';

const API_ENDPOINT_CHECK = 'https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/users/';

function Users() {
  console.log('Users endpoint check:', API_ENDPOINT_CHECK);
  return <ResourceTablePage title="Users" resourcePath="users" />;
}

export default Users;
