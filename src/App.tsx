import { Header } from "./components/header"
import ThemeToggle from "./components/theme-toggle"

export default function App(){
    return (
        <div className="app-layout">
            <ThemeToggle/>
            <Header/>
            <div className="main-content">
            </div>
        </div>
    );
}