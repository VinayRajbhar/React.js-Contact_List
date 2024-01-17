
// react hook
import { useState } from "react";

// redux hooks to dispatch actions and use store
import { useDispatch, useSelector } from "react-redux";

// for toast notifications
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// functions from contact Reducers
import { contactSelector, addContactThunk } from "../Redux/Reducers/contactReducer";


// function to render add contact section
const AddContact = () => {

    // for dispatching an action
    const dispatch = useDispatch();

    // to whether user made some changes in data or not
    const [isChanged,setIsChanged]=useState(false);

    // getting contact list from redux store
    const {contactList} = useSelector(contactSelector);

    // an initial structure to store user's data
    const inputStructure = {
        id:`${contactList.length}`,
        name:'',
        email:'',
        phone:'',
        address:{
            suite:'',
            city:'',
            zipcode:''
        }
    };

    // to store changes made inside the initial data 
    const [formData,setFormData]  = useState(inputStructure);
    // to store the address of user
    const [address,setAddress] = useState(inputStructure.address);

    
    // handle the form submission
    const handleSubmit = (e) => {

        // if user didn't made any changes in data
        if(!isChanged){
            // show notification and return
            toast.error('Nothing to add in the list');
            return;
        }

        // to check whether the contact contains a name and phone number
        if(formData.name === '' || formData.phone === ''){
            toast.error('Name / Phone cannot be empty');
            return;
        }

        // prevent default action
        e.preventDefault();

        // calling add contact function
        dispatch(addContactThunk(formData));
        toast.success('A new contact is Added !!');
        setIsChanged(false);
    }


    // to handle the changes made inside the input fields in form and store the data in state variables
    const handleChange = (e) => {
        // set is changed value to true so that user can submit the data
        if(!isChanged){
            setIsChanged(true);
        }

        // getting values from targeted element
        const {name,value} = e.target;
        
        // store the data inside the object at their position
        setFormData({
            ...formData,
            [name]:value,
        });
    }


    // to store changes made inside the address section of the form
    const handleAddressChange = (e) => {
        if(!isChanged){
            setIsChanged(true);
        }

        const {name,value} = e.target;
        
        // store the address
        setAddress({
            ...address,
            [name]:value,
        })

        // append the address inside the main data object 
        setFormData({
            ...formData,
            address:{
                ...address,
                [name]:value
            }
        });
    }


    // to reset the form data
    const handleReset = (e) => {
        e.preventDefault();

        // set to false so that user cannot submit the empty data
        setIsChanged(false);

        // setting data to initial Structure
        setFormData(inputStructure);

        // setting address to initial value
        setAddress(inputStructure.address);
        // toast notification
        toast.success('Entered data is removed !!');
    }


    // render the section
    return(
    <>
        {/* container div with padding and border radius */}
        <div className="w-full bg-[#313866] p-2 rounded">
            {/* form to get user's data */}
            <form>
                {/* table to create the layout of input fields */}
                <table className="border-separate border-spacing-2">

                    <tbody>
                        {/* first row containing name section */}
                        <tr>
                            <td>
                                {/* label */}
                                <label for="name" className="text-white font-semibold">
                                    Name :
                                </label>
                            </td>
                            <td>
                                {/* input box */}
                                <input type="text"
                                    id="name" 
                                    name="name" 
                                    value={formData.name}
                                    className="rounded-sm focus:outline-none focus:border-2 focus:border-[#6a88ee] "
                                    onChange={handleChange}
                                    required />
                            </td>
                        </tr>

                        {/* second row for phone number */}
                        <tr>
                            <td>
                                {/* label */}
                                <label for="phone" className="text-white font-semibold">
                                    Phone :
                                </label>
                            </td>
                            <td>
                                {/* input box */}
                                <input type="text"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="rounded-sm focus:outline-none focus:border-2 focus:border-[#6a88ee] "
                                    required />
                            </td>
                        </tr>

                        {/* third row for Email */}
                        <tr>
                            <td>
                                {/* label */}
                                <label for="email" className="text-white font-semibold">
                                    Email :
                                </label>
                            </td>
                            <td>
                                {/* input box */}
                                <input type="text"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    className="rounded-sm focus:outline-none focus:border-2 focus:border-[#6a88ee] "
                                    onChange={handleChange}
                                    required />
                            </td>
                        </tr>

                        {/* for Address heading */}
                        <tr>
                            <td colSpan={2}>
                                {/* label */}
                                <label className="text-white font-semibold">
                                    Address
                                </label>
                            </td>
                        </tr>


                        {/*  row for house no. in Address */}
                        <tr>
                            <td>
                                {/* label */}
                                <label for="suite" className="text-white font-semibold">
                                    H. No. :
                                </label>
                            </td>
                            <td>
                                {/* input box */}
                                <input type="text"
                                    id="suite"
                                    name="suite"
                                    value={address.suite}
                                    className="rounded-sm focus:outline-none focus:border-2 focus:border-[#6a88ee]"
                                    onChange={handleAddressChange}
                                    required />
                            </td>
                        </tr>

                        {/* row for city name in address */}
                        <tr>
                            {/* label */}
                            <td>
                                <label for="city" className="text-white font-semibold">
                                    City :
                                </label>
                            </td>
                            <td>
                                {/* input box */}
                                <input type="text"
                                    id="city"
                                    name="city"
                                    value={address.city}
                                    className="rounded-sm focus:outline-none focus:border-2 focus:border-[#6a88ee] "
                                    onChange={handleAddressChange}
                                    required />
                            </td>
                        </tr>

                        {/* row for zipcode inside the address */}
                        <tr>
                            <td>
                                {/* label */}
                                <label for="zipcode" className="text-white font-semibold">
                                    ZipCode :
                                </label>
                            </td>
                            <td>
                                {/* input box */}
                                <input type="text"
                                    id="zipcode"
                                    name="zipcode"
                                    value={address.zipcode}
                                    className="rounded-sm focus:outline-none focus:border-2 focus:border-[#6a88ee] "
                                    onChange={handleAddressChange}
                                    required />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>

        {/* button for submit the form  */}
        <button className="float-left bg-[#75C2F6] 
                        text-white py-[2px] px-[3px] mt-1 rounded 
                        shadow-md" 
                onClick={handleSubmit}>
            Add Contact
        </button>

        {/* button for reset the entered values  */}
        <button className="float-right bg-red-500 
                        text-white p-[2px] mt-1 rounded 
                        shadow-md" 
                onClick={handleReset}>
            Reset
        </button>
    </>
    )
}

export default AddContact;