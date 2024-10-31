# Tic Tac Toe Game

Welcome to the Tic Tac Toe game! This project is a web-based implementation of the classic Tic Tac Toe game with additional features such as playing against AI, online multiplayer, and a stylish user interface.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [How to Play](#how-to-play)
- [Usage](#usage)
- [Code Structure](#code-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Play Modes**: 
  - Play against another player offline.
  - Play against AI with different difficulty levels.
  - Play online with other players.
  
- **User Interface**: 
  - Modern and responsive design.
  - Neon text effects and animations.
  
- **Sound Effects**: 
  - Audio feedback for game events.

## Installation

1. **Open with URL**: You can play the game directly by visiting [https://elsesourav.github.io/Tic-Tac-Toe/](https://elsesourav.github.io/Tic-Tac-Toe/).

2. **Clone the Repository**:
   - Clone the repository to your local machine:
     ```bash
     git clone https://github.com/yourusername/tic-tac-toe.git
     ```
   - Navigate to the project directory:
     ```bash
     cd tic-tac-toe
     ```
   - Open `index.html` in your web browser to start the game.

## How to Play

Tic Tac Toe is a simple game played on a 3x3 grid. Here’s how you can play:

1. **Objective**: The goal is to be the first player to get three of your marks in a row (horizontally, vertically, or diagonally).

2. **Players**: The game is played between two players. One player uses "X" and the other uses "O".

3. **Gameplay**:
   - Players take turns placing their mark in an empty cell on the grid.
   - The first player to align three of their marks in a row wins the game.
   - After each player has made three moves:
     - The oldest mark is removed from the board when a new mark is placed.
     - This ensures the board never has more than six marks at any time.
     - This rule prevents a draw and guarantees that the game will always have a winner.

4. **Game Modes**:
   - **Offline**: Play against another player on the same device.
   - **AI**: Challenge the computer with different difficulty levels.
   - **Online**: Compete against other players over the internet.

## Usage

- **Offline Mode**: Click "Play Offline" to start a game against another player on the same device.
- **AI Mode**: Click "Play With AI" and select a difficulty level to play against the computer.
- **Online Mode**: Click "Play Online" to search for an opponent and play over the internet.

## Code Structure

- **HTML**: The main structure of the game is defined in `index.html`.
  - Key sections include the game board, player information, and various modals for game states.

- **CSS**: Styles are organized into multiple CSS files for different components and effects.
  - `css/style.css`: General styles and layout.
  - `css/neonText.css`: Neon text effects.
  - `css/board.css`: Styles specific to the game board.
  - `css/windows/*.css`: Styles for different modal windows.

- **JavaScript**: Game logic and interactivity are handled by several JavaScript files.
  - `js/utils.js`: Utility functions for local storage and device detection.
  - `js/global.js`: Global variables and Firebase configuration.
  - `js/main.js`: Main game setup and event listeners.
  - `js/game.js`: Core game logic for different game modes.
  - `js/db.js`: Firebase database interactions for online play.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.