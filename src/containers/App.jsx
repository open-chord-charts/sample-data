import {chartsData} from "../charts-data"
import Bench from "./bench"


// TODO Move CURRENT_COMMIT_SHA and LAST_UPDATED_ON in store

const App = ({initialWidth}) => (
  <Bench
    charts={chartsData}
    currentCommit={CURRENT_COMMIT_SHA}
    initialWidth={initialWidth}
    lastUpdatedOn={LAST_UPDATED_ON}
  />
)


export default App
