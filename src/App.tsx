import Form from './components/form/form';
import { Header } from './components/header';
import Table from './components/table';
import ThemeToggle from './components/theme-toggle';

export default function App() {
  return (
    <div className="app-layout">
      <ThemeToggle />
      <Header />
      <div className="main-content">
        <Form />
        <Table />
      </div>
    </div>
  );
}
