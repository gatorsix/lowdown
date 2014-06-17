var passport = require('koa-passport');
var GitHubStrategy = require('passport-github').Strategy;

var opts = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/github/callback',
  scope: 'user:email, repo, read:org'
};

passport.use(new GitHubStrategy(opts, function(accessToken, refreshToken, profile, done) {
  console.log('[GitHub] accessToken: %s refreshToken:%s', accessToken, refreshToken);
  return done(null, {accessToken:accessToken, profile:profile});
  // User.findOrCreate({ githubId: profile.id }, function (err, user) {
  //   return done(err, user);
  // });
}));