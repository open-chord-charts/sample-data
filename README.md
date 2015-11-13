# Open Chord Charts sample data

Sample JSON files for OpenChordCharts -- a contributive database of songs chords

## Run charts bench

The first time:

```
npm install
```

Then:

```
npm run dev
```

and open your browser to http://localhost:3010/bench

## Import a chart

To import a chart, call the API with the [httpie](http://httpie.org) client, like this:

    http --auth login:password :3000/api/1/charts < data/chart.json

Replace `login`, `password` and `chart.json` by the right values.

If you run locally the development version of the API (with `development.ini` configuration file), you can use the `dummy` username which works with every passwords. For example :

    http --auth dummy:a :3000/api/1/charts < data/all_of_me.json
