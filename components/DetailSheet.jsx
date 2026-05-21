// DetailSheet.jsx — fullscreen takeover for a single neighborhood.
function DetailSheet({ open, result, ranked, onClose, onPick }) {
  if (!result) return <div className={"nm-overlay" + (open ? ' is-open' : '')} onClick={onClose}><div className="nm-sheet" /></div>;
  const { name, score, data, dims, bestFor } = result;
  const color = window.scoreColor(score);
  const band = score > 75 ? 'Strong match' : score >= 50 ? 'Maybe' : 'Stretch';
  const rank = ranked.findIndex(r => r.name === name) + 1;

  // dim explanations
  const dimNotes = {
    'Rent fit':  `Median rent here is $${data.avg_rent.toLocaleString()} — ${data.avg_rent <= 3000 ? 'comfortably below' : data.avg_rent >= 3800 ? 'on the high side of' : 'within range of'} most budgets.`,
    'Safety':    `Crime index ${data.crime_rate}/100 — ${window.crimeLabel(data.crime_rate).toLowerCase()} relative to the city.`,
    'Lifestyle': `Balanced against your priorities: dining, parks, walkability, quiet, arts, fitness.`,
    'Parking':   `Parking difficulty ${data.parking_difficulty}/100 — ${data.parking_difficulty < 40 ? 'easy street parking' : data.parking_difficulty < 70 ? 'workable' : 'expect a hunt'}.`,
    'Commute':   `Estimated travel time vs. your stated max commute.`,
  };

  // peer comparisons — ±3 around this rank
  const lo = Math.max(0, rank - 4);
  const hi = Math.min(ranked.length, rank + 3);
  const peers = ranked.slice(lo, hi);

  return (
    <div className={"nm-overlay" + (open ? ' is-open' : '')} onClick={onClose}>
      <div className="nm-sheet" onClick={(e)=>e.stopPropagation()}>
        <div className="nm-sheet-band">
          <span>Neighborhood Profile · No. {String(rank).padStart(2, '0')} of {ranked.length}</span>
          <button className="nm-sheet-close" onClick={onClose}>Close ✕</button>
        </div>

        <div className="nm-detail-hero">
          <div className="nm-detail-info">
            <div className="nm-detail-rank">Ranked No. {String(rank).padStart(2, '0')}</div>
            <div className="nm-detail-name">{name}</div>
            <div className="nm-detail-bestfor">
              Best for <strong>{bestFor}</strong>
            </div>
            <div className="nm-detail-pct-row">
              <div className="nm-detail-pct" style={{color}}>
                {score}<span className="nm-pct-sym" style={{fontSize: '1.5rem'}}>%</span>
              </div>
              <div className="nm-detail-band" style={{color}}>{band}</div>
            </div>
          </div>
          <div className="nm-detail-map">
            <MapPanel
              ranked={ranked}
              hoveredName={name}
              selectedNames={[name]}
              height="100%"
              simple={false}
            />
          </div>
        </div>

        <div className="nm-detail-sections">

          {/* Why this rank */}
          <section>
            <div className="nm-section-h">Why this rank</div>
            <div className="nm-detail-dims">
              {Object.entries(dims).map(([label, val]) => (
                <div className="nm-detail-dim" key={label}>
                  <span className="nm-detail-dim-name">{label}</span>
                  <span className="nm-detail-dim-val">{Math.round(val)}<span className="nm-unit">/100</span></span>
                  <div className="nm-detail-dim-bar">
                    <div className="nm-detail-dim-fill" style={{width: `${Math.round(val)}%`, background: color}} />
                  </div>
                  <span className="nm-detail-dim-note">{dimNotes[label]}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Raw facts */}
          <section>
            <div className="nm-section-h">The data</div>
            <div className="nm-facts">
              <div className="nm-fact">
                <span className="nm-fact-label">Median rent</span>
                <span className="nm-fact-val">${data.avg_rent.toLocaleString()}</span>
                <span className="nm-fact-note">per month</span>
              </div>
              <div className="nm-fact">
                <span className="nm-fact-label">Walkability</span>
                <span className="nm-fact-val">{data.walkability}<span className="nm-unit">/100</span></span>
                <span className="nm-fact-note">{data.walkability > 85 ? 'very walkable' : data.walkability > 70 ? 'walkable' : 'car-friendly'}</span>
              </div>
              <div className="nm-fact">
                <span className="nm-fact-label">Transit</span>
                <span className="nm-fact-val">{data.transit_score}<span className="nm-unit">/100</span></span>
                <span className="nm-fact-note">{data.transit_score > 85 ? 'excellent' : data.transit_score > 70 ? 'good' : 'moderate'}</span>
              </div>
              <div className="nm-fact">
                <span className="nm-fact-label">Nightlife</span>
                <span className="nm-fact-val">{data.nightlife_density}<span className="nm-unit">/100</span></span>
                <span className="nm-fact-note">density index</span>
              </div>
              <div className="nm-fact">
                <span className="nm-fact-label">Parks nearby</span>
                <span className="nm-fact-val">{data.parks_nearby}</span>
                <span className="nm-fact-note">within 1 mi</span>
              </div>
              <div className="nm-fact">
                <span className="nm-fact-label">Crime</span>
                <span className="nm-fact-val">{window.crimeLabel(data.crime_rate)}</span>
                <span className="nm-fact-note">{data.crime_rate}/100 index</span>
              </div>
              <div className="nm-fact">
                <span className="nm-fact-label">Noise</span>
                <span className="nm-fact-val">{data.noise_complaints < 25 ? 'Quiet' : data.noise_complaints < 60 ? 'Mid' : 'Loud'}</span>
                <span className="nm-fact-note">{data.noise_complaints}/100 complaints</span>
              </div>
              <div className="nm-fact">
                <span className="nm-fact-label">Parking</span>
                <span className="nm-fact-val">{data.parking_difficulty < 40 ? 'Easy' : data.parking_difficulty < 70 ? 'Mid' : 'Hard'}</span>
                <span className="nm-fact-note">{data.parking_difficulty}/100 difficulty</span>
              </div>
            </div>
          </section>

          {/* Peers */}
          <section>
            <div className="nm-section-h">Nearby ranks</div>
            <div className="nm-peer-list">
              {peers.map((p, idx) => {
                const pRank = lo + idx + 1;
                const isThis = p.name === name;
                const pColor = window.scoreColor(p.score);
                return (
                  <div className="nm-peer" key={p.name}
                    style={{cursor: isThis ? 'default' : 'pointer', background: isThis ? 'var(--bg-results)' : 'transparent'}}
                    onClick={()=> !isThis && onPick(p.name)}>
                    <span className="nm-peer-rank">No. {String(pRank).padStart(2, '0')}</span>
                    <span className="nm-peer-name" style={isThis ? {color: 'var(--accent)'} : undefined}>
                      {p.name}{isThis ? ' ← you are here' : ''}
                    </span>
                    <span className="nm-peer-pct" style={{color: pColor}}>{p.score}%</span>
                  </div>
                );
              })}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
window.DetailSheet = DetailSheet;
