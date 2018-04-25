import { StackNavigator } from 'react-navigation';
import Clusters from './clusters';
import Cluster from './cluster';
import Add from './add'
import Post from './post'
import Answer from './answer'

const ClusterStacker = StackNavigator(
  {
    Clusters: { screen: Clusters },
    Cluster: { screen: Cluster },
    Add: { screen: Add },
    Post: { screen: Post },
    Answer: { screen: Answer }
  },
  {
    headerMode: 'none',
    initialRouteName: 'Clusters'
  }
);

export default ClusterStacker;
