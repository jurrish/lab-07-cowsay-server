# HTTP Server Using Cowsay
---
#### Project Description:
This project is implementing the 'cowsay' feature to connect to specific routes with specific responses.

* First kick up the server with ```node server.js```

* Connect to the server with ```curl localhost:3000```

* Once you connect to the server go to the cowsay dir ```curl localhost:3000/cowsay```

There will be a dragon making sure you semantically correct!

* You will receive instructions to start with a '?' at the end ```curl localhost:3000/cowsay?text=hello world```

This will print a cow saying 'hello world'

* If you navigate to a different URL or directory ```curl localhost:3000/cowsay//```

An error message is returned back the ghostbusters to try again



