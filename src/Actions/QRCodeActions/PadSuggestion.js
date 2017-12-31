import { Actions } from 'react-native-router-flux'
import { AsyncStorage } from 'react-native'



export const QrcodeAction = (data) => {
    console.log("afsdhagsdhgadsdgasdgds",data)
    return dispatch => {
        fetch('http://52.34.207.5:3034/api/verifyTankQRcode', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:  data ? JSON.stringify(data) : null
            })
            .then((response) => {
              console.log("ravi kumar", response);
              if(response.status === 200) {
                return response.json()  
              } else {
                return true;
              }
              
            })
            .then((responseJson) => {
              console.log('responsaejjjjssssooonnn',responseJson)
              if(responseJson && responseJson.code===200)               
              {
                Actions.confirmationpage()                 
                console.log('responsaejjjjssssooonnn',responseJson)
                dispatch({ type: 'QRCODE_INITIAL', qrcodedata: responseJson });
           
          }
          else
          {
            console.log('failure response login',responseJson.message)
            Actions.validationunsuccessful()
            
          }
            })
            .catch(function(error) {
                console.error(error);
            });
          }

}

export const PadListings = () =>{
    return dispatch=>{
            fetch('http://52.34.207.5:3034/api/fetch-pads', {
              method: 'GET',
              headers: {'Content-Type': 'application/json'},
              })
              .then((response) => response.json())
              .then((responseJson) => {
                if(responseJson.code===200)               
                {
                console.log('Response from Padlisting',responseJson)
                dispatch({type:'PAD_DETAILS', pads: responseJson});
            }
            else
            {
              console.log('failure response Padlisting',responseJson.message)
            }
              })
              .catch(function(error) {
                  console.error(error);
              });
            }
        }


        export const saveTranscations = (data) => {
            return dispatch => {
                fetch('http://52.34.207.5:3034/api/savetransactionDetails', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                    })
                    .then((response) => response.json())
                    .then((responseJson) => {
                      if(responseJson.code===200)               
                      {
        
                        console.log('responsaejjjjssssooonnn from save transcation',responseJson)
                        // dispatch({ type: 'QRCODE_INITIAL', qrcodedata: responseJson });
                   
                  }
                  else
                  {
                    console.log('failure response login',responseJson.message)
                    Alert.alert(responseJson.message)
                  }
                    })
                    .catch(function(error) {
                        console.error(error);
                    });
                  }
        
        }

export const HideCamera = (data) =>{
  console.log("hide camera action")
    return dispatch => {
      dispatch({type: 'HIDE_CAMERA', hidden: data})
       }
           }

