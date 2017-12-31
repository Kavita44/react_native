
 const INITIAL_STATE = {
    
     };
     
     const SignupReducer = (state = INITIAL_STATE, action) => {
            switch (action.type) {
           
     
            case 'SIGNUP_REQUEST':
            // alert(action.Signupdata)
                return {
                    ...state,
                    Signup: action.Signupdata
                }
                
               
        
            default:
            return state;
        }
     };
     export default SignupReducer;