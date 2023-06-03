import './CreateEventForm.css'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CreateEventForm() {
    const {groupId} = useParams()

    const group = useSelector(state => state.groupState[groupId])
    console.log(group)

    return (
        <div className='create-event-container'>
            <form>
                <h1>Create an event for {group.name}</h1>
                <label>
                    <p>What is the name of your event?</p>
                    <input placeholder='Event Name'></input>
                </label>

                <label>
                    <p>Is this an in person or online event?</p>
                    <select>
                        <option disabled >(Select one)</option>
                        <option value=''>In Person</option>
                        <option>Online</option>
                    </select>
                </label>
            </form>
        </div>
    )

}

export default CreateEventForm;
