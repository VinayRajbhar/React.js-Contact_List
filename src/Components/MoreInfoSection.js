
// hooks from redux 
import { useDispatch, useSelector } from "react-redux";

// functions and selector from contact reducer
import { contactSelector, setShowAddContact,} from "../Redux/Reducers/contactReducer";

// component to render on screen

// for update
import UpdateSection from "./UpdateSection";
// add contact section
import AddContact from "./AddContact";


// render the moreInfo section on the page
const MoreInfoSection = () => {

    // dispatch variable
    const dispatch = useDispatch();
    // getting state values form the contact reducer
    const {showContact,showAddContact}  = useSelector(contactSelector);

    // render the section
    return(

        // container (hidden for smaller screen and visible on medium and larger)
        <div className="hidden md:block rounded 
                        w-full h-fill bg-[#CEE6F3] m-2 
                        p-2 shadow-md shadow-slate-400">
            

            {/* little navbar inside the moreInfo section */}
            {/* toggel between the add contact section and moreInfo section  */}
            <div className="bg-white h-[40px] flex justify-between px-1 rounded items-center">
                
                {/* heading in navbar */}
                <span className="text-lg text-indigo-800 font-semibold">
                    {/* change navbar heading on condition */}
                    {showAddContact ? "Add Contact Page"
                                    : "More Info Page" }
                </span>
                
                {/* button to add contact */}
                <button className="rounded bg-[#78C1F3] w-[100px] h-7 float-right 
                                text-white shadow-md" 
                        onClick={() => dispatch(setShowAddContact())}
                        >

                    {/* change button heading on condition  */}
                    {showAddContact ? "Cancel"
                                        : "Add Contact" }
                </button>

            </div>

            {/* container of different section  */}
            <div className="flex justify-center items-center h-fill">
                
                {/* whether to show the update section of a contact */}
                {!showContact 
                    ?   
                        // if not then show the following heading on the page
                        <h2 className="self-center justify-self-center text-indigo-800 font-semibold">
                            {!showAddContact ? 'Click on a contact' : null}
                        </h2>
                    :
                    <>
                        {/* is user clicked on a contact inside the list then show update section for that contact */}
                        <div className="w-4/5 mt-3 bg-[#F8F0E5] justify-self-center 
                                        self-center shadow-md p-2 rounded">
                            
                            {/* render the section  */}
                            {/* passing the values of contact as props */}
                            <UpdateSection />

                        </div>
                    </>
                }


                {/* to show add contact section  */}
                {!showAddContact
                    ?
                    null
                    :
                    // if user clicked on add contact button then show the add contact section
                    <div className="w-4/5 mt-3 justify-self-center self-center bg-[#F8F0E5] rounded shadow-md p-2">
                        {/* section heading  */}
                        <h1 className="text-lg font-semibold my-2 text-center">Add Contact Page</h1>

                        {/* render the section */}
                        <AddContact />
                    </div>
                }
                
            </div>
        </div>
    );
}

export default MoreInfoSection;