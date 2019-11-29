import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Constants from 'expo-constants'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Reducers from './reducers'
import Middleware from './middleware'
import { mainGreen, brightGreen, white } from './utils/colors'
import { setLocalNotification } from './utils/helpers'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import Quiz from './components/Quiz'
import AddQuestion from './components/AddQuestion'
import IndividualDeck from './components/IndividualDeck'

const TabNavigator = createBottomTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add-circle-outline' size={30} color={tintColor} />
    }
  },
},{
  tabBarOptions: {
    activeTintColor: brightGreen,
  }
})

const MainNavigation = createStackNavigator({
  Home: {
    screen: TabNavigator,
    navigationOptions: {
      header: null,
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: mainGreen
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  },
  IndividualDeck: {
    screen: IndividualDeck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: mainGreen
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  },
  AddQuestion: {
    screen: AddQuestion,
    navigationOptions: {
      title: 'Add Question',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: mainGreen
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  },
})

const NavigationContainer = createAppContainer(MainNavigation)

function CustomStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const store = createStore(Reducers, Middleware)

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  render () {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <CustomStatusBar backgroundColor={mainGreen} barStyle='light-content' />
          <NavigationContainer />
        </View>
      </Provider>
    )
  }
}
