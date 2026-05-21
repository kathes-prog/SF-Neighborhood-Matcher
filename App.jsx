// App.jsx — main composer for the editorial Matcher recreation.
const { useState, useMemo, useEffect } = React;

const DEFAULT_PREFS = {
  maxRent: 3000,
  maxCommute: 20,
  workLocation: 'remote',
  hasCar: false,
};
const DEFAULT_LIFESTYLE = Object.fromEntries(window.LIFESTYLE_CATS.map(c => [c.key, 0]));

// Tweakable visual defaults — persisted via host protocol.
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#1D9E75",
  "density": "regular",
  "showAll": false,
  "rankStyle": "editorial"
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = [
  '#1D9E75',  // brand green (default)
  '#1F4FB0',  // civic blue
  '#B5331E',  // ink red
  '#0F1B2D',  // graphite
];

function App() {
  const [tweak, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);
  const [lifestyle, setLifestyle] = useState(DEFAULT_LIFESTYLE);
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState([]);
  const [detailName, setDetailName] = useState(null);
  const [compareOpen, setCompareOpen] = useState(false);

  // Live scoring — recompute on every state change. 15 entries is nothing.
  const ranked = useMemo(
    () => window.scoreNeighborhoods(prefs, window.NEIGHBORHOOD_DATA, lifestyle),
    [prefs, lifestyle]
  );

  // Apply accent globally.
  useEffect(() => {
    const dark = colorMix(tweak.accent, 0.82);
    document.documentElement.style.setProperty('--accent', tweak.accent);
    document.documentElement.style.setProperty('--accent-dark', dark);
    document.documentElement.style.setProperty('--accent-tint', colorMix(tweak.accent, 1, true));
    document.documentElement.style.setProperty('--accent-wash', colorMix(tweak.accent, 1.05, true, 0.94));
  }, [tweak.accent]);

  // Density → rail width.
  useEffect(() => {
    const r = tweak.density === 'compact' ? '290px' : tweak.density === 'comfy' ? '380px' : '320px';
    document.documentElement.style.setProperty('--rail', r);
  }, [tweak.density]);

  const top = useMemo(() => {
    const n = tweak.showAll ? ranked.length : 5;
    return ranked.slice(0, n);
  }, [ranked, tweak.showAll]);

  const reset = () => {
    setPrefs(DEFAULT_PREFS);
    setLifestyle(DEFAULT_LIFESTYLE);
  };

  const toggleSelect = (name) => {
    setSelected(s => {
      if (s.includes(name)) return s.filter(x => x !== name);
      if (s.length >= 3) return [...s.slice(1), name];
      return [...s, name];
    });
  };
  const clearSelected = () => setSelected([]);

  const detailResult = detailName ? ranked.find(r => r.name === detailName) : null;
  const topMatch = ranked[0];
  const strongCount = ranked.filter(r => r.score > 75).length;
  const maybeCount = ranked.filter(r => r.score >= 50 && r.score <= 75).length;

  // Active priorities for the headline.
  const activePri = window.LIFESTYLE_CATS.filter(c => lifestyle[c.key] > 0);
  const headline = buildHeadline(prefs, activePri, topMatch);

  return (
    <div>
      <Header />
      <div className="nm-shell">
        <BriefPanel
          prefs={prefs}
          lifestyle={lifestyle}
          setPrefs={setPrefs}
          setLifestyle={setLifestyle}
          onReset={reset}
        />

        <main className="nm-main">
          <div className="nm-top">
            <div className="nm-top-left">
              <div className="nm-top-eyebrow">Your match · live</div>
              <h1 className="nm-top-h1">{headline}</h1>
              <div className="nm-top-meta">
                <span><span className="dot" style={{background: 'var(--score-good)'}}></span><strong>{strongCount}</strong> strong matches</span>
                <span><span className="dot" style={{background: 'var(--score-mid)'}}></span><strong>{maybeCount}</strong> maybes</span>
                <span><span className="dot" style={{background: 'var(--score-bad)'}}></span><strong>{15 - strongCount - maybeCount}</strong> stretch</span>
                <span>Budget <strong>${prefs.maxRent.toLocaleString()}</strong>/mo</span>
              </div>
            </div>
            <div className="nm-top-map">
              <div className="nm-map-overlay">
                <span>15 SF Neighborhoods</span>
                <span>Live</span>
              </div>
              <div className="nm-map-legend">
                <span><i style={{background: 'var(--score-good)'}}></i>&gt;75</span>
                <span><i style={{background: 'var(--score-mid)'}}></i>50–75</span>
                <span><i style={{background: 'var(--score-bad)'}}></i>&lt;50</span>
              </div>
              <MapPanel
                ranked={ranked}
                hoveredName={hovered}
                selectedNames={selected}
                onMarkerClick={(n) => setDetailName(n)}
              />
            </div>
          </div>

          <div className="nm-results-bar">
            <span>Ranking — {tweak.showAll ? 'all 15' : 'top 5'} of 15</span>
            <div className="nm-results-bar-actions">
              <button
                className="nm-link"
                onClick={() => setTweak('showAll', !tweak.showAll)}
              >{tweak.showAll ? 'Show top 5 only' : 'Show all 15 →'}</button>
              <button
                className={"nm-link" + (selected.length < 2 ? ' disabled' : ' primary')}
                onClick={() => selected.length >= 2 && setCompareOpen(true)}
              >Compare {selected.length || ''} →</button>
            </div>
          </div>

          <div className="nm-results-list">
            {top.map((r, i) => (
              <ResultCard
                key={r.name}
                result={r}
                rank={i + 1}
                isSelected={selected.includes(r.name)}
                isHovered={hovered === r.name}
                onHover={() => setHovered(r.name)}
                onUnhover={() => setHovered(null)}
                onClick={() => setDetailName(r.name)}
                onToggleSelect={() => toggleSelect(r.name)}
              />
            ))}
          </div>

          <div style={{padding: '2rem 2.5rem 6rem', fontSize: '11px', color: 'var(--fg-mute)', letterSpacing: '0.08em', textTransform: 'uppercase'}}>
            End of ranking · Scores derived from {window.LIFESTYLE_CATS.length} lifestyle dimensions + 4 brief inputs · Data sourced from <em style={{fontStyle: 'normal', textDecoration: 'underline'}}>neighborhoods.json</em>
          </div>
        </main>
      </div>

      {/* Compare bar (selected ≥ 1) */}
      <div className={"nm-compare-bar" + (selected.length > 0 ? ' is-open' : '')}>
        <div className="nm-compare-bar-left">
          <span>Compare · {selected.length}/3</span>
          <div className="nm-compare-chips">
            {selected.map(n => (
              <span className="nm-compare-chip" key={n}>
                {n}
                <button onClick={()=>toggleSelect(n)} aria-label={`Remove ${n}`}>✕</button>
              </span>
            ))}
          </div>
        </div>
        <div style={{display: 'flex', gap: '0.5rem'}}>
          <button className="nm-compare-clear" onClick={clearSelected}>Clear</button>
          <button
            className="nm-compare-action"
            disabled={selected.length < 2}
            style={{opacity: selected.length < 2 ? 0.5 : 1, cursor: selected.length < 2 ? 'not-allowed' : 'pointer'}}
            onClick={() => selected.length >= 2 && setCompareOpen(true)}
          >Open compare →</button>
        </div>
      </div>

      <DetailSheet
        open={!!detailName}
        result={detailResult}
        ranked={ranked}
        onClose={() => setDetailName(null)}
        onPick={(n) => setDetailName(n)}
      />
      <CompareSheet
        open={compareOpen}
        ranked={ranked}
        picks={selected}
        onClose={() => setCompareOpen(false)}
      />

      <TweaksPanel>
        <TweakSection label="Visual" />
        <TweakColor label="Accent" value={tweak.accent}
          options={ACCENT_OPTIONS}
          onChange={(v)=>setTweak('accent', v)} />
        <TweakRadio label="Density" value={tweak.density}
          options={['compact', 'regular', 'comfy']}
          onChange={(v)=>setTweak('density', v)} />
        <TweakSection label="Results" />
        <TweakToggle label="Show all 15" value={tweak.showAll}
          onChange={(v)=>setTweak('showAll', v)} />
      </TweaksPanel>
    </div>
  );
}

// — helpers —
function buildHeadline(prefs, activePri, top) {
  const rent = `$${(prefs.maxRent).toLocaleString()}/mo`;
  if (!top) return "Building your ranking…";
  if (activePri.length === 0) {
    return <>You can live in <em>{top.name}</em> for {rent} or less.</>;
  }
  const pri = activePri.slice(0, 2).map(c => c.label.split(' ')[0].toLowerCase()).join(' & ');
  return <>For {rent} and a love of <em>{pri}</em>, go <em>{top.name}</em>.</>;
}

// Mix accent with white (lighten) or black (darken). amount > 1 means more white.
function colorMix(hex, amount, lighten = false, mix = 0.85) {
  const h = hex.replace('#','');
  const r = parseInt(h.slice(0,2),16);
  const g = parseInt(h.slice(2,4),16);
  const b = parseInt(h.slice(4,6),16);
  if (lighten) {
    // wash: blend with white
    const wMix = mix; // amount of white
    return `rgb(${Math.round(r + (255-r)*wMix)}, ${Math.round(g + (255-g)*wMix)}, ${Math.round(b + (255-b)*wMix)})`;
  }
  return `rgb(${Math.round(r*amount)}, ${Math.round(g*amount)}, ${Math.round(b*amount)})`;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
