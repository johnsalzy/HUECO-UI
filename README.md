# HUECO
A social media & progress tracking based rock climbing app for iOS and Andriod

Made to fill the current void of tracking indoor climbing process there are plenty of others for outdoors
 
## Backend

### API
Made utilizing Django hosted with AWS

### Media Storage
Our current media (photos, videos) are stored and resized/edited on cloudinary

### Database
PostgreSQL hosted on AWS


## User Interface

### State Management
State management is done using local state and [redux](https://redux.js.org/)

### Push Notifications
Push notifications are managed with expo push notifications [library](https://docs.expo.io/push-notifications/overview/)
Notifications are sent out using a Python celery process

Push notifcations are used for the following
1. Alerting a user if their photo/post was liked
2. Alerting a user if their photo/post was commented on
3. Alerting a user if they were tagged in a post

### Project Screenshots<sup id="a1">[1](#f1)</sup>
<img src="https://github.com/johnsalzy/HUECO-UI/blob/master/Screenshots/Screenshot_20200915-002447.png" alt ="Home Page Post View" height="640" width='360' />
A screenshot from the home page demonstrating a user post with user added media, a tagged user, and tagged route

---

<img src="https://github.com/johnsalzy/HUECO-UI/blob/master/Screenshots/Screenshot_20200915-002828.png" alt ="Home Page Post View 2" height="640" width='360' />
A screenshot from the home page demonstrating a user post and showing the comment section

---


<img src="https://github.com/johnsalzy/HUECO-UI/blob/master/Screenshots/Screenshot_20200915-002500.png" alt ="Create Button Expanded" height="640" width='360' />
A screenshot showing the main user social actions (Edit area only available if you are admin on an area)

***


<img src="https://github.com/johnsalzy/HUECO-UI/blob/master/Screenshots/Screenshot_20200915-002530.png" alt ="Tick Route View" height="640" width='360' />
A screenshot showing the 'Create Tick' page. Which allows users to select the route, edit the date, ascent type, rating, and leave a comment

---


<img src="https://github.com/johnsalzy/HUECO-UI/blob/master/Screenshots/Screenshot_20200915-002711.png" alt ="Profile Page" height="640" width='360' />
A view of the profile page

---


<img src="https://github.com/johnsalzy/HUECO-UI/blob/master/Screenshots/Screenshot_20200915-002948.png" alt ="Profile Page" height="640" width='360' />
A view of lower down on the profile page

---


<img src="https://github.com/johnsalzy/HUECO-UI/blob/master/Screenshots/Screenshot_20200915-002718.png" alt ="Settings Page" height="640" width='360'/>
View if you click the settings icon on your profile page

---


<img src="https://github.com/johnsalzy/HUECO-UI/blob/master/Screenshots/Screenshot_20200915-002729.png" alt ="Search Page - Users" height="640" width='360'/>
View from search page, looking for users

---


<img src="https://github.com/johnsalzy/HUECO-UI/blob/master/Screenshots/Screenshot_20200915-003028.png" alt ="Search Page - Users profile" height="640" width='360'/>
View from search page, if you click on a users profile

---


<img src="https://github.com/johnsalzy/HUECO-UI/blob/master/Screenshots/Screenshot_20200915-002746.png" alt ="Search Page - Routes" height="640" width='360'/>
View from search page, looking for routes

---


<img src="https://github.com/johnsalzy/HUECO-UI/blob/master/Screenshots/Screenshot_20200915-003101.png" alt ="Stats view - Routes" height="640" width='360'/>
View from profile page if you select the stats view

---


<img src="https://github.com/johnsalzy/HUECO-UI/blob/master/Screenshots/Screenshot_20200915-003120.png" alt ="Edit Area page" height="640" width='360'/>
View from the Edit area page, toggled in the + from the home screen

---


<img src="https://github.com/johnsalzy/HUECO-UI/blob/master/Screenshots/Screenshot_20200915-003318.png" alt ="Create Post Page" height="640" width='360'/>
View of the create post page

---


<img src="https://github.com/johnsalzy/HUECO-UI/blob/master/Screenshots/Screenshot_20200915-003120.png" alt ="Create Post, but showing user tag selection" height="640" width='360'/>
View from the Create Post page, showing users that you are able to tag


https://github.com/johnsalzy/HUECO-UI/blob/master/Screenshots/Screenshot_20200915-003355.png


## Project Status

### Project Problems
1. Video resizing/editing/uploading is very expensive and hosting it on cloudinary is not a good solution
2. Time (I need more of this, this project was primarily a quarantine project for me and my brother)
3. The project has about 0 testing (oops)
4. While most things are cross phone compatible Apples iPhone X bar at the top causes a few issues

### Still Needs Done
1. Utilize local phone storage to store area info ( similar to mountain projects downloading area)
2. Use refresh tokens to make app more secure
3. Need to implement the climbing game(Halfdome climber) that I developed along with it
4. Ability to change grades between differnt systems (YDS, UIAA, British)
5. Do a better job at showing user climbing stats
6. Many more things

#### Footnotes
<b id="f1">1</b> All screenshots were taken on a Google Pixel(1st Gen). More images can be provided to show cross phone compatability [↩](#a1)
