import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {STACK_SCREENS} from './constants';
import TopNavigation from './TopNavigation';

const STACK = createNativeStackNavigator<{TopNavigation: undefined}>();

const AddTransaction = () => {
  return (
    <STACK.Navigator
      initialRouteName={STACK_SCREENS.TOP_NAVIGATION}
      screenOptions={{
        headerShown: false,
      }}>
      <STACK.Screen
        name={STACK_SCREENS.TOP_NAVIGATION}
        component={TopNavigation}
      />
    </STACK.Navigator>
  );
};

export default AddTransaction;
