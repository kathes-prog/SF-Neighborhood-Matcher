// CompareSheet.jsx — side-by-side comparison of 2-3 picks.
function CompareSheet({ open, ranked, picks, onClose }) {
  const items = (picks || []).map(name => ranked.find(r => r.name === name)).filter(Boolean);

  const rows = [
    {
      key: 'score', label: 'Match score', kind: 'score',
      get: (r) => r.score, fmt: (v) => `${v}%`,
    },
    {
      key: 'rent', label: 'Median rent', kind: 'low',
      get: (r) => r.data.avg_rent, fmt: (v) => `$${v.toLocaleString()}/mo`,
    },
    {
      key: 'crime', label: 'Crime', kind: 'low',
      get: (r) => r.data.crime_rate, fmt: (v) => `${window.crimeLabel(v)} (${v})`,
    },
    {
      key: 'walk', label: 'Walkability', kind: 'high',
      get: (r) => r.data.walkability, fmt: (v) => `${v}/100`,
    },
    {
      key: 'transit', label: 'Transit', kind: 'high',
      get: (r) => r.data.transit_score, fmt: (v) => `${v}/100`,
    },
    {
      key: 'night', label: 'Nightlife', kind: 'high',
      get: (r) => r.data.nightlife_density, fmt: (v) => `${v}/100`,
    },
    {
      key: 'parks', label: 'Parks nearby', kind: 'high',
      get: (r) => r.data.parks_nearby, fmt: (v) => `${v}`,
    },
    {
      key: 'noise', label: 'Noise', kind: 'low',
      get: (r) => r.data.noise_complaints, fmt: (v) => v < 25 ? `Quiet (${v})` : v < 60 ? `Mid (${v})` : `Loud (${v})`,
    },
    {
      key: 'parking', label: 'Parking ease', kind: 'low',
      get: (r) => r.data.parking_difficulty, fmt: (v) => v < 40 ? `Easy (${v})` : v < 70 ? `Mid (${v})` : `Hard (${v})`,
    },
    {
      key: 'bestfor', label: 'Best for', kind: 'text',
      get: (r) => r.bestFor, fmt: (v) => v,
    },
  ];

  const bestIdx = (row) => {
    if (row.kind === 'text') return -1;
    const vals = items.map(row.get);
    if (vals.length < 2) return -1;
    const target = row.kind === 'high' || row.kind === 'score' ? Math.max(...vals) : Math.min(...vals);
    return vals.indexOf(target);
  };
  const worstIdx = (row) => {
    if (row.kind === 'text' || items.length < 2) return -1;
    const vals = items.map(row.get);
    const target = row.kind === 'high' || row.kind === 'score' ? Math.min(...vals) : Math.max(...vals);
    return vals.indexOf(target);
  };

  return (
    <div className={"nm-overlay" + (open ? ' is-open' : '')} onClick={onClose}>
      <div className="nm-sheet nm-sheet--compare" onClick={(e)=>e.stopPropagation()}>
        <div className="nm-sheet-band">
          <span>Compare · {items.length} neighborhoods</span>
          <button className="nm-sheet-close" onClick={onClose}>Close ✕</button>
        </div>

        <div className="nm-cmp-grid">
          {items.map(it => {
            const c = window.scoreColor(it.score);
            const rank = ranked.findIndex(r => r.name === it.name) + 1;
            return (
              <div className="nm-cmp-col" key={it.name}>
                <div style={{fontSize: '10.5px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--fg-mute)'}}>
                  No. {String(rank).padStart(2,'0')}
                </div>
                <div className="nm-name">{it.name}</div>
                <div className="nm-pct" style={{color: c, marginTop: '0.2rem'}}>
                  {it.score}<span className="nm-pct-sym">%</span>
                </div>
                <div className="nm-bestfor">Best for <strong>{it.bestFor}</strong></div>
              </div>
            );
          })}
        </div>

        <div className="nm-cmp-rows">
          <div className="nm-cmp-row is-header">
            <div className="nm-cmp-head">Metric</div>
            {items.map(it => <div className="nm-cmp-head" key={it.name}>{it.name}</div>)}
          </div>
          {rows.map(row => {
            const bIdx = bestIdx(row);
            const wIdx = worstIdx(row);
            return (
              <div className="nm-cmp-row is-row" key={row.key}>
                <div className="nm-cmp-cell"
                  style={{fontWeight: 700, color: 'var(--fg-3)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase'}}>
                  {row.label}
                </div>
                {items.map((it, i) => (
                  <div
                    className={"nm-cmp-cell" + (i === bIdx ? ' is-best' : '') + (i === wIdx ? ' is-worst' : '')}
                    key={it.name}
                  >
                    <span className="nm-cmp-val">{row.fmt(row.get(it))}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <div style={{padding: '1.5rem 1.5rem 3rem', fontSize: 'var(--t-xs)', color: 'var(--fg-mute)'}}>
          ▲ marks the strongest pick on each row. Comparisons use the same scoring weights derived from your brief.
        </div>
      </div>
    </div>
  );
}
window.CompareSheet = CompareSheet;
