export default function ThemeToggle(){
    const savedTheme = localStorage.getItem('theme') || 'light';
    let mode = savedTheme === 'dark' ? '☀️' : '🌙';
    function handleThemeToggle(){
        const current = document.body.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        mode = next === 'dark' ? '☀️' : '🌙';
    }
    return (
        <div className="theme-toggle-row">
            <button className="theme-toggle" onClick={handleThemeToggle}>{mode}</button>
            
        </div>
    );
}