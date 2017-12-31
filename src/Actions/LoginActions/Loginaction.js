import { Actions } from 'react-native-router-flux'
import { AsyncStorage, Alert } from 'react-native'


export const Loginaction = (data) => {
  console.log('data for login',data)
  return dispatch => {
    fetch('http://52.34.207.5:3034/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.code === 200) {
          AsyncStorage.setItem('loginResponse', JSON.stringify(responseJson));
          console.log('Response from Login', responseJson)
          dispatch({ type: 'LOGIN_REQUEST', logindata: responseJson });
          Actions.Tab();
          // Alert.alet('Logged In')                    
        }
        else {
          console.log('failure response login', responseJson.message)
          Alert.alert(responseJson.message)
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}


export const forgotpassword = (data) => {
  return dispatch => {
    fetch('http://52.34.207.5:3034/api/forgotPassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then((response) => {
        console.log('Response from Forgotpassword', response)

        if (response.status === 200) {
          Actions.forgotpasswordpage({ username: data })
          console.log('Response from Forgotpassword', response)
          // Alert.alet('Logged In')                    
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}

export const fingerprintExists = (data) => {
  return dispatch => {
    dispatch({ type: 'FINGERPRINT_EXISTS', sensor: data })
  }
}

export const ViewProfile = (data) => {
  return dispatch => {
    fetch('http://52.34.207.5:3034/api/editprofile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.code === 200) {
             console.log('Response from view profile api', responseJson)
             dispatch({ type: 'VIEW_PROFILE', profile: responseJson })
             
        }
        else {
          console.log('failure response login', responseJson.message)
          // dispatch({ type: 'UPLOAD_NOT_SUCCESSFUL', uploadnotdone: responseJson.message })
          
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}

export const updateProfile = (data) => {
  console.log('data for profile upload',data)
  return dispatch => {
    fetch('http://52.34.207.5:3034/api/update-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.code === 200) {
             console.log('Response from update profile api', responseJson)
             dispatch({ type: 'UPLOAD_DONE', uploaddone: responseJson })
             
        }
        else {
          console.log('failure response login', responseJson.message)
          dispatch({ type: 'UPLOAD_NOT_SUCCESSFUL', uploadnotdone: responseJson.message })
          
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}

export const Pushnotification = (data) => {
  return dispatch => {
    fetch('http://52.34.207.5:3034/api/change-push-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.code === 200) {
             console.log('Response from pushnotifiication', responseJson)
             dispatch({ type: 'PUSH_SUCCESS', pushsuccess: responseJson })
             
        }
        else {
          console.log('failure response login', responseJson.message)
          // dispatch({ type: 'UPLOAD_NOT_SUCCESSFUL', uploadnotdone: responseJson.message })
          
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}

export const loggingOut = (data) => {
  return dispatch => {
    fetch('http://52.34.207.5:3034/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.code === 200) {
          console.log('Response from Logout api', responseJson)
        }
        else {
          console.log('failure response login', responseJson.message)
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}

