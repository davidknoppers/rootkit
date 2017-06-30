# rootkit
Not that kind of root kit ;) this is an open source project for an automated plant care system
Final project for year one of [Holberton School](https://www.holbertonschool.com/).

### Contributors

Danton Rodriguez, @p0516357

David Knoppers, @davidknoppers

Richard Sim, @rdsim8589

Timothy Britton, @wintermanc3r

### Why would I want this?

Whether you are a commercial farmer or someone who is prone to forgetting to water your favorite
house plant from time to time, this system removes the guesswork from environmental factors and
can automate most regular tasks related to plant care.

### Why did you build this?

The idea of automating plant tracking was interesting to all of us, as was the idea of building
a JavaScript-heavy stack. We had only a little experience in Node, Express and React. Now 
we have a lot more. We also opted for a full-stack-plus-IoT project (as opposed to, say,
lower-level programming) in order to relearn and revisit much of what we learned during year 1
at Holberton School.

### How do I use this?

You sign up through one of the creators, and we send you the hardware. Each of your sensors
corresponds to a unique plant id in our database. We start tracking data on your plant as soon
as you activate the sensor. You have the option of receiving updates on your plant via Twitter.

### How does it work?

![rootkit diagram](http://i.imgur.com/9Bw6niU.png)

A sensor in your plant is physically connected to an arduino, which in turn sends data through
to a Raspberry Pi, which sends the data to a server via a POST request. An app on our server, built
in Node and Express, processes the data and enters it into our MySQL database. You can view the data
for your plant on our website, which is built with HTML/CSS and React. You can also sign up for notifications
about your plant via our Twitter bot, which is built with Python 3 and Tweepy, and holds a small amount
of persistent data on our server in JSON format.

### Moving Forward

Scalability Improvements: current parts of our stack are hardcoded (like JSON file that tracks the twitter
handles of our users). We are also using node.js as our web server, which obviously needs to change.

Plug and Play: We have a mostly complete list of the dependencies and requirements for our stack; better still
would be a script that automates setup and deployment of our service. Much of this automation has been written,
but not all of it.

Hire a Frontend Developer: Our website has some strong points, but it's not fully functional as we'd like it to be,
and a few parts are downright broken. It's time to bring in some frontend expertise, or develop it ourselves!
