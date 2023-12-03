import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUserDetails, getUserPosts, getCurrentTime, getCountries } from '../services/api';

const UserDetails = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [clockPaused, setClockPaused] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [timeZone, setTimeZone] = useState('IST');
  const [selectedPost, setSelectedPost] = useState(null);

  // function to return formatted time according to time zone
  const updateCurrentTime = (incomingTime) => {
    const formattedTime = incomingTime.toLocaleTimeString('en-US', { timeZone });
    return formattedTime;
  };

  useEffect(() => {
    //function to get particular user data from api
    const getUserData = async () => {
      const user = await getUserDetails(userId);
      setUserData(user);
    };
    
    //function to get posts of the user data from api
    const getUserPostsData = async () => {
      const posts = await getUserPosts(userId);
      setUserPosts(posts);
    };
    
    //function to get list of countries from api
    const getCountriesData = async () => {
      const countriesList = await getCountries();
      setCountries(countriesList);
    };

    getUserData();
    getUserPostsData();
    getCountriesData();

    //this handles working of clock on screen by adding 1 sec if clock is not paused
    const interval = setInterval(() => {
      if (!clockPaused) {
        setCurrentTime((prevTime) => new Date(prevTime.getTime() + 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [userId, clockPaused, selectedCountry]);

  //this handles pause/resume functionality for clock
  const handlePauseResume = () => {
    setClockPaused((prevPaused) => !prevPaused);
  };

  //this handles country change functionality to update clock
  const handleCountryChange = async (event) => {
    const country = event.target.value;
    setSelectedCountry(country);

    if (country) {
      try {
        //api call to get selected country timezone
        const response = await getCurrentTime(country);
        const timeZone = response.timezone || 'IST';
        setTimeZone(timeZone);
      } catch (error) {
        console.error('Error fetching current time:', error);
      }
    }
  };

  //this intiates popup once a post is clicked
  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  //this closes popup if user clicks outside post popup
  const handleClosePopup = () => {
    setSelectedPost(null);
  };

  return (
    <div className="user-details-container">
      <div className="user-profile">
      <Link to="/user-directory" className="back-button">
        Back to User Directory
      </Link>
        <div className="country-dropdown">
          <label htmlFor="country">Select Country: </label>
          <select className="countryDrop"  id="country" value={selectedCountry} onChange={handleCountryChange}>
            <option value="">Select</option>
            {countries.map((country) => (
              <option title={country}key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="clock-section">
          <label htmlFor="clock">Clock: </label>
          <span id="clock">{updateCurrentTime(currentTime)}</span>
          <button className="resumeButton" onClick={handlePauseResume}>{clockPaused ? 'Resume' : 'Pause'}</button>
        </div>
       
      </div>
      <h2>User Profile</h2>

      {userData && (
        <div className="user-info-card">
          <div className="left">
            <h3>{userData.name}</h3>
            <p>{userData.username} | {userData.company && userData.company.catchPhrase}</p>
          </div>
          <div className="right">
            <div className="address">
              <p>{userData.address && `${userData.address.street}, ${userData.address.city}, ${userData.address.zipcode}`}</p>
            </div>
            <div className="contact">
              <p> {userData.email} |  {userData.phone}</p>
            </div>
          </div>
        </div>
      )}
      <div className="user-posts">
        <div className="post-cards">
          {userPosts.map((post) => (
            <div className="post-card" key={post.id} onClick={() => handlePostClick(post)}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      </div>
      {selectedPost && (
        <div className="popup" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedPost.title}</h3>
            <p>{selectedPost.body}</p>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default UserDetails;
