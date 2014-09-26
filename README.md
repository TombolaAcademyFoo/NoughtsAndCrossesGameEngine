NoughtsAndCrossesGameEngine
===========================

A basic Noughts And Crosses Game api. Information about the current game is stored in the cookie - so of you delete or alter that, an error will occur. 

API
===
All methods are currently HTTP POST only. Only expects and responds with  appliction/json type. All errors (except for actual HTTP ones) are status 500, I'll change this if it proves to be a problem.

Be liberal with what you expect is for the weak :)

/api/v1.0/newgame
-----------------
Creates a new game, re-setting existing board. Player 1 *always goes first* - but doesn't need to be human, indeed both players can be robotic. 

###Expected Body
{"player1": "*playertype*", "player2":"*playertype*" }


####playertype: 

*playertype*  is the type of player, valid values:

1. 'human' - the only non-robotic player supported, move sent by client from  
2. 'random' - a robotic player that chooses a random square
3. 'pre-trained' - a pre trained robot using a [MENACE](http://gizmodo.com/5395575/304-matchboxes-filled-with-beans-are-the-perfect-tic-tac-toe-opponent) style engine. This robot should be fairly competant. Note that the training algorithm is not currently supported, so it won't get better with time.

If you set both players to be non-human when creating a game, the response should be a completed game, if you set player two only as human, the response will povide the robots's first move.

###Response
{ "outcome": "*outcome*", "gamestate": "*gamestate*", "winner": "*winner player number*" }
####outcome

*outcome* is the outcome of the game, valid values

1. 'Continue' - Continue to play the game - no one has won and squares are available
2. 'Draw' - The game ended in draw.
3. 'Win' - A player has won the game.

####winner
*winner*  is player number of player who won the game. 
1. If *outcome* is win it will be either 1 or 2, depending on whether player 1 or 2 won
2. Otherwise, it will be 0, even if *outcome* is a draw


####gamestate
*gamestate*  is a represetion of the game board. It is a string containing 9 digits - each representing one square on the board:
|   Board  |
|----------|
|0 | 1 | 2 |
|3 | 4 | 5 |
|6 | 7 | 8 |

Markdown | Less | Pretty
0 | 1 | 2
3 | 4 | 5


###Error responses


/api/v1.0/makemove
-----------------
Makes a move on the existing game - the client must have called newgame before this for it to work.

###Expected Body

###Error responses
