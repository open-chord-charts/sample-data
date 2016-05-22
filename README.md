# Open Chord Charts sample data

Sample JSON files for OpenChordCharts -- a contributive database of songs chords

View online: http://openchordcharts.github.io/sample-data/

## Run charts bench

```
npm install
npm start
```

then open your browser to http://localhost:3010/

Statistics: open http://localhost:3010/build/stats.html

## In production

This is a static application, the web server just serves the HTML/JS/CSS files.

Build and test in production environment:

```
npm run start-production
```

then open your browser to http://localhost:3011/

If it's OK, deploy:

```
npm run deploy
```

Statistics: open http://localhost:3011/build/stats.html
