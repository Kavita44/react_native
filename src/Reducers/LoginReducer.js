
 const INITIAL_STATE = {

 };
 
 const Loginreducer = (state = INITIAL_STATE, action) => {
        switch (action.type) {
       
 
        case 'LOGIN_REQUEST':
            return {
                ...state,
                loginwaladata: action.logindata
            }
            
            case 'DASHBOARD_DATA':
            return {
                ...state,
                isLoading : false,
                error : '',
                dashboard_data : action.payload
            }

            case 'VIEW_PROFILE':
            return {
                ...state,
                ViewProfile: action.profile
            }

            case 'FINGERPRINT_EXISTS':
            return {
                ...state,
                sensorExists: action.sensor
            }

            case 'UPLOAD_DONE':
            return {
                ...state,
                uploadSuccess: action.uploaddone
            }

            case 'UPLOAD_NOT_SUCCESSFUL':
            return {
                ...state,
                uploadNotSuccess: action.uploadnotdone
            }
                
            
            case 'PUSH_SUCCESS':
            return {
                ...state,
                pushEnabled: action.pushsuccess
            }
    
        default:
        return state;
    }
 };
 export default Loginreducer;