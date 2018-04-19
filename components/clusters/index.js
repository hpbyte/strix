import { StackNavigator } from 'react-navigation';
import Clusters from './clusters';
import Cluster from './cluster';
import Quiz from './quiz';

const ClusterStacker = StackNavigator(
  {
    Clusters: { screen: Clusters },
    Cluster: { screen: Cluster },
    Quiz: { screen: Quiz }
  },
  {
    headerMode: 'none',
    initialRouteName: 'Clusters'
  }
);

export default ClusterStacker;
