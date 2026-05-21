// BriefPanel.jsx — live-updating form. No submit button — results recompute on change.
const { useState } = React;

function BriefPanel({ prefs, lifestyle, setPrefs, setLifestyle, onReset }) {
  const work = prefs.workLocation;
  const workOptions = ['remote', ...Object.keys(window.NEIGHBORHOOD_DATA)];

  const lifeState = (v) => v === 1 ? "Very" : v === 0.5 ? "Some" : v === 0 ? "—" : "—";
  const isOn = (v) => v > 0;

  return (
    <aside className="nm-rail">
      <div className="nm-rail-eyebrow">The Brief</div>
      <div className="nm-rail-title">Tell us who<br/>you are.</div>
      <div className="nm-rail-sub">Results update as you adjust. There's nothing to submit.</div>

      {/* Rent */}
      <div className="nm-field">
        <div className="nm-field-row">
          <span className="nm-field-label">Rent / mo</span>
          <span className="nm-field-value">${prefs.maxRent.toLocaleString()}</span>
        </div>
        <input type="range" className="nm-range" min="1500" max="6000" step="50"
          value={prefs.maxRent}
          onChange={(e)=>setPrefs(p=>({...p, maxRent: parseInt(e.target.value)}))} />
        <div className="nm-field-hint"><span>$1,500</span><span>$6,000</span></div>
      </div>

      {/* Commute */}
      <div className="nm-field">
        <div className="nm-field-row">
          <span className="nm-field-label">Max commute</span>
          <span className="nm-field-value">{prefs.maxCommute}<span className="nm-unit"> MIN</span></span>
        </div>
        <input type="range" className="nm-range" min="0" max="60" step="5"
          value={prefs.maxCommute}
          onChange={(e)=>setPrefs(p=>({...p, maxCommute: parseInt(e.target.value)}))}
          disabled={work === 'remote'}
          style={{opacity: work === 'remote' ? 0.35 : 1}} />
        <div className="nm-field-hint">
          <span>0 min</span>
          <span>{work === 'remote' ? 'N/A — Remote' : '60 min'}</span>
        </div>
      </div>

      {/* Work */}
      <div className="nm-field">
        <span className="nm-field-label">Work in</span>
        <select className="nm-select" value={work}
          onChange={(e)=>setPrefs(p=>({...p, workLocation: e.target.value}))}>
          <option value="remote">Remote / Work from home</option>
          {workOptions.filter(o => o !== 'remote').map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      {/* Car */}
      <div className="nm-field">
        <span className="nm-field-label">Car</span>
        <div className="nm-toggle">
          <button className={!prefs.hasCar ? 'on' : ''}
            onClick={()=>setPrefs(p=>({...p, hasCar: false}))}>No car</button>
          <button className={prefs.hasCar ? 'on' : ''}
            onClick={()=>setPrefs(p=>({...p, hasCar: true}))}>I own a car</button>
        </div>
      </div>

      {/* Lifestyle */}
      <div className="nm-field">
        <span className="nm-field-label" style={{marginBottom: '0.4rem'}}>Lifestyle priorities</span>
        <div className="nm-life-list">
          {window.LIFESTYLE_CATS.map(cat => (
            <div className="nm-life-item" key={cat.key}>
              <div className="nm-life-label">
                <span>{cat.label}</span>
                <span className={"nm-life-state" + (isOn(lifestyle[cat.key]) ? ' on' : '')}>
                  {lifeState(lifestyle[cat.key])}
                </span>
              </div>
              <div className="nm-life-track" role="radiogroup" aria-label={cat.label}>
                {[0, 0.5, 1].map((v, i) => (
                  <button
                    key={v}
                    data-i={i}
                    className={lifestyle[cat.key] === v ? 'on' : ''}
                    onClick={()=>setLifestyle(l=>({...l, [cat.key]: v}))}
                    aria-label={['Not important','Somewhat','Very important'][i]}
                    title={['Not important','Somewhat','Very important'][i]}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="nm-rail-footer">
        <span>15 neighborhoods · live</span>
        <button className="nm-reset-btn" onClick={onReset}>Reset →</button>
      </div>
    </aside>
  );
}
window.BriefPanel = BriefPanel;
