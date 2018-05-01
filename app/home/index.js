import { StackNavigator } from 'react-navigation';
import Home from './home';
import Cluster from './cluster';
import Add from './add'
import Post from './post'
import Answer from './answer'

const ClusterStacker = StackNavigator(
  {
    Home: { screen: Home },
    Cluster: { screen: Cluster },
    Add: { screen: Add },
    Post: { screen: Post },
    Answer: { screen: Answer }
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home'
  }
);

export default ClusterStacker;
