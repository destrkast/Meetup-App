import { useState, useEffect } from 'react';
import MeetupList from '../components/meetups/MeetupList';

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    fetchMeetups(true);
  }, []);

  function fetchMeetups(withLoader) {
    if (withLoader) setIsLoading(true);

    fetch('https://reacttest-f7298-default-rtdb.firebaseio.com/meetups.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const meetups = [];
        for (const key in data) {
            const meetup = {
              id: key,
              ...data[key]
            };
            meetups.push(meetup);
        }
        if (withLoader) setIsLoading(false);
        setLoadedMeetups(meetups);
      });
  }

  function deleteMeetupHandler(id) {
    fetch(
      `https://reacttest-f7298-default-rtdb.firebaseio.com/meetups/${id}.json`,
      {
        method: 'DELETE',
      }
    ).then(() => {
      fetchMeetups(false);
    });
  };

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }
  return (
    <section>
      <h1>All Meetups Page</h1>
      <ul>
        <MeetupList meetups={loadedMeetups} onDelete={deleteMeetupHandler} />
      </ul>
    </section>
  );
}

export default AllMeetupsPage;
