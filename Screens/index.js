import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Settings from './Settings';
import MyNotes from './MyNotes';
import NewNote from './NewNote';

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={
        ({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === 'MyNotes') {
              iconName = 'clipboard-list';
              size = focused ? 25 : 20;
            } else if (route.name === 'Settings') {
              iconName = 'clipboard-check';
              size = focused ? 25 : 20;
            }
            return (
              <FontAwesome5
                name={iconName}
                size={size}
                color={color}
              />
            );
          }
        })
      }
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#0080ff',
        tabBarInactiveTintColor: '#777777',
        tabBarLabelStyle: { fontSize: 15, fontWeight: 'bold' },
      })}
    >
      <Tab.Screen 
        name={'MyNotes'}
        component={MyNotes} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name={'Settings'} 
        component={Settings} 
        options={{ headerShown: false }} 
      />
    </Tab.Navigator>
  );
}

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
    return (  
      <RootStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#008099'
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 25,
          fontWeight: 'bold'
        }
      }}
    >
      <RootStack.Screen
        name="SimpleNotes"
        component={HomeTabs}
      />
      <RootStack.Screen
        name="NewNote"
        component={NewNote}
      />
    </RootStack.Navigator>
    )
};

export default RootNavigator;