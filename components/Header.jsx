// Header.jsx — slim top brand band
function Header() {
  const dateStr = new Date().toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  });
  return (
    <div className="nm-band">
      <div className="nm-band-mark">
        <span className="nm-band-dot"></span>
        <span>SF Neighborhood Matcher</span>
      </div>
      <div className="nm-band-nav">
        <a href="#" className="active">Matcher</a>
      </div>
      <div className="nm-band-meta">Vol. 01 · Issue 04 · {dateStr}</div>
    </div>
  );
}
window.Header = Header;
