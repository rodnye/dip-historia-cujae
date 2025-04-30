import { Route, Switch } from 'wouter';
import { HomePage } from './components/pages/HomePage';
import { ArticlePage } from './components/pages/ArticlePage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { SearchPage } from './components/pages/SearchPage';
import { AuthorsPage } from './components/pages/AuthorsPage';
import { AboutPage } from './components/pages/AboutPage';

function App() {
  return (
    // only support mobile (max-w-xl)
    <div className="flex h-full flex-col items-center bg-body font-serrat text-body-content">
      <div className="flex h-full w-full max-w-xl flex-col overflow-x-scroll">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/articles/:articleId" component={ArticlePage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/authors" component={AuthorsPage} />
          <Route path="/about" component={AboutPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
