qrdata: null;
hideCamera: null
 const INITIAL_STATE = {
    
     };
     
     const QRCodeReducer = (state = INITIAL_STATE, action) => {
            switch (action.type) {
           
     
            case 'QRCODE_INITIAL':
            console.log("data in reducer", action.qrcodedata)
                return {
                    ...state,
                    qrdata: action.qrcodedata
                }

                case 'HIDE_CAMERA':
                console.log("hidecamera reducer")
                return {
                    ...state,
                    hideCamera: action.hidden
                }
               
                case 'PAD_DETAILS':
                return {
                    ...state,
                    padListing: action.pads
                }
        
            default:
            return state;
        }
     };
     export default QRCodeReducer;