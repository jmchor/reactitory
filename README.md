# Reactitory - the auditory frontend written in React

This is the frontend magic for the [auditory backend magic](https://github.com/jmchor/auditory). Magic all around.

<p align="center">
<img src="public/reactitory.png" alt="the auditory fron page" width="500px"/>
</p>

For a demo of the app, click [here](https://auditory.onrender.com/).

!! Important notice: since I'm hosting on a Render free tier, startup for the backend takes some time every time.

## Features

All of the routes are getting called - and now you have a nice frontend UI for it!

- **Create New Records:** Type in the name of an artist - and auditory does the rest (while you get to enjoy loading spinners!)

- **Alter Records:** Every Artist and Album has the option to edit the database entry

- **Dynamic Search Results:** The component dynamically fetches and displays results based on the user's search query, including artists, albums, tracks, and genres.

- **Pagination:** For lengthy result lists, the component implements pagination to improve user navigation and experience.

- **Modal Display:** When a user clicks on an image in the table, a modal with a larger version of the image is displayed.

## Usage

Put in a search term, select a search option, and see what you get!

- **Track Search:** Here you NEED to put in the ARTIST, TRACK names. I found that loads of artists share track titles.

- **Album Search:** Here you can choose - just the ALBUM, or ALBUM, ARTIST - if you're not sure if the album name is unique or not.

## Dependencies

- React
- axios from Redaxios

## Words of Caution

The "fetch youtube URL for a track" feature is - wonky at best. It's an incredibly simple script - take the artist's name and trackname, throw it to YouTube, and take the first result.
With distinct titles that works great - at other times, not so much. Just have some fun with it!
