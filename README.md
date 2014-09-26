NoughtsAndCrossesGameEngine
===========================

A basic Noughts And Crosses Game api. Information about the current game is stored in the cookie - so of you delete or alter that, an error will occur. 

API
===
All methods are currently HTTP POST only. Only expects and responds with  appliction/json type. All errors (except for actual HTTP ones) are status 500, I'll change this if it proves to be a problem.

Be liberal with what you expect is for the weak :)

/api/v1.0/newgame
-----------------
Creates a new game, re-setting existing board. 

###Expected Body
{"player1": "*playertype*", "player2":"*playertype*" }

###Error responses


/api/v1.0/makemove
-----------------
Makes a move on the existing game - the client must have called newgame before this for it to work.

###Expected Body

###Error responses
