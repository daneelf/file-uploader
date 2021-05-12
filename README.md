## Simple file uplaoder

Simple file uploader with MERN stack.

## Build With

* [React](https://reactjs.org/)
* [Create-react-app](https://create-react-app.dev)
* [Material-UI](https://material-ui.com/)
* [Nodejs](https://nodejs.org) 
* [Express](https://expressjs.com/)
* [Mongoose](https://mongoosejs.com/)

### How to run with NPM
Clone repo:
```
git clone file-uploader
cd file-uploader
```
In order to upload files you'll need to create a folder in `files/public` directory:
```
cd file-uploader/public
mkdir files
```
Packages installation and running the app:
```
npm install
```
Run MongoDB:

```See more information about this action in Prerequisites```

Finally:

```npm start```


#### Prerequisites 

MongoDB must be installed and run **BEFORE**  running `npm start` in order to run the project smoothly (otherwise you will get a connection error).
Please folllow instructions to run **MongoDB** here: (https://levelup.gitconnected.com/how-to-install-mongodb-database-on-local-environment-19a8a76f1b92)

*React app listening at:*  **localhost:3000**.
*Node server listening at:*  **localhost:8000**.

### Features implemented
* Upload single audio file
* Delete single audio file
* Delete all data
* Preview audio file
