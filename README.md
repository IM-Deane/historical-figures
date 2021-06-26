# Project: Memories Social Media App

_Current Version:_ 1.0.8

# Description: This app utilizes the MERN stack to create a small-scale social media application.

Users can create an account or login using their google account. Once they've
chosen an account option, the user can create a post that is saved in a MongoDB
Atlas cluster.

Only users who're signed in can like the posts and only the post's creator can
edit/delete the post.

# Future Plans:

For the next version of the app, I will be adding client side routing and
pagination. I will also likely update the general theme of the site to make it
more interesting.

# Version History:

_Version 1.0.8:_

Added a recommended posts feature to the post details page. This feature finds
other posts that're relevant to the selected post and displays them to the user.

The search function is not working due to a logic error. However, it's 1:30am
and i'm not going to solve it tonight in this state.

I will address this bug in the next update.

_Version 1.0.7:_

Implemented the project details page. When the user clicks on a project card,
they create a post request that fetches the specified post's data. Once the data
has been retrieved, the user is pushed to an individual project page which
renders the projects details in a card.

Note: I fought for an hour with a bug that stemmed from the "moment.js" library.
The function "moment([dateValue]).fromNow()" was not working properly. So
instead of calculating the amount of time that's passed since the post was
created, I've opted to simply display its creation date.

_Version 1.0.6:_

Added a loading state using Redux's built-in _isLoading_. I've called this
feature when the user performs longer async actions (initial page load,
searching for posts, clickling on pagination, etc. ).

Users prefer visual feedback and so this will hopefully improve the overall UX.

_Version 1.0.5:_

Implemented pagination feature. The app will now only get and display a limited
amount of posts when making a fetch request. I set the limit to 8 posts per
page. Unfortunately, the app only has 5 posts for now. So i'll have to do more
indepth testing later.

_Version 1.0.4:_

Updated the site's styling to a more professional looking theme. It no longer
looks like a fourth grader made it.

To accomplish this, I updated the Nav logo and changed the site's background
color to an offwhite.

Finally, I updated the layout of the cards so that a max of 4 cards are added to
each row on larger screens.

_Version 1.0.3:_

Finished implementing the search posts feature. It will now update the browser
url to the specified query, dispatch the query to the database, and render the
results.

_Version 1.0.2:_

Implemented search request functionality. This feature allows the user to search
for a post by either it's title or by its tags.

Currently, the results are simply printed to the browser console. However, I
felt this was a good milestone as I had to create a new route
(getPostsBySearch()) and implement the necessary backend logic (find the posts
by their title or a tag present in their tags array.)

_Version 1.0.1:_

Implemented pagination and search bar functionality.

I also updated the client routes. The home route "/" will now redirect to
"/posts". The "/auth" route will now redirect users who're logged in to the
"/posts" route.

_Version 1.0.0:_

This version of the project builds upon a previous app that had basic CRUD
functionality. In this update, the app now has an authorization feature that
only allows users with an account to interact with the posts.
