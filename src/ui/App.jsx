import { HashRouter } from 'react-router-dom';
//con Electron se usa HashRouter porque es una app
//en una app web se usaría BrowserRouter
import AppRouter from './routes/AppRouter.jsx';

function App() {
  return (
    <div> 
      <HashRouter
        future={{ /* esta sección es para solucionar algunas advertencias de react-router */
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      > 
        <AppRouter/>
      </HashRouter>
    </div>
  )
}

export default App;
