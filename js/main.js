$(document).ready(function() {
  $("#searchUser").keyup(function(e) {
    let username = e.target.value;

    $.ajax({
      url: `https://api.github.com/users/${username}`,
      data: {
        client_id: "a4ecdabc7d478e637e75",
        client_secret: "e3d5ccd03b9964238fa5e7f435a485cea2f255b2"
      }
    }).done(function(user) {

        $.ajax({
            url: `https://api.github.com/users/${username}/repos`,
            data: {
                client_id: "a4ecdabc7d478e637e75",
                client_secret: "e3d5ccd03b9964238fa5e7f435a485cea2f255b2",
                sort: 'created: asc',
                per_page:2
              }
        }).done(function(repos) { 
            $.each(repos, function (index, repo) { 
                 $('#repos').append(`
                 <div class="card">
              <div class="row">
                <div class="col-md-7">
                  <strong>${repo.name}</strong>: ${repo.description}
                </div>
                <div class="col-md-3">
                  <span class="badge badge-dark">Forks: ${repo.forks_count}</span>
                  <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
                  <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-dark">Repo Page</a>
                </div>
              </div>
            </div>
                 `);
            });
         });

      $("#profile").html(`
       <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">${user.login}</h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-md-3">
                    <img style="width:100%" class="thumbnail" src='${user.avatar_url}' />
                    <a target="_blank" href="${user.html_url}" class="btn btn-primary btn-block">Visit</a>

            </div>
            <div class="col-md-9>

            <span class="badge badge-pill badge-secondary"></span>
                <span class="badge badge-pill badge-primary">Public Repos: ${user.public_repos}</span>
                <span class="badge badge-pill badge-success">Public Gists: ${user.public_gists}</span>
                <span class="badge badge-pill badge-danger">Followers: ${user.followers}</span>
                <span class="badge badge-pill badge-info">Following: ${user.following}</span>
                <br><br>
                <ul class="list-group">
                    <li class="list-group-item">Company: ${user.company}</li>
                    <li class="list-group-item">Website/Blog: ${user.blog}</li>
                    <li class="list-group-item">Email: ${user.email}</li>
                    <li class="list-group-item">Location: ${user.location}</li>
                    <li class="list-group-item">Joined: ${user.created_at}</li>
                </ul>
             
            </div>
          </div>
        </div>
       </div>

       <h3 class="page-header">Latest Repos</h3>
        <div id="repos"></div>
            `);
    });
  });
});
