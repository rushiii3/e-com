import axios from 'axios';
import { ser } from 'first'
// load user
export const loadUser = () => async(dispatch) => {
    try {
        dispatch({
            type:"LoadUserRequest",
        });
        const {data} = await axios.get(`${server}/`)
    } catch (error) {
        
    }
}