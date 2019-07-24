/**
 * @format
 */
import {AppRegistry} from 'react-native';
import RNRoute from './router/index';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => RNRoute);
