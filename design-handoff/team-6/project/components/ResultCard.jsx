// ResultCard.jsx — editorial card with big rank, name, pct, sparkline-style dim bars.
function ResultCard({ result, rank, isSelected, isHovered, onHover, onUnhover, onClick, onToggleSelect, faded }) {
  const { name, score, data, dims, bestFor } = result;
  const color = window.scoreColor(score);
  const band = score > 75 ? 'Strong match' : score >= 50 ? 'Maybe' : 'Stretch';

  const dimOrder = ['Rent fit', 'Safety', 'Lifestyle', 'Parking', 'Commute'];
  const dimEntries = dimOrder.filter(k => k in dims).map(k => [k, dims[k]]);

  return (
    <div
      className={"nm-card" + (isSelected ? ' is-selected' : '') + (isHovered ? ' is-hovered' : '')}
      data-rank-style={faded ? 'dim' : 'normal'}
      onMouseEnter={onHover}
      onMouseLeave={onUnhover}
      onClick={onClick}
    >
      <div className="nm-rank">
        <span className="nm-rank-prefix">No.</span>
        <span>{String(rank).padStart(2, '0')}</span>
      </div>

      <div className="nm-body">
        <div className="nm-name">{name}</div>
        <div className="nm-bestfor">Best for <strong>{bestFor}</strong></div>
        <div className="nm-pills">
          <div className="nm-pill">Rent <strong>${data.avg_rent.toLocaleString()}</strong></div>
          <div className="nm-pill">Crime <strong>{window.crimeLabel(data.crime_rate)}</strong></div>
          <div className="nm-pill">Transit <strong>{data.transit_score}</strong></div>
          <div className="nm-pill">Walk <strong>{data.walkability}</strong></div>
          <div className="nm-pill">Parks <strong>{data.parks_nearby}</strong></div>
        </div>

        <div className="nm-dims">
          {dimEntries.map(([label, val]) => (
            <div className="nm-dim" key={label}>
              <span className="nm-dim-label">{label}</span>
              <div className="nm-dim-track">
                <div className="nm-dim-fill" style={{ width: `${Math.round(val)}%`, background: color }} />
              </div>
              <span className="nm-dim-val">{Math.round(val)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="nm-pct-col">
        <div className="nm-pct" style={{ color }}>
          {score}<span className="nm-pct-sym">%</span>
        </div>
        <div className="nm-pct-band" style={{ color }}>{band}</div>
      </div>

      <button
        className="nm-select-box"
        onClick={(e) => { e.stopPropagation(); onToggleSelect(); }}
        aria-label={isSelected ? 'Deselect' : 'Select for compare'}
      >
        {isSelected ? '✓' : ''}
      </button>
    </div>
  );
}
window.ResultCard = ResultCard;
