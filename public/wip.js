var gh = new Octokit({
  token: TOKEN
});

var user = gh.getUser();

user.getRepos()
  .then(function(repos) {
    console.log(repos);
  });
