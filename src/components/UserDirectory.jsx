import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, getUserPosts } from '../services/api';

const UserDirectory = () => {
  const [users, setUsers] = useState([]);
  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUsers();
      setUsers(userData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserCards = async () => {
      const cards = await Promise.all(
        users.map(async (user) => {
          const postCount = await getUserPostCount(user.id);

          return (
            <Link to={`/user/${user.id}`} key={user.id} className="user-card-link">
              <div className="user-card">
                <div className="user-info">
                  <p className="user-name">Name: {user.name}</p>
                  <p className="post-count">Posts: {postCount}</p>
                </div>
              </div>
            </Link>
          );
        })
      );

      setUserCards(cards);
    };

    fetchUserCards();
  }, [users]);

  return (
    <div >
      <h1 className='userDirectoryH1'>User Directory</h1>
      {userCards}
    </div>
  );
};

const getUserPostCount = async (userId) => {
  try {
    const posts = await getUserPosts(userId);
    return posts.length;
  } catch (error) {
    console.error('Error fetching user posts:', error);
    return 0;
  }
};

export default UserDirectory;
