#:cow: Dan's Fantastic Cowsay HTTP Server :cow:
##You'll never use another kind of server ever again
###:cow2: mooooo :cow2:

This project is a basic HTTP server implementation which can handle GET and POST
requests and returns the data in the form of cowSay. It's pretty super mootastic.

I perhaps went a little overboard on this assignment, and really tried to make things
modular (or should I say, moooodular?), which wasn't necessarily part of the assignment.
I wanted to actually break things out into their separate components instead of
stuffing everything into the server.js file.

In regards to the server.js, I purposefully have a function called ```start``` which then
returns the server itself. This allows me be a little more flexible in my testing.

The design of this whole server was inspired by The Node Beginner Book by Manuel Kiessling.
I took his general framework and modified it to meet the requirements of this project.

_______
< ENJOY >
-------
       \   ^__^
        \  (oo)\_______
           (__)\       )\/\
               ||----w |
               ||     ||
