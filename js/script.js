/* ── i18n ── */
/* test updte */
const I18N = {
  zh: {
    hero_desc: '搖擺舞比賽 RP 計分工具，支援 Prelim 預選賽與 Final 決賽計算。',
    link_original: 'What is Relative Placement',
    link_intro: '看不懂搖擺舞比賽結果嗎？',
    tab_prelim: 'Prelim 預選',
    tab_final: 'Final 決賽',

    judge_count: '評審人數（建議奇數）',
    maybe_level: 'Maybe 層級（M1~M5）',
    y_count: '每位評審給幾個 Y',
    m_count: 'M{n} 數量',
    generate_table: '產生評分表',
    calc_prelim: '計算 Prelim 結果',
    judge_label: '評審 {n}',
    y_placeholder: '如: 1,2,3',
    m_placeholder: '如: 11,12',
    contestant_count: '參賽者人數',
    generate_final: '產生評分表',
    calc_final: '計算 Final 結果',
    contestant_label: '組合 {n}',

    result_prelim: 'Prelim 結果',
    result_final: 'Final 結果',
    col_contestant: '參賽者',
    col_rank: '名次',
    col_y: 'Y',
    copy_btn: '複製結果（貼至試算表）',
    copy_done: '已複製！',

    battle_title: 'Judge Battle 說明',
    battle_tied: '「{a}」與「{b}」在所有評分欄位完全一致，進行 Judge Battle。',
    battle_result: '{winner} 獲得 {winCount} 位評審支持，{loser} 獲得 {loseCount} 位評審支持，{winner} 排名較前。',
    battle_perfect_tie: '「{a}」與「{b}」Judge Battle 結果完全相同，需主評審裁決。',

    err_y_count: '評審 {j} 的 Y 數量應為 {n}，目前為 {actual}',
    err_m_count: '評審 {j} 的 M{m} 數量應為 {n}，目前為 {actual}',
    err_m_dup: '評審 {j} 的 M{m} 有與 Y 或其他 Maybe 重複的編號：{num}',
    err_empty: '評審 {j} 的參賽者「{c}」未填寫名次',
    err_range: '評審 {j} 的參賽者「{c}」名次超過範圍 (1~{n})，目前為 {val}',
    err_dup_rank: '評審 {j} 對「{list}」給了相同名次 {val}',
  },

  en: {
    hero_desc: 'RP Scoring tool for swing dance competitions — supports Prelim and Final calculation.',
    link_original: 'What is Relative Placement',
    link_intro: "Don't understand swing dance results?",
    tab_prelim: 'Prelim',
    tab_final: 'Final',

    judge_count: 'Number of Judges (odd recommended)',
    maybe_level: 'Maybe Level (M1~M5)',
    y_count: 'Y count per judge',
    m_count: 'M{n} count',
    generate_table: 'Generate Scoring Table',
    calc_prelim: 'Calculate Prelim Results',
    judge_label: 'Judge {n}',
    y_placeholder: 'e.g. 1,2,3',
    m_placeholder: 'e.g. 11,12',
    contestant_count: 'Number of Contestants',
    generate_final: 'Generate Scoring Table',
    calc_final: 'Calculate Final Results',
    contestant_label: 'Couple {n}',

    result_prelim: 'Prelim Results',
    result_final: 'Final Results',
    col_contestant: 'Contestant',
    col_rank: 'Rank',
    col_y: 'Y',
    copy_btn: 'Copy Results (paste to spreadsheet)',
    copy_done: 'Copied!',

    battle_title: 'Judge Battle Notes',
    battle_tied: '"{a}" and "{b}" are identical across all scoring columns, triggering a Judge Battle.',
    battle_result: '{winner} received {winCount} judge votes vs {loser} with {loseCount} — {winner} ranks higher.',
    battle_perfect_tie: '"{a}" and "{b}" are completely equal even in Judge Battle — head judge ruling required.',

    err_y_count: 'Judge {j}: Y count should be {n}, got {actual}',
    err_m_count: 'Judge {j}: M{m} count should be {n}, got {actual}',
    err_m_dup: 'Judge {j}: M{m} has duplicate number with Y or other Maybe: {num}',
    err_empty: 'Judge {j}: missing score for contestant "{c}"',
    err_range: 'Judge {j}: score for "{c}" out of range (1~{n}), got {val}',
    err_dup_rank: 'Judge {j}: duplicate rank {val} for "{list}"',
  },

  ko: {
    hero_desc: '스윙댄스 대회 RP 채점 도구 — 예선(Prelim) 및 결선(Final) 계산을 지원합니다.',
    link_original: '상대 배치 점수제란?',
    link_intro: '스윙댄스 대회 결과 이해하기',
    tab_prelim: '예선 (Prelim)',
    tab_final: '결선 (Final)',

    judge_count: '심사위원 수 (홀수 권장)',
    maybe_level: 'Maybe 레벨 (M1~M5)',
    y_count: '심사위원당 Y 수',
    m_count: 'M{n} 수',
    generate_table: '채점표 생성',
    calc_prelim: '예선 결과 계산',
    judge_label: '심사위원 {n}',
    y_placeholder: '예: 1,2,3',
    m_placeholder: '예: 11,12',
    contestant_count: '참가자 수',
    generate_final: '채점표 생성',
    calc_final: '결선 결과 계산',
    contestant_label: '커플 {n}',

    result_prelim: '예선 결과',
    result_final: '결선 결과',
    col_contestant: '참가자',
    col_rank: '순위',
    col_y: 'Y',
    copy_btn: '결과 복사 (스프레드시트에 붙여넣기)',
    copy_done: '복사됨!',

    battle_title: 'Judge Battle 설명',
    battle_tied: '「{a}」와 「{b}」의 모든 채점 항목이 동일하여 Judge Battle이 진행됩니다.',
    battle_result: '{winner}이(가) {winCount}명의 심사위원을 얻었고, {loser}은(는) {loseCount}명 — {winner}이(가) 높은 순위를 차지합니다.',
    battle_perfect_tie: '「{a}」와 「{b}」는 Judge Battle에서도 완전히 동일합니다 — 수석 심사위원 판정이 필요합니다.',

    err_y_count: '심사위원 {j}: Y 수는 {n}이어야 하는데 {actual}임',
    err_m_count: '심사위원 {j}: M{m} 수는 {n}이어야 하는데 {actual}임',
    err_m_dup: '심사위원 {j}: M{m}에 Y 또는 다른 Maybe와 중복된 번호 있음: {num}',
    err_empty: '심사위원 {j}: 참가자 "{c}" 점수 미입력',
    err_range: '심사위원 {j}: 참가자 "{c}" 순위가 범위(1~{n})를 벗어남, 현재 {val}',
    err_dup_rank: '심사위원 {j}: "{list}"에게 같은 순위 {val} 부여',
  }
};

/* ── State ── */
let lang = localStorage.getItem('rp_lang') || 'zh';
let mode = 'prelim';

/* ── Helpers ── */
function t(key, vars = {}) {
  let s = (I18N[lang] || I18N.zh)[key] || key;
  Object.entries(vars).forEach(([k, v]) => { s = s.replaceAll(`{${k}}`, v); });
  return s;
}

function applyI18n() {
  document.querySelector('.hero-desc').textContent = t('hero_desc');
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

function parseNums(str) {
  return str.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
}

/* ── Copy to clipboard (TSV) ── */
function copyTSV(headers, rows, btn) {
  const tsv = [headers, ...rows].map(row => row.join('\t')).join('\n');
  navigator.clipboard.writeText(tsv).then(() => {
    const orig = btn.textContent;
    btn.textContent = t('copy_done');
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 2000);
  });
}

/* ── Prelim ── */
function renderPrelimForm() {
  const area = document.getElementById('form-area');
  area.innerHTML = `
    <div class="form-row">
      <div class="form-group">
        <label>${t('judge_count')}</label>
        <input type="number" id="p-judge-count" min="1" max="15" value="5">
      </div>
      <div class="form-group">
        <label>${t('maybe_level')}</label>
        <select id="p-maybe-level">
          <option value="1">M1</option>
          <option value="2">M2</option>
          <option value="3">M3</option>
          <option value="4">M4</option>
          <option value="5">M5</option>
        </select>
      </div>
      <div class="form-group">
        <label>${t('y_count')}</label>
        <input type="number" id="p-y-count" min="1" max="50" value="5">
      </div>
    </div>
    <div class="maybe-counts-row" id="p-maybe-counts"></div>
    <button class="btn btn-primary" id="p-gen-btn">${t('generate_table')}</button>
    <div id="p-input-area"></div>
  `;

  function renderMaybeCounts() {
    const level = parseInt(document.getElementById('p-maybe-level').value, 10);
    let html = '';
    for (let i = 1; i <= level; i++) {
      html += `<div class="form-group">
        <label>${t('m_count', { n: i })}</label>
        <input type="number" class="p-m-count" data-m="${i}" min="0" max="50" value="2">
      </div>`;
    }
    document.getElementById('p-maybe-counts').innerHTML = html;
  }

  document.getElementById('p-maybe-level').onchange = renderMaybeCounts;
  renderMaybeCounts();
  document.getElementById('p-gen-btn').onclick = generatePrelimTable;
}

function generatePrelimTable() {
  const judgeCount = parseInt(document.getElementById('p-judge-count').value, 10);
  const maybeLevel = parseInt(document.getElementById('p-maybe-level').value, 10);

  let html = `<div class="section-divider"></div>
  <div class="input-table-wrapper">
  <table class="input-table">
    <thead><tr>
      <th>${t('col_contestant')}</th>
      <th>${t('col_y')}</th>`;
  for (let i = 1; i <= maybeLevel; i++) html += `<th>M${i}</th>`;
  html += '</tr></thead><tbody>';

  for (let ji = 0; ji < judgeCount; ji++) {
    html += `<tr>
      <td><input type="text" class="p-judge-name judge-name-input" data-j="${ji}" value="${t('judge_label', { n: ji + 1 })}"></td>
      <td><input type="text" class="p-y y-input" data-j="${ji}" placeholder="${t('y_placeholder')}"></td>`;
    for (let m = 1; m <= maybeLevel; m++) {
      html += `<td><input type="text" class="p-m m-input" data-j="${ji}" data-m="${m}" placeholder="${t('m_placeholder')}"></td>`;
    }
    html += '</tr>';
  }
  html += `</tbody></table></div>
  <div class="section-divider"></div>
  <button class="btn btn-primary" id="p-calc-btn">${t('calc_prelim')}</button>`;

  document.getElementById('p-input-area').innerHTML = html;

  document.getElementById('p-calc-btn').onclick = () => {
    const judgeNames = Array.from(document.querySelectorAll('.p-judge-name')).map(el => el.value.trim());
    const mCounts = Array.from(document.querySelectorAll('.p-m-count')).map(el => parseInt(el.value, 10));
    const yCount = parseInt(document.getElementById('p-y-count').value, 10);
    calcPrelim(judgeNames, maybeLevel, yCount, mCounts);
  };
}

function calcPrelim(judgeNames, maybeLevel, yCount, mCounts) {
  let errors = [];
  let judgeData = [];
  let allNumbers = new Set();

  judgeNames.forEach((jName, ji) => {
    const yStr = document.querySelector(`.p-y[data-j="${ji}"]`).value;
    const yArr = parseNums(yStr);
    if (yArr.length !== yCount) {
      errors.push(t('err_y_count', { j: jName, n: yCount, actual: yArr.length }));
    }

    let mArrs = [];
    let judgeSet = new Set(yArr);

    for (let m = 1; m <= maybeLevel; m++) {
      const mStr = document.querySelector(`.p-m[data-j="${ji}"][data-m="${m}"]`).value;
      const arr = parseNums(mStr);
      if (arr.length !== mCounts[m - 1]) {
        errors.push(t('err_m_count', { j: jName, m, n: mCounts[m - 1], actual: arr.length }));
      }
      for (const n of arr) {
        if (judgeSet.has(n)) {
          errors.push(t('err_m_dup', { j: jName, m, num: n }));
        }
        judgeSet.add(n);
      }
      mArrs.push(arr);
    }

    for (const n of yArr) allNumbers.add(n);
    for (const arr of mArrs) for (const n of arr) allNumbers.add(n);
    judgeData.push({ y: yArr, m: mArrs });
  });

  if (errors.length) {
    document.getElementById('result-area').innerHTML =
      `<div class="card"><div class="error-box">${errors.join('<br>')}</div></div>`;
    return;
  }

  const judgeCount = judgeNames.length;
  const overHalf = Math.floor(judgeCount / 2) + 1;
  const allContestants = Array.from(allNumbers).sort((a, b) => a - b);

  let stat = allContestants.map(num => {
    let row = { num, judges: [], y: 0, m: Array(maybeLevel).fill(0) };
    judgeData.forEach(jd => {
      let val = '';
      if (jd.y.includes(num)) { val = 'Y'; row.y++; }
      for (let m = 1; m <= maybeLevel; m++) {
        if (jd.m[m - 1].includes(num)) { val = `M${m}`; row.m[m - 1]++; }
      }
      row.judges.push(val);
    });
    row.cum = [];
    let sum = row.y;
    for (let i = 0; i < maybeLevel; i++) { sum += row.m[i]; row.cum.push(sum); }
    return row;
  });

  stat.sort((a, b) => {
    // levels[0]=Y, levels[1]=Y+M1, levels[2]=Y+M1+M2, ...
    const aLevels = [a.y, ...a.cum];
    const bLevels = [b.y, ...b.cum];

    // Find which level each contestant first achieves majority
    const aFirst = aLevels.findIndex(v => v >= overHalf);
    const bFirst = bLevels.findIndex(v => v >= overHalf);
    const aN = aFirst === -1 ? maybeLevel + 1 : aFirst;
    const bN = bFirst === -1 ? maybeLevel + 1 : bFirst;

    // 1. Earlier majority level wins (contestants who never reach majority go last)
    if (aN !== bN) return aN - bN;

    if (aN > maybeLevel) {
      // Both never reach majority: compare from Y upward
      for (let i = 0; i <= maybeLevel; i++) {
        if (aLevels[i] !== bLevels[i]) return bLevels[i] - aLevels[i];
      }
    } else {
      // Same majority level: primary = count at that level, then subsequent, then prior
      for (let i = aN; i <= maybeLevel; i++) {
        if (aLevels[i] !== bLevels[i]) return bLevels[i] - aLevels[i];
      }
      for (let i = 0; i < aN; i++) {
        if (aLevels[i] !== bLevels[i]) return bLevels[i] - aLevels[i];
      }
    }
    return 0;
  });

  /* Build result table */
  let headers = [t('col_contestant'), ...judgeNames, t('col_y')];
  for (let m = 1; m <= maybeLevel; m++) headers.push(`Y+M${m}`);
  let tsvRows = [];

  let html = `
  <div class="card">
    <div class="result-header">
      <h2 class="result-title">${t('result_prelim')}</h2>
    </div>
    <div class="result-table-wrapper">
    <table class="result-table">
      <thead><tr>
        <th>${t('col_contestant')}</th>`;
  judgeNames.forEach(j => { html += `<th>${j}</th>`; });
  html += `<th>${t('col_y')}</th>`;
  for (let m = 1; m <= maybeLevel; m++) html += `<th>Y+M${m}</th>`;
  html += '</tr></thead><tbody>';

  stat.forEach(s => {
    const tsvRow = [s.num, ...s.judges, s.y, ...s.cum];
    tsvRows.push(tsvRow);

    html += `<tr><td>${s.num}</td>`;
    s.judges.forEach(v => html += `<td>${v}</td>`);
    html += `<td class="${s.y >= overHalf ? 'highlight' : ''}">${s.y}</td>`;
    s.cum.forEach(v => {
      html += `<td class="${v >= overHalf ? 'highlight' : ''}">${v}</td>`;
    });
    html += '</tr>';
  });

  html += `</tbody></table></div>
    <button class="btn btn-copy" id="p-copy-btn">${t('copy_btn')}</button>
  </div>`;

  document.getElementById('result-area').innerHTML = html;
  document.getElementById('result-area').scrollIntoView({ behavior: 'smooth', block: 'start' });

  document.getElementById('p-copy-btn').onclick = function () {
    copyTSV(headers, tsvRows, this);
  };
}

/* ── Battle detection ── */
function detectBattlePairs(sorted, contestantCount, judgeCount, overHalf) {
  const battles = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    const a = sorted[i], b = sorted[i + 1];
    // Check if all steps 1-4 are equal
    if (a.firstOver !== b.firstOver) continue;
    if (a.overVal !== b.overVal) continue;
    const col = a.firstOver + 1;
    const aSum = a.scores.reduce((s, v) => s + (v <= col ? v : 0), 0);
    const bSum = b.scores.reduce((s, v) => s + (v <= col ? v : 0), 0);
    if (aSum !== bSum) continue;
    let subsequentEqual = true;
    for (let k = a.firstOver + 1; k < contestantCount; k++) {
      if (a.accum[k] !== b.accum[k]) { subsequentEqual = false; break; }
    }
    if (!subsequentEqual) continue;
    // Battle was used — compute result
    let aWin = 0, bWin = 0;
    for (let ji = 0; ji < judgeCount; ji++) {
      if (a.scores[ji] < b.scores[ji]) aWin++;
      else if (a.scores[ji] > b.scores[ji]) bWin++;
    }
    battles.push({ a: a.name, b: b.name, aWin, bWin });
  }
  return battles;
}

/* ── Final ── */
function renderFinalForm() {
  const area = document.getElementById('form-area');
  area.innerHTML = `
    <div class="form-row">
      <div class="form-group">
        <label>${t('judge_count')}</label>
        <input type="number" id="f-judge-count" min="1" max="15" value="5">
      </div>
      <div class="form-group">
        <label>${t('contestant_count')}</label>
        <input type="number" id="f-contestant-count" min="2" max="20" value="5">
      </div>
    </div>
    <button class="btn btn-primary" id="f-gen-btn">${t('generate_final')}</button>
    <div id="f-input-area"></div>
  `;
  document.getElementById('f-gen-btn').onclick = generateFinalTable;
}

function generateFinalTable() {
  const judgeCount = parseInt(document.getElementById('f-judge-count').value, 10);
  const contestantCount = parseInt(document.getElementById('f-contestant-count').value, 10);

  let html = `<div class="section-divider"></div>
  <div class="input-table-wrapper">
  <table class="input-table">
    <thead><tr>
      <th>${t('col_contestant')}</th>`;
  for (let ji = 0; ji < judgeCount; ji++) {
    html += `<th><input type="text" class="f-judge-name judge-name-input" data-j="${ji}" value="J${ji + 1}"></th>`;
  }
  html += '</tr></thead><tbody>';

  for (let ci = 0; ci < contestantCount; ci++) {
    html += `<tr>
      <td><input type="text" class="f-contestant-name contestant-input" data-c="${ci}" value="${t('contestant_label', { n: ci + 1 })}"></td>`;
    for (let ji = 0; ji < judgeCount; ji++) {
      html += `<td><input type="number" class="f-score score-input" min="1" max="${contestantCount}" data-j="${ji}" data-c="${ci}"></td>`;
    }
    html += '</tr>';
  }

  html += `</tbody></table></div>
  <div class="section-divider"></div>
  <button class="btn btn-primary" id="f-calc-btn">${t('calc_final')}</button>`;

  document.getElementById('f-input-area').innerHTML = html;
  document.getElementById('f-calc-btn').onclick = calcFinal;
}

function calcFinal() {
  const judgeInputs = Array.from(document.querySelectorAll('.f-judge-name'));
  const contestantInputs = Array.from(document.querySelectorAll('.f-contestant-name'));
  const judgeNames = judgeInputs.map(el => el.value.trim());
  const contestantNames = contestantInputs.map(el => el.value.trim());
  const judgeCount = judgeNames.length;
  const contestantCount = contestantNames.length;

  let matrix = [];
  let errors = [];

  for (let ci = 0; ci < contestantCount; ci++) {
    matrix[ci] = [];
    for (let ji = 0; ji < judgeCount; ji++) {
      const el = document.querySelector(`.f-score[data-j="${ji}"][data-c="${ci}"]`);
      const val = el ? el.value : '';
      if (!val || isNaN(val)) {
        errors.push(t('err_empty', { j: judgeNames[ji], c: contestantNames[ci] }));
        matrix[ci][ji] = null;
      } else {
        const num = parseInt(val, 10);
        if (num < 1 || num > contestantCount) {
          errors.push(t('err_range', { j: judgeNames[ji], c: contestantNames[ci], n: contestantCount, val: num }));
        }
        matrix[ci][ji] = num;
      }
    }
  }

  for (let ji = 0; ji < judgeCount; ji++) {
    const seen = {};
    for (let ci = 0; ci < contestantCount; ci++) {
      const val = matrix[ci][ji];
      if (val == null) continue;
      if (seen[val] !== undefined) {
        errors.push(t('err_dup_rank', { j: judgeNames[ji], list: [contestantNames[seen[val]], contestantNames[ci]].join('、'), val }));
      } else {
        seen[val] = ci;
      }
    }
  }

  if (errors.length) {
    document.getElementById('result-area').innerHTML =
      `<div class="card"><div class="error-box">${errors.join('<br>')}</div></div>`;
    return;
  }

  const overHalf = Math.floor(judgeCount / 2) + 1;

  // Build cumulative matrix
  let accum = [];
  for (let ci = 0; ci < contestantCount; ci++) {
    accum[ci] = [];
    for (let k = 1; k <= contestantCount; k++) {
      let cnt = 0;
      for (let ji = 0; ji < judgeCount; ji++) {
        if (matrix[ci][ji] <= k) cnt++;
      }
      accum[ci][k - 1] = cnt;
    }
  }

  let firstOver = accum.map(row => row.findIndex(cnt => cnt >= overHalf));

  let stat = contestantNames.map((name, ci) => ({
    name, ci,
    scores: matrix[ci],
    accum: accum[ci],
    firstOver: firstOver[ci],
    overVal: firstOver[ci] >= 0 ? accum[ci][firstOver[ci]] : 0,
  }));

  stat.sort((a, b) => {
    // 1. Earlier majority column wins
    if (a.firstOver !== b.firstOver) return a.firstOver - b.firstOver;
    // 2. More votes at the same column
    if (a.overVal !== b.overVal) return b.overVal - a.overVal;
    // 3. Lower sum of scores up to majority column
    const col = a.firstOver + 1;
    const aSum = a.scores.reduce((s, v) => s + (v <= col ? v : 0), 0);
    const bSum = b.scores.reduce((s, v) => s + (v <= col ? v : 0), 0);
    if (aSum !== bSum) return aSum - bSum;
    // 4. Compare subsequent cumulative columns
    for (let k = a.firstOver + 1; k < contestantCount; k++) {
      if (a.accum[k] !== b.accum[k]) return b.accum[k] - a.accum[k];
    }
    // 5. Battle: compare relative rankings between the two
    let aWin = 0, bWin = 0;
    for (let ji = 0; ji < judgeCount; ji++) {
      if (a.scores[ji] < b.scores[ji]) aWin++;
      else if (a.scores[ji] > b.scores[ji]) bWin++;
    }
    return bWin - aWin;
  });

  /* Build result */
  let headers = [t('col_rank'), t('col_contestant'), ...judgeNames];
  for (let k = 1; k <= contestantCount; k++) headers.push(`1→${k}`);
  let tsvRows = [];

  let html = `
  <div class="card">
    <div class="result-header">
      <h2 class="result-title">${t('result_final')}</h2>
    </div>
    <div class="result-table-wrapper">
    <table class="result-table">
      <thead><tr>
        <th>${t('col_rank')}</th>
        <th>${t('col_contestant')}</th>`;
  judgeNames.forEach(j => { html += `<th>${j}</th>`; });
  for (let k = 1; k <= contestantCount; k++) html += `<th>1→${k}</th>`;
  html += '</tr></thead><tbody>';

  stat.forEach((s, rank) => {
    const tsvRow = [rank + 1, s.name, ...s.scores, ...s.accum];
    tsvRows.push(tsvRow);

    html += `<tr>
      <td class="rank-col">${rank + 1}</td>
      <td>${s.name}</td>`;
    s.scores.forEach(v => { html += `<td>${v}</td>`; });
    s.accum.forEach((v, k) => {
      const isMajority = k === s.firstOver;
      html += `<td class="${isMajority ? 'first-majority' : ''}">${v}</td>`;
    });
    html += '</tr>';
  });

  html += `</tbody></table></div>
    <button class="btn btn-copy" id="f-copy-btn">${t('copy_btn')}</button>`;

  // Battle notes
  const battles = detectBattlePairs(stat, contestantCount, judgeCount, overHalf);
  if (battles.length) {
    html += `<div class="battle-notes">
      <div class="battle-title">${t('battle_title')}</div>`;
    battles.forEach(({ a, b, aWin, bWin }) => {
      html += `<div class="battle-item">
        <span class="battle-tied-text">${t('battle_tied', { a, b })}</span> `;
      if (aWin !== bWin) {
        const winner = aWin > bWin ? a : b;
        const loser  = aWin > bWin ? b : a;
        const winCount  = Math.max(aWin, bWin);
        const loseCount = Math.min(aWin, bWin);
        html += `<span>${t('battle_result', { winner, loser, winCount, loseCount })}</span>`;
      } else {
        html += `<span>${t('battle_perfect_tie', { a, b })}</span>`;
      }
      html += `</div>`;
    });
    html += `</div>`;
  }

  html += `</div>`;

  document.getElementById('result-area').innerHTML = html;
  document.getElementById('result-area').scrollIntoView({ behavior: 'smooth', block: 'start' });

  document.getElementById('f-copy-btn').onclick = function () {
    copyTSV(headers, tsvRows, this);
  };
}

/* ── Init ── */
function setLang(l) {
  lang = l;
  localStorage.setItem('rp_lang', l);
  applyI18n();
  renderCurrentForm();
}

function renderCurrentForm() {
  document.getElementById('result-area').innerHTML = '';
  if (mode === 'prelim') renderPrelimForm();
  else renderFinalForm();
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

document.querySelectorAll('.mode-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    mode = tab.dataset.mode;
    document.querySelectorAll('.mode-tab').forEach(t => t.classList.toggle('active', t.dataset.mode === mode));
    renderCurrentForm();
  });
});

applyI18n();
renderCurrentForm();
