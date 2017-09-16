# MEN-News-Scraper

This website utilizes MongoDB, Node, and Express on the back end and Bootstrap for the front end. It uses Cheerio to scrape news headlines and log them into a database. Users can then save them for later, and once saved can also comment on the articles.

The point of this website was to practice using Cheerio, MongoDB, Mongoose, and making references to other collections within a model and then populating them when called.

In hindsight creating a separate collection just for comments is actually inefficient but I decided to keep it on the site for the practice it gave me. In the future I would simply embed comments within the saved articles model. Because I wouldn't ever use this schema in the future, I opted not to bother deleting referenced comments whenever a saved article was removed.

It was fun to make this website, though, so have a look around! You can find it on heroku ((link here)).


