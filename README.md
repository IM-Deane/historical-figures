# Project: Memories Social Media App

_Current Version:_ 1.0.1

# Description: This app utilizes the MERN stack to create a small-scale social media application.

Users can create an account or login using their google account. Once they've
chosen an account option, the user can create a post that is saved in a MongoDB
Atlas cluster.

Only users who're signed in can like the posts and only the post's creator can
edit/delete the post.

# Future Plans:

For the next version of the app, I will be adding client side routing and
pagination. I will alos likely update the general theme of the site to make it
more interesting.

# Version History:

_Version 1.0.1:_

Implemented pagination and search bar functionality.

I also updated the client routes. The home route "/" will now redirect to
"/posts". The "/auth" route will now redirect users who're logged in to the
"/posts" route.

_Version 1.0.0:_

This version of the project builds upon a previous app that had basic CRUD
functionality. In this update, the app now has an authorization feature that
only allows users with an account to interact with the posts.
