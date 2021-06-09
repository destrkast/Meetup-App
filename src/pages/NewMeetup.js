import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import NewMeetupForm from '../components/meetups/NewMeetupForm';

function NewMeetupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  function addMeetupHandler(meetupData) {
    setIsLoading(true);
    fetch('https://reacttest-f7298-default-rtdb.firebaseio.com/meetups.json', {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: { 'Content-type': 'application/json' },
    }).then(() => {
      setIsLoading(false)
      history.replace('/');
    });
  }
  return (
    <section>
      <h1>Add New Meetup Page</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} isLoading={isLoading}/>
    </section>
  );
}

export default NewMeetupPage;
