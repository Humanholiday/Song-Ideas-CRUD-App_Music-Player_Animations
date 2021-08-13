# CSC8425 - Assessment (Client Side)
# Song Ideas and Circle Sounds

## By Jack Healy

**Built using**

- HTML
- CSS
- Javascript
- Node
- Express
- Express
- SQLite

**Objectives**\
To build a front end web application to upload and manage new song ideas with an attractive and responsive UI.

To build a music player that can play song ideas or finished songs

To build an interactive page that plays sounds and animations, as a source of inspiration for song ideas

To add interactivity where possible, with cursor highlighting, form validation and an animated Sign In button.

**Packages and tools**\
Outside of the standard dependencies I used - \
[Howler.js](https://howlerjs.com) - JavaScript audio api/library \
[Paper.js](http://paperjs.org) - Open source vector graphics scripting framework \
[Tailwind CSS](https://tailwindcss.com) - Utility first CSS framework \
[EJS](https://ejs.co) - Embedded JavaScript templating\
[Sqlite studio](https://sqlitestudio.pl) - Desktop app for browsing and editing SQLite database files


**Steps**

```
1. Git clone repo or download and save project file
1. Navigate to project folder /webproject
2. Run npm install
3. Navigate to /webproject/js
3. Run node app.js
```

**Notes**

I used embedded JavaScript templating (EJS) to separate out components such as the music player and nav bar into partials that could then be included in the main pages.

I used SQLite studio to create a persistent database and save it in my project folder. This saves my song ideas in a .db file in the project folder.

I used Tailwind CSS to do most of my styling, I am familiar with its utility first approach and it made styling across multiple components easy.

Howler.js and Paper.js formed the basis of the 'Circle Sounds' page, enabling me to create interactive animations



