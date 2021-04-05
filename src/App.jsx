import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import MyBackButton from './components/BackButton';
import HomeButton from './components/HomeButton';
import { Container } from './components/Layout';
import { ThemeToggleButton } from './components/ThemeToggleButton';
import { ThemeProvider } from './contexts/theme';

import { HomePage } from './pages/Home';
import { MoviePage } from './pages/Movie';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Container direction="horizontal" lastRight floaty>
            <HomeButton />
            <Switch>
              <Route exact path="/" />
              <Route path="/">
                <MyBackButton />
              </Route>
            </Switch>
            <ThemeToggleButton />
          </Container>
          <Container direction="vertical">
            <Switch>
              <Route exact path="/movie/:id" component={MoviePage} />
              <Route exact path="/" component={HomePage} />
              <Route path="/">
                <h1>404</h1>
              </Route>
            </Switch>
          </Container>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
