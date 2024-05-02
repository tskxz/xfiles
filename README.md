# xfiles

File Upload with Node.js, Express.js and MongoDB.


## Run Locally

Clone the project

```bash
  git clone https://github.com/tskxz/xfiles.git
```

Go to the project directory

```bash
  cd xfiles
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_STRING`

## Set Up MongoDB Database

Go to https://www.mongodb.com/ and create a new project.
If this is your first time, it will appear to accept the privacy policy and terms of service. Check the mark and submit it. Then you need to answer the questions that will appear. 

Select the M0 option to be able to get free clusters. You can name it everything you want, leave these checkboxes marked, and create a deployment.

After that, your username and password will appear in the database. Remind yourself of your username and password; you will need them later. Create your database user, and at the connection method, choose drivers. Copy your connection string.

## .env file
In your .env file created at xfiles directory, put your connection string, your .env should look like this

```bash
DATABASE_STRING=mongodb+srv://[username:password@]host[/[defaultauthdb][?options]]
```
