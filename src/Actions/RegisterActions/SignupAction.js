import { Actions } from 'react-native-router-flux'
import { AsyncStorage,Alert } from 'react-native'



export const SignupAction = (data) => {
    return dispatch => {
            fetch('http://52.34.207.5:3034/api/signup', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(data)
              })
              .then((response) => response.json())
              .then((responseJson) => {
                if(responseJson.code===200)
                {
                console.log('Response from signup',responseJson)
                dispatch({ type: 'SIGNUP_REQUEST', Signupdata: responseJson });               
            }
            else
            {
              console.log('failure response signin',responseJson.message)
              Alert.alert(responseJson.message)
            }
              })
              .catch(function(error) {
                  console.error(error);
              });
            }
        }