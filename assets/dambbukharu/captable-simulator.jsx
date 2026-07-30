import { useState, useMemo } from "react";

/* ────────────────────────────────────────────────
   담뿍 법인 캡테이블 시뮬레이터
   설립 → 벤처인증/TIPS → 시드 → 시리즈 A
   ──────────────────────────────────────────────── */

const INK = "#161B2E";
const PAPER = "#F5F3EF";
const CARD = "#FFFFFF";
const LINE = "#DDD9D1";
const MUTED = "#7A7568";

const HOLDERS = {
  kim: { name: "김지창", role: "대표", color: "#2C3E77" },
  gong: { name: "공경섭", role: "CTO", color: "#1E7A6F" },
  parent: { name: "모법인", role: "식자재쿡", color: "#8A6BA8" },
  esop: { name: "ESOP", role: "미행사 풀", color: "#C98A2E" },
  tips: { name: "TIPS 운영사", role: "AC", color: "#B5542E" },
  seed: { name: "시드 투자자", role: "", color: "#5E7387" },
  seriesA: { name: "시리즈 A", role: "", color: "#39404E" },
};

const won = (n) => {
  if (!isFinite(n) || n === 0) return "—";
  const eok = n / 1e8;
  if (Math.abs(eok) >= 1) return eok.toFixed(2) + "억";
  return Math.round(n / 1e4).toLocaleString() + "만";
};
const pct = (n) => (n * 100).toFixed(2) + "%";

function Field({ label, value, onChange, suffix, step = 1, min = 0 }) {
  return (
    <label style={{ display: "block", marginBottom: 10 }}>
      <div style={{ fontSize: 11, color: MUTED, marginBottom: 4, letterSpacing: "0.02em" }}>
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <input
          type="number"
          value={value}
          min={min}
          step={step}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          style={{
            width: "100%", padding: "7px 9px", border: `1px solid ${LINE}`,
            borderRadius: 4, fontSize: 14, color: INK, background: "#FCFBF9",
            fontVariantNumeric: "tabular-nums", fontFamily: "inherit",
          }}
        />
        <span style={{ fontSize: 12, color: MUTED, whiteSpace: "nowrap" }}>{suffix}</span>
      </div>
    </label>
  );
}

function Slider({ label, value, onChange, max = 100 }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
        <span style={{ color: MUTED }}>{label}</span>
        <span style={{ color: INK, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
          {value.toFixed(1)}%
        </span>
      </div>
      <input
        type="range" min={0} max={max} step={0.5} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ width: "100%", accentColor: INK }}
      />
    </div>
  );
}

function Ribbon({ rows, total }) {
  return (
    <div style={{ display: "flex", height: 34, borderRadius: 3, overflow: "hidden", border: `1px solid ${LINE}` }}>
      {rows.filter((r) => r.shares > 0).map((r) => {
        const share = r.shares / total;
        return (
          <div
            key={r.key}
            title={`${r.name} ${pct(share)}`}
            style={{
              width: `${share * 100}%`, background: r.color,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 10, fontWeight: 600, overflow: "hidden",
            }}
          >
            {share > 0.09 ? (share * 100).toFixed(0) + "%" : ""}
          </div>
        );
      })}
    </div>
  );
}

export default function CapTableSimulator() {
  // ── 설립 ──
  const [founderShares, setFounderShares] = useState(1000000); // 총 발행주식
  const [parVal, setParVal] = useState(100); // 액면가
  const [kimPct, setKimPct] = useState(58);
  const [gongPct, setGongPct] = useState(22);
  const [parentPct, setParentPct] = useState(10);
  // ESOP = 나머지

  // ── 라운드 ──
  const [tipsOn, setTipsOn] = useState(true);
  const [tipsAmt, setTipsAmt] = useState(2); // 억
  const [tipsPre, setTipsPre] = useState(20); // 억

  const [seedOn, setSeedOn] = useState(true);
  const [seedAmt, setSeedAmt] = useState(10);
  const [seedPre, setSeedPre] = useState(60);
  const [seedEsopTopUp, setSeedEsopTopUp] = useState(5); // 라운드 직전 ESOP 확충 목표 %

  const [aOn, setAOn] = useState(true);
  const [aAmt, setAAmt] = useState(40);
  const [aPre, setAPre] = useState(200);
  const [aEsopTopUp, setAEsopTopUp] = useState(3);

  // ── 스톡옵션 개별 배분 ──
  const [grants, setGrants] = useState({ kwon: 1.2, minsu: 1.5, junhyuk: 0.8 });

  const esopPct = Math.max(0, 100 - kimPct - gongPct - parentPct);

  const sim = useMemo(() => {
    const base = founderShares;
    let cap = {
      kim: (base * kimPct) / 100,
      gong: (base * gongPct) / 100,
      parent: (base * parentPct) / 100,
      esop: (base * esopPct) / 100,
      tips: 0, seed: 0, seriesA: 0,
    };
    const stages = [];
    const totalOf = (c) => Object.values(c).reduce((a, b) => a + b, 0);

    stages.push({ label: "설립", cap: { ...cap }, total: totalOf(cap), post: 0, price: parVal });

    const runRound = (label, key, amtEok, preEok, esopTarget) => {
      const pre = preEok * 1e8;
      const amt = amtEok * 1e8;
      const post = pre + amt;

      // 1) 라운드 직전 ESOP 확충 (pre-money, 기존 주주 희석)
      if (esopTarget > 0) {
        const cur = totalOf(cap);
        const targetPostRoundEsop = esopTarget / 100;
        // post 기준 ESOP 목표 → pre 기준으로 환산
        const newInvFrac = amt / post;
        const need = targetPostRoundEsop / (1 - newInvFrac);
        const curEsopFrac = cap.esop / cur;
        if (need > curEsopFrac) {
          const addl = (cur * (need - curEsopFrac)) / (1 - need);
          cap.esop += addl;
        }
      }

      // 2) 신주 발행
      const preShares = totalOf(cap);
      const pricePerShare = pre / preShares;
      const newShares = amt / pricePerShare;
      cap[key] += newShares;

      stages.push({
        label, cap: { ...cap }, total: totalOf(cap),
        post, price: pricePerShare, invested: amt,
      });
    };

    if (tipsOn) runRound("TIPS 선투자", "tips", tipsAmt, tipsPre, 0);
    if (seedOn) runRound("시드", "seed", seedAmt, seedPre, seedEsopTopUp);
    if (aOn) runRound("시리즈 A", "seriesA", aAmt, aPre, aEsopTopUp);

    return stages;
  }, [founderShares, parVal, kimPct, gongPct, parentPct, esopPct,
      tipsOn, tipsAmt, tipsPre, seedOn, seedAmt, seedPre, seedEsopTopUp,
      aOn, aAmt, aPre, aEsopTopUp]);

  const last = sim[sim.length - 1];
  const finalPost = last.post || founderShares * parVal;
  const finalPrice = last.price;

  const rowsOf = (stage) =>
    Object.keys(HOLDERS).map((k) => ({
      key: k, ...HOLDERS[k], shares: stage.cap[k],
    }));

  const grantTotal = grants.kwon + grants.minsu + grants.junhyuk;
  const esopFinalPct = last.cap.esop / last.total;

  return (
    <div style={{
      background: PAPER, minHeight: "100vh", padding: "28px 20px",
      fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, 'Malgun Gothic', sans-serif",
      color: INK,
    }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 26, borderBottom: `2px solid ${INK}`, paddingBottom: 14 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.14em", color: MUTED, marginBottom: 6 }}>
            담뿍 · 신설 개발법인
          </div>
          <h1 style={{ fontSize: 30, fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>
            캡테이블 · 희석 시뮬레이터
          </h1>
          <p style={{ fontSize: 13, color: MUTED, margin: "8px 0 0" }}>
            설립 지분과 라운드 조건을 바꿔가며 각 주주의 최종 지분율과 가치를 확인합니다.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(280px, 340px) 1fr", gap: 22, alignItems: "start" }}>

          {/* ── 좌: 입력 ── */}
          <div>
            <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 6, padding: 18, marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>설립 시점</div>
              <Field label="총 발행주식수" value={founderShares} onChange={setFounderShares} suffix="주" step={10000} />
              <Field label="액면가" value={parVal} onChange={setParVal} suffix="원" step={100} />
              <div style={{ height: 1, background: LINE, margin: "14px 0" }} />
              <Slider label="김지창 (대표)" value={kimPct} onChange={setKimPct} />
              <Slider label="공경섭 (CTO)" value={gongPct} onChange={setGongPct} max={45} />
              <Slider label="모법인 (식자재쿡)" value={parentPct} onChange={setParentPct} max={40} />
              <div style={{
                display: "flex", justifyContent: "space-between", fontSize: 12,
                padding: "9px 11px", background: "#FDF6E7", borderRadius: 4,
                border: `1px solid ${esopPct < 8 ? "#D9A441" : "#EBDFC4"}`,
              }}>
                <span style={{ color: MUTED }}>ESOP 초기 풀</span>
                <span style={{ fontWeight: 700, color: esopPct < 8 ? "#A9701C" : INK }}>
                  {esopPct.toFixed(1)}%
                </span>
              </div>
              {esopPct < 8 && (
                <div style={{ fontSize: 11, color: "#A9701C", marginTop: 6, lineHeight: 1.5 }}>
                  초기 ESOP이 8% 미만이면 시드 단계에서 투자자가 확충을 요구합니다.
                </div>
              )}
            </div>

            {[
              { on: tipsOn, setOn: setTipsOn, title: "TIPS 선투자", amt: tipsAmt, setAmt: setTipsAmt, pre: tipsPre, setPre: setTipsPre, top: null },
              { on: seedOn, setOn: setSeedOn, title: "시드", amt: seedAmt, setAmt: setSeedAmt, pre: seedPre, setPre: setSeedPre, top: seedEsopTopUp, setTop: setSeedEsopTopUp },
              { on: aOn, setOn: setAOn, title: "시리즈 A", amt: aAmt, setAmt: setAAmt, pre: aPre, setPre: setAPre, top: aEsopTopUp, setTop: setAEsopTopUp },
            ].map((r) => (
              <div key={r.title} style={{
                background: CARD, border: `1px solid ${LINE}`, borderRadius: 6,
                padding: 18, marginBottom: 14, opacity: r.on ? 1 : 0.5,
              }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: r.on ? 14 : 0, cursor: "pointer" }}>
                  <input type="checkbox" checked={r.on} onChange={(e) => r.setOn(e.target.checked)} style={{ accentColor: INK }} />
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{r.title}</span>
                </label>
                {r.on && (
                  <>
                    <Field label="투자 유치 금액" value={r.amt} onChange={r.setAmt} suffix="억" step={1} />
                    <Field label="프리 밸류에이션" value={r.pre} onChange={r.setPre} suffix="억" step={5} />
                    {r.top !== null && (
                      <Field label="라운드 직전 ESOP 확충 목표" value={r.top} onChange={r.setTop} suffix="%" step={1} />
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          {/* ── 우: 결과 ── */}
          <div>
            {/* 요약 */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 18 }}>
              {[
                ["최종 포스트 밸류", won(finalPost)],
                ["주당 가격", finalPrice ? Math.round(finalPrice).toLocaleString() + "원" : "—"],
                ["대표 최종 지분", pct(last.cap.kim / last.total)],
                ["창업팀 합계", pct((last.cap.kim + last.cap.gong) / last.total)],
              ].map(([k, v]) => (
                <div key={k} style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 6, padding: "13px 15px" }}>
                  <div style={{ fontSize: 11, color: MUTED, marginBottom: 5 }}>{k}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>{v}</div>
                </div>
              ))}
            </div>

            {/* 라운드별 리본 */}
            <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 6, padding: 20, marginBottom: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>라운드별 지분 변화</div>
              {sim.map((s) => (
                <div key={s.label} style={{ marginBottom: 15 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 5 }}>
                    <span style={{ fontWeight: 700 }}>{s.label}</span>
                    <span style={{ color: MUTED, fontVariantNumeric: "tabular-nums" }}>
                      {s.post ? `포스트 ${won(s.post)} · 주당 ${Math.round(s.price).toLocaleString()}원` : `총 ${s.total.toLocaleString()}주`}
                    </span>
                  </div>
                  <Ribbon rows={rowsOf(s)} total={s.total} />
                </div>
              ))}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 16px", marginTop: 14, paddingTop: 12, borderTop: `1px solid ${LINE}` }}>
                {Object.entries(HOLDERS).map(([k, h]) => (
                  <div key={k} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: MUTED }}>
                    <span style={{ width: 9, height: 9, borderRadius: 2, background: h.color }} />
                    {h.name}
                  </div>
                ))}
              </div>
            </div>

            {/* 최종 테이블 */}
            <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 6, padding: 20, marginBottom: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>최종 캡테이블</div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: `1.5px solid ${INK}` }}>
                    {["주주", "주식수", "지분율", "평가가치"].map((h, i) => (
                      <th key={h} style={{ textAlign: i === 0 ? "left" : "right", padding: "0 0 8px", fontSize: 11, color: MUTED, fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rowsOf(last).filter((r) => r.shares > 0).map((r) => {
                    const p = r.shares / last.total;
                    return (
                      <tr key={r.key} style={{ borderBottom: `1px solid ${LINE}` }}>
                        <td style={{ padding: "9px 0" }}>
                          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: r.color, marginRight: 7 }} />
                          <strong>{r.name}</strong>
                          {r.role && <span style={{ color: MUTED, fontSize: 11, marginLeft: 5 }}>{r.role}</span>}
                        </td>
                        <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums", color: MUTED }}>{Math.round(r.shares).toLocaleString()}</td>
                        <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums", fontWeight: 700 }}>{pct(p)}</td>
                        <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{won(finalPost * p)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* 스톡옵션 배분 */}
            <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 6, padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>스톡옵션 개별 배분</div>
              <div style={{ fontSize: 11, color: MUTED, marginBottom: 14 }}>
                설립 시점 지분율 기준 부여 · 행사가 액면가 가정 · 2년 재직 후 행사 가능
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: `1.5px solid ${INK}` }}>
                    {["대상자", "부여율", "주식수", "행사대금", "행사 시 평가액", "차익"].map((h, i) => (
                      <th key={h} style={{ textAlign: i === 0 ? "left" : "right", padding: "0 0 8px", fontSize: 11, color: MUTED, fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["kwon", "권선영", "프론트엔드"],
                    ["minsu", "김민수", "백엔드"],
                    ["junhyuk", "송준혁", "프론트엔드"],
                  ].map(([k, name, role]) => {
                    const g = grants[k];
                    const shares = (founderShares * g) / 100;
                    const cost = shares * parVal;
                    const value = shares * finalPrice;
                    return (
                      <tr key={k} style={{ borderBottom: `1px solid ${LINE}` }}>
                        <td style={{ padding: "9px 0" }}>
                          <strong>{name}</strong>
                          <span style={{ color: MUTED, fontSize: 11, marginLeft: 5 }}>{role}</span>
                        </td>
                        <td style={{ textAlign: "right", padding: "5px 0" }}>
                          <input
                            type="number" value={g} step={0.1} min={0}
                            onChange={(e) => setGrants({ ...grants, [k]: parseFloat(e.target.value) || 0 })}
                            style={{
                              width: 62, padding: "4px 6px", textAlign: "right", border: `1px solid ${LINE}`,
                              borderRadius: 3, fontSize: 13, fontVariantNumeric: "tabular-nums", fontFamily: "inherit",
                            }}
                          />
                          <span style={{ fontSize: 11, color: MUTED, marginLeft: 3 }}>%</span>
                        </td>
                        <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums", color: MUTED }}>{Math.round(shares).toLocaleString()}</td>
                        <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums", color: MUTED }}>{won(cost)}</td>
                        <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{won(value)}</td>
                        <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums", fontWeight: 700, color: "#1E7A6F" }}>{won(value - cost)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div style={{
                marginTop: 14, padding: "11px 13px", borderRadius: 4, fontSize: 12, lineHeight: 1.6,
                background: grantTotal > esopPct ? "#FBEDE8" : "#F1F5F2",
                border: `1px solid ${grantTotal > esopPct ? "#E0B6A6" : "#D5E0D8"}`,
              }}>
                {grantTotal > esopPct ? (
                  <>부여 합계 <strong>{grantTotal.toFixed(1)}%</strong>가 초기 ESOP 풀 <strong>{esopPct.toFixed(1)}%</strong>를 초과합니다. 풀을 늘리거나 부여율을 낮추십시오.</>
                ) : (
                  <>부여 합계 <strong>{grantTotal.toFixed(1)}%</strong> / 초기 풀 {esopPct.toFixed(1)}% · 잔여 <strong>{(esopPct - grantTotal).toFixed(1)}%</strong>는 후속 채용분입니다. 최종 미행사 풀은 {pct(esopFinalPct)}.</>
                )}
              </div>
            </div>

            <p style={{ fontSize: 11, color: MUTED, marginTop: 16, lineHeight: 1.6 }}>
              단순 희석 모델입니다. 상환전환우선주(RCPS)의 상환·전환조건, 청산우선권, 리픽싱 조항은 반영되어 있지 않습니다.
              실제 텀시트 검토 시에는 법무·회계 자문을 함께 받으십시오.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
