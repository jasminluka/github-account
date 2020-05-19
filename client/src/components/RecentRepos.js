import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecentRepos = ({ accessToken, username, repoType, type }) => {
  const [repos, setRepos] = useState([]);

  let url = username ? `https://api.github.com/users/${username}/${repoType}?sort=created&per_page=15` : `https://api.github.com/user/${repoType}?sort=created&per_page=15&type=${type}`;

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(url, {
          headers: {
            'Authorization': `token ${accessToken}`
          }
        });

        setRepos(res.data);
      }
      catch (err) {
        console.log(err);
      }
    })();
  }, [accessToken, url, type]);

  return (
    <>
      {
        repos.map(repo => {
          return (
            <React.Fragment key={repo.id}>
              <div className="card">
                <div className="card-header">
                  <div className="row">
                    <div className="col-md-6">
                      {
                        repoType === 'starred' &&
                          <>
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={repo.owner.html_url}
                              style={{textDecoration: 'none'}}
                            >
                              <em className="text-success">{repo.owner.login}</em>
                            </a> / {' '}
                          </>
                      }
                      <strong>{repo.name}</strong>: {repo.description}
                    </div>
                    <div className="col-md-4">
                      <span className="badge badge-pill badge-warning marginRight">Forks: {repo.forks_count}</span>
                      <span className="badge badge-pill badge-primary marginRight">Watchers: {repo.watchers_count}</span>
                      <span className="badge badge-pill badge-success marginRight">Stars: {repo.stargazers_count}</span>
                    </div>
                    <div className="col-md-2">
                      <a target="_blank" rel="noopener noreferrer" className="btn btn-danger" href={repo.html_url}> Repo Page </a>
                    </div>
                  </div>
                </div>
              </div>
              <br />
            </React.Fragment>
          )
        })
      }
    </>
  );
}

export default RecentRepos;