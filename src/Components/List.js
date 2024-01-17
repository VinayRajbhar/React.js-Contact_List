
// redux hook to use the store
import { useSelector } from "react-redux";

// contact selector to get store data
import { contactSelector } from "../Redux/Reducers/contactReducer";

// different components to render on the page

// for a single list item
import ListItem from "./ListItem";
// for contact update section
import UpdateSection from "./UpdateSection";
// for add contact section
import AddContact from "./AddContact";


// render the whole contact list
const List = () => {

    // getting state values from the store
    const {contactList,showContact,showAddContact} = useSelector(contactSelector);

    // render the page
    return(
        // container
        <div className="md:w-[45%] bg-[#EDE4FF] flex 
                        flex-col rounded m-2 md:my-2 md:ml-2 
                        w-full h-fill md:border-r-2 shadow-md
                         shadow-slate-400">

            {/* container of update and add contact section */}
            <div className="w-fill md:hidden h-fit mb-2 border-b-2">

                {/* render the section when user click on a contact in the list */}
                {showContact ? <UpdateSection /> : null}

                {/* render the section when user click on add contact button */}
                {showAddContact ? <AddContact /> : null}
            </div>

            {/* list container */}
            <div className="w-fill h-fill flex flex-col m-1 p-1 flex-nowrap 
                            overflow-auto">
                
                {/* mapping over the contact list and add every contact to list  */}
                {contactList.map((contact,i) => <ListItem key={i}
                                                        contact={contact} />)}

            </div>
            
        </div>
    )
}


export default List;