# URL Shortener
This is a generic version of a URL shortener I had written for ChandlerBlvd in 2014, when short URLs were a big deal.

## How it works
A privileged user can sign in and paste a URL into a form. When the form is submitted, a short string is generated. 
When an HTTP request is made for `thisdomain.com/[short string]`, the response is a redirect to the original URL.
This enables short URLs to be used in social systems where character counts matter.
This also provides a way to track click-throughs.

## The Stack
* Backend: Go
* Frontend: React
* Database: MongoDB
* ORM: Prisma

## Getting Started

### Add environment variables
Copy file `.env.sample` and name it `.env`:
```zsh
cp .env.sample .env
```
Then edit the env file to set your preferred passwords, etc.

### Running the app
To start the app:
```zsh
docker compose build
docker compose up -d
```

The app will now be running at localhost:8080.

To stop the app:
```zsh
docker compose down
```

## License
This is provided under the MIT license.
If you use it for something, please send me a private message to inflate my ego.

—Peter
