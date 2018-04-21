import { StackNavigator } from 'react-navigation';
import Clusters from './clusters';
import Cluster from './cluster';
import Quiz from './quiz';
import Add from './add'
import Post from './post'

const ClusterStacker = StackNavigator(
  {
    Clusters: { screen: Clusters },
    Cluster: { screen: Cluster },
    Quiz: { screen: Quiz },
    Add: { screen: Add },
    Post: { screen: Post }
  },
  {
    headerMode: 'none',
    initialRouteName: 'Clusters'
  }
);

export default ClusterStacker;
