<!-- PROJECT LOGO -->
<br />
<div id="readme-top" align="center">
  <h1 align="center">Full Stack Chat App</h1>

  <p align="center">
    A simple chat app to quickly connect with your friends!
    <br />
    <a href="https://chat-app-zs9s.onrender.com/">View Demo</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<!-- ![Project Screen Shot](/screenshot.png) -->
</br>
</br>
<div align="center">
    <img src="./screenshot.png" alt="Logo" width="auto" height="450" >
</div>
</br>
</br>

This was a project I built to gain efficiency in widely-used librairies Bcrypt and JWT for supporting Oauth2.0 functionalities and their applications in user registraction and login. 

Initially this project was confined to a simple login page that stored data within a MongoDB database. Subsequently, I expanded its scope by integrating a chat feature. An inherent challenge was establishing real-time synchronization of chat messages across multiple users while preserving chat data. To address this challenge, I studied use cases of Socket.io and developed a way to manage communication flow while storing data in MongoDB.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* React.js
* Redux
* Tailwind.css
* Express.js
* Socket.io
* Bcrypt
* JWT
* MongoDB

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Create a new MongoDB database and have your connection string

2. Clone the repo
   ```sh
   git clone https://github.com/noahchen1/chat-messaging-app.git
   ```
3. Install NPM packages in both the client and the server folders
   ```sh
   npm install
   ```
4. Create a .env file inside the server folder and enter your MongoDB connection string without '
   ```js
   ATLAS_URI='YOUR CONNECTION STRING';
   ```
5. In the client folder, you can run:

    ### `npm start`

    Runs the app in the development mode.\
    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Noah Chen - nuoya1996@gmail.com

Project Link: [https://github.com/noahchen1/chat-messaging-app.git](https://github.com/noahchen1/chat-messaging-app.git)

<p align="right">(<a href="#readme-top">back to top</a>)</p>