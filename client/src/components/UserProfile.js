import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import RecentRepos from './RecentRepos';

const UserProfile = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState({
    name: '',
    username: '',
    bio: '',
    photo: '',
    link: '',
    publicRepos: '',
    privateRepos: '',
    gists: '',
    followers: '',
    following: '',
    company: '',
    website: '',
    location: '',
    member: ''
  });
  const [displayPublicRepos, setDisplayPublicRepos] = useState(false);
  const [displayPrivateRepos, setDisplayPrivateRepos] = useState(false);
  const [displayStarredRepos, setDisplayStarredRepos] = useState(false);

  let history = useHistory();
  const access_token = localStorage.getItem('accessToken');

  let url = username ? `https://api.github.com/users/${username}` : 'https://api.github.com/user';

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(url, {
          headers: {
            'Authorization': `token ${access_token}`
          }
        });

        setUser({
          name: res.data.name,
          username: res.data.login,
          bio: res.data.bio,
          photo: res.data.avatar_url,
          link: res.data.html_url,
          publicRepos: res.data.public_repos,
          privateRepos: res.data.total_private_repos,
          gists: res.data.public_gists,
          followers: res.data.followers,
          following: res.data.following,
          company: res.data.company,
          website: res.data.blog,
          location: res.data.location,
          member: res.data.created_at
        });
      }
      catch (err) {
        console.log(err)
      }
    })();
  }, [access_token, url]);

  const showPublicRepos = () => {
    setDisplayPublicRepos(!displayPublicRepos);
    setDisplayPrivateRepos(false);
    setDisplayStarredRepos(false);
  }

  const showPrivateRepos = () => {
    setDisplayPublicRepos(false);
    setDisplayPrivateRepos(!displayPrivateRepos);
    setDisplayStarredRepos(false);
  }

  const showStarredRepos = () => {
    setDisplayPublicRepos(false);
    setDisplayPrivateRepos(false);
    setDisplayStarredRepos(!displayStarredRepos);
  }

  const logout = () => {
    localStorage.removeItem('accessToken');
    history.push('/');
  }


  if (!access_token) {
    history.push('/');
  }

  return (
    <>
      <h1 className="info">Hello Hackers</h1>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Username..."
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
      </form>
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-sm-11">
              <h1>{user.name} / {user.username}</h1>
              <p className="text-danger"><em>{user.bio}</em></p>
            </div>
            <div className="col-sm-1">
              <button
                type="button"
                className="btn btn-dark"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <ul className="list-group">
          <li className="list-group-item">
            <div className="row">
              <div className="col-md-3">
                <div className="card">
                  <img className="card-img-top" src={user.photo} alt="User" />
                  <div className="card-body">
                    <a target="_blank" rel="noopener noreferrer" className="btn btn-danger btn-block" href={user.link}> View User Profile </a>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <span className="badge badge-pill badge-danger marginRight">Public Repos: {user.publicRepos}</span>
                {
                  username ? '' : <span className="badge badge-pill badge-warning marginRight">Private Repos: {user.privateRepos}</span>
                }
                <span className="badge badge-pill badge-primary marginRight">Public Gists: {user.gists}</span>
                <span className="badge badge-pill badge-success marginRight">Followers: {user.followers}</span>
                <span className="badge badge-pill badge-info marginRight">Following: {user.following}</span>
                <br /> <br />

                <ul className="list-group">
                  <li className="list-group-item text-muted">Company: {user.company}</li>
                  <li className="list-group-item text-primary">Website: {user.website}</li>
                  <li className="list-group-item text-success">Location: {user.location}</li>
                  <li className="list-group-item text-warning">Member Since: {user.member}</li>
                </ul>
                <br />

                <button
                  className="btn btn-outline-primary btn-lg marginRight"
                  onClick={showPublicRepos}
                >
                  View public repos
                </button>
                {
                  username ? '' : 
                    <button
                      className="btn btn-outline-primary btn-lg marginRight"
                      onClick={showPrivateRepos}
                    >
                      View private repos
                    </button>
                }
                <button
                  className="btn btn-outline-primary btn-lg"
                  onClick={showStarredRepos}
                >
                  View starred repos
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <br /> <br />
      
      {
        displayPublicRepos || displayPrivateRepos ?
          <RecentRepos
            accessToken={access_token}
            username={username}
            repoType='repos'
            type={displayPublicRepos ? 'public' : displayPrivateRepos ? 'private' : ''}
          /> : displayStarredRepos ?
          <RecentRepos
            accessToken={access_token}
            username={username}
            repoType='starred'
          /> : null
      }
    </>
  );
}

export default UserProfile;