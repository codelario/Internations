let apiVariables = {
  environmentName: 'Dev Environment',
  ionicEnvName: 'dev',
  apiEndpoint: 'http://127.0.0.1:3000'
};

let endpoints = {
  users: apiVariables.apiEndpoint + '/users/',
  groups: apiVariables.apiEndpoint + '/groups/',
}

export const config = {
  apiEndpoint: endpoints
};