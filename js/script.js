const rpForm = document.getElementById('rp-form');
const resultDiv = document.getElementById('result');
const modeRadios = document.querySelectorAll('input[name="mode"]');

let currentMode = 'prelim';

function renderForm() {
  rpForm.innerHTML = '';
  resultDiv.innerHTML = '';
  if (currentMode === 'prelim') {
    renderPrelimForm();
  } else {
    renderFinalForm();
  }
}

function renderPrelimForm() {
  rpForm.innerHTML = `
    <div>
      <label>評審人數（建議奇數，最小1）：
        <input type="number" id="prelim-judge-count" min="1" max="15" step="1" value="5" required>
      </label>
    </div>
    <div>
      <label>Maybe 分級數（M1~M5，預設M1）：
        <select id="prelim-maybe-level">
          <option value="1">M1</option>
          <option value="2">M2</option>
          <option value="3">M3</option>
          <option value="4">M4</option>
          <option value="5">M5</option>
        </select>
      </label>
    </div>
    <div>
      <label>每位評審要給幾個 Y：
        <input type="number" id="prelim-y-count" min="1" max="50" value="5" required>
      </label>
    </div>
    <div id="maybe-counts"></div>
    <button type="button" id="prelim-generate-table">產生評分表</button>
    <div id="prelim-input-table"></div>
    <button type="button" id="prelim-calc" style="display:none">計算 Prelim 結果</button>
  `;

  // 動態產生 Maybe 各級數量欄位
  function renderMaybeCounts() {
    const maybeLevel = parseInt(document.getElementById('prelim-maybe-level').value, 10);
    let html = '';
    for (let i = 1; i <= maybeLevel; i++) {
      html += `<label>M${i} 數量：<input type="number" class="prelim-m-count" data-m="${i}" min="0" max="50" value="2" required></label> `;
    }
    document.getElementById('maybe-counts').innerHTML = html;
  }
  document.getElementById('prelim-maybe-level').onchange = renderMaybeCounts;
  renderMaybeCounts();

  document.getElementById('prelim-generate-table').onclick = generatePrelimInputTable;
}

function generatePrelimInputTable() {
  // 取得設定
  const judgeCount = parseInt(document.getElementById('prelim-judge-count').value, 10);
  const maybeLevel = parseInt(document.getElementById('prelim-maybe-level').value, 10);
  const yCount = parseInt(document.getElementById('prelim-y-count').value, 10);
  const mCounts = Array.from(document.querySelectorAll('.prelim-m-count')).map(input => parseInt(input.value, 10));

  // 產生每位評審的輸入欄位
  let html = '<table><thead><tr><th>評審</th><th>Y 編號</th>';
  for (let i = 1; i <= maybeLevel; i++) html += `<th>M${i} 編號</th>`;
  html += '</tr></thead><tbody>';
  for (let ji = 0; ji < judgeCount; ji++) {
    html += `<tr><td><input type="text" class="prelim-judge-name" data-j="${ji}" value="Judge ${ji+1}" style="width:90px"></td>`;
    html += `<td><input type="text" class="prelim-y-input" data-j="${ji}" placeholder="如: 1,2,3" style="width:120px"></td>`;
    for (let m = 1; m <= maybeLevel; m++) {
      html += `<td><input type="text" class="prelim-m-input" data-j="${ji}" data-m="${m}" placeholder="如: 11,12" style="width:100px"></td>`;
    }
    html += '</tr>';
  }
  html += '</tbody></table>';

  document.getElementById('prelim-input-table').innerHTML = html;
  document.getElementById('prelim-calc').style.display = '';
  document.getElementById('prelim-calc').onclick = () => {
    // 動態取得評審名稱
    const judgeNames = Array.from(document.querySelectorAll('.prelim-judge-name')).map(input => input.value.trim());
    calcPrelimResult(judgeNames, maybeLevel, yCount, mCounts);
  };
}

function calcPrelimResult(judgeNames, maybeLevel, yCount, mCounts) {
  // 讀取所有評審的 Y/Mi 編號，並做驗證
  let allNumbers = new Set();
  let judgeData = [];
  let errorMsg = '';
  judgeNames.forEach((j, ji) => {
    let yStr = document.querySelector(`.prelim-y-input[data-j="${ji}"]`).value;
    let yArr = yStr.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    if (yArr.length !== yCount) {
      errorMsg += `評審 ${j} 的 Y 數量應為 ${yCount}，目前為 ${yArr.length}<br>`;
    }
    let mArrs = [];
    let allSet = new Set(yArr);
    for (let m = 1; m <= maybeLevel; m++) {
      let mStr = document.querySelector(`.prelim-m-input[data-j="${ji}"][data-m="${m}"]`).value;
      let arr = mStr.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
      if (arr.length !== mCounts[m-1]) {
        errorMsg += `評審 ${j} 的 M${m} 數量應為 ${mCounts[m-1]}，目前為 ${arr.length}<br>`;
      }
      // 檢查重複
      for (let n of arr) {
        if (allSet.has(n)) {
          errorMsg += `評審 ${j} 的 M${m} 有與 Y 或其他 Maybe 重複的編號：${n}<br>`;
        }
        allSet.add(n);
      }
      mArrs.push(arr);
    }
    for (let n of yArr) allNumbers.add(n);
    for (let arr of mArrs) for (let n of arr) allNumbers.add(n);
    judgeData.push({ y: yArr, m: mArrs });
  });

  if (errorMsg) {
    resultDiv.innerHTML = `<div style="color:red">${errorMsg}</div>`;
    return;
  }

  // 取得所有出現過的參賽者編號，排序
  let allContestants = Array.from(allNumbers).sort((a, b) => a - b);

  // 統計每位參賽者在每位評審下的 Y/Mi
  let stat = allContestants.map(num => {
    let row = { num, judges: [], y: 0, m: Array(maybeLevel).fill(0) };
    judgeData.forEach((jd, ji) => {
      let val = '';
      if (jd.y.includes(num)) {
        val = 'Y';
        row.y++;
      }
      for (let m = 1; m <= maybeLevel; m++) {
        if (jd.m[m-1].includes(num)) {
          val = `M${m}`;
          row.m[m-1]++;
        }
      }
      row.judges.push(val);
    });
    return row;
  });

  // 累加 Y+M1, Y+M1+M2...
  stat.forEach(s => {
    s.cum = [];
    let sum = s.y;
    for (let i = 0; i < maybeLevel; i++) {
      sum += s.m[i];
      s.cum.push(sum);
    }
  });

  // 排序規則
  const judgeCount = judgeNames.length;
  const overHalf = Math.floor(judgeCount / 2) + 1;
  stat.sort((a, b) => {
    // 先比Y過半
    const aOver = a.y >= overHalf, bOver = b.y >= overHalf;
    if (aOver !== bOver) return bOver - aOver;
    // 再比Y
    if (a.y !== b.y) return b.y - a.y;
    // 再比累加
    for (let i = 0; i < maybeLevel; i++) {
      if (a.cum[i] !== b.cum[i]) return b.cum[i] - a.cum[i];
    }
    return 0;
  });

  // 產生結果表
  let html = '<h2>Prelim 結果</h2><table><thead><tr><th>參賽者</th>';
  judgeNames.forEach(j => html += `<th>${j}</th>`);
  html += '<th>Y</th>';
  for (let m = 1; m <= maybeLevel; m++) html += `<th>Y+M${m}</th>`;
  html += '</tr></thead><tbody>';
  stat.forEach(s => {
    html += `<tr><td>${s.num}</td>`;
    s.judges.forEach(val => html += `<td>${val}</td>`);
    html += `<td${s.y >= overHalf ? ' class="result-highlight"' : ''}>${s.y}</td>`;
    for (let i = 0; i < maybeLevel; i++) {
      html += `<td${s.cum[i] >= overHalf ? ' class="result-highlight"' : ''}>${s.cum[i]}</td>`;
    }
    html += '</tr>';
  });
  html += '</tbody></table>';
  resultDiv.innerHTML = html;
}

function renderFinalForm() {
  rpForm.innerHTML = `
    <div>
      <label>評審人數（建議奇數，最小1）：
        <input type="number" id="final-judge-count" min="1" max="15" step="1" value="5" required>
      </label>
    </div>
    <div>
      <label>參賽者人數：
        <input type="number" id="final-contestant-count" min="2" max="20" value="5" required>
      </label>
    </div>
    <div id="final-input-table"></div>
    <button type="button" id="final-generate-table">產生評分表</button>
    <button type="button" id="final-calc" style="display:none">計算 Final 結果</button>
  `;
  document.getElementById('final-generate-table').onclick = generateFinalInputTable;
}

function generateFinalInputTable() {
  const judgeCount = parseInt(document.getElementById('final-judge-count').value, 10);
  const contestantCount = parseInt(document.getElementById('final-contestant-count').value, 10);

  // 產生表格
  let html = '<table><thead><tr><th>參賽者</th>';
  for (let ji = 0; ji < judgeCount; ji++) {
    html += `<th><input type="text" class="final-judge-name" data-j="${ji}" value="J${ji+1}" style="width:90px"></th>`;
  }
  html += '</tr></thead><tbody>';
  for (let ci = 0; ci < contestantCount; ci++) {
    html += `<tr><td><input type="text" class="final-contestant-name" data-c="${ci}" value="組合 ${ci+1}" style="width:90px"></td>`;
    for (let ji = 0; ji < judgeCount; ji++) {
      html += `<td>
        <input type="number" min="1" max="${contestantCount}" data-j="${ji}" data-c="${ci}" class="final-score" required>
      </td>`;
    }
    html += '</tr>';
  }
  html += '</tbody></table>';
  document.getElementById('final-input-table').innerHTML = html;
  document.getElementById('final-calc').style.display = '';
  document.getElementById('final-calc').onclick = () => {
    // 動態取得評審名稱
    const judgeNames = [];
    for (let ji = 0; ji < judgeCount; ji++) {
      const input = document.querySelector(`.final-judge-name[data-j="${ji}"]`);
      judgeNames.push(input ? input.value.trim() : `J${ji+1}`);
    }
    // 動態取得參賽者名稱
    const contestantNames = [];
    for (let ci = 0; ci < contestantCount; ci++) {
      const input = document.querySelector(`.final-contestant-name[data-c="${ci}"]`);
      contestantNames.push(input ? input.value.trim() : `組合 ${ci+1}`);
    }
    calcFinalResult(judgeNames, contestantNames);
  };
}

function calcFinalResult() {
  // 重新取得最新評審與參賽者名稱
  const judgeInputs = Array.from(document.querySelectorAll('.final-judge-name'));
  const contestantInputs = Array.from(document.querySelectorAll('.final-contestant-name'));
  const judgeNames = judgeInputs.map(input => input.value.trim());
  const contestantNames = contestantInputs.map(input => input.value.trim());
  const judgeCount = judgeNames.length;
  const contestantCount = contestantNames.length;
  // 讀取所有分數並驗證
  let matrix = [];
  let errorMsg = '';
  for (let i = 0; i < contestantCount; i++) {
    matrix[i] = [];
    for (let j = 0; j < judgeCount; j++) {
      const val = document.querySelector(`.final-score[data-j="${j}"][data-c="${i}"]`).value;
      const judgeName = document.querySelector(`.final-judge-name[data-j="${j}"]`)?.value?.trim() || `J${j+1}`;
      const contestantName = document.querySelector(`.final-contestant-name[data-c="${i}"]`)?.value?.trim() || `組合 ${i+1}`;
      if (!val || isNaN(val)) {
        errorMsg += `評審 ${judgeName} 的參賽者「${contestantName}」未填寫名次<br>`;
        matrix[i][j] = null;
        continue;
      }
      const num = parseInt(val, 10);
      if (num < 1 || num > contestantCount) {
        errorMsg += `評審 ${judgeName} 的參賽者「${contestantName}」名次超過範圍 (1~${contestantCount})，目前為 ${num}<br>`;
      }
      matrix[i][j] = num;
    }
  }
  // 驗證每位評審不能重複名次（同一評審對不同參賽者給相同名次）
  for (let j = 0; j < judgeCount; j++) {
    let seen = {};
    for (let i = 0; i < contestantCount; i++) {
      const val = matrix[i][j];
      if (val == null) continue;
      if (seen[val] !== undefined) {
        // 找出所有重複的參賽者
        let dupList = [contestantNames[seen[val]], contestantNames[i]];
        const judgeName = document.querySelector(`.final-judge-name[data-j="${j}"]`)?.value?.trim() || `J${j+1}`;
        errorMsg += `評審 ${judgeName} 對「${dupList.join('、')}」給了相同名次 ${val}<br>`;
      } else {
        seen[val] = i;
      }
    }
  }
  if (errorMsg) {
    resultDiv.innerHTML = `<div style="color:red">${errorMsg}</div>`;
    return;
  }

  // 累積名次計算
  // 1. 轉置 [contestant][judge] => [judge][contestant] 方便計算
  // 2. 計算每位參賽者在每個累積名次下的過半數
  let accum = [];
  for (let i = 0; i < contestantCount; i++) {
    accum[i] = [];
    for (let k = 1; k <= contestantCount; k++) {
      // 計算該參賽者在所有評審下，名次 <= k 的數量
      let cnt = 0;
      for (let j = 0; j < judgeCount; j++) {
        if (matrix[i][j] <= k) cnt++;
      }
      accum[i][k-1] = cnt;
    }
  }

  // 找出每位參賽者在哪個累積名次下 first 過半
  const overHalf = Math.floor(judgeCount / 2) + 1;
  let firstOver = accum.map(row => row.findIndex(cnt => cnt >= overHalf));
  // 產生排序依據
  let stat = contestantNames.map((name, idx) => ({
    name,
    scores: matrix[idx],
    accum: accum[idx],
    firstOver: firstOver[idx],
    overVal: firstOver[idx] >= 0 ? accum[idx][firstOver[idx]] : 0,
    idx
  }));

  // 排序規則
  stat.sort((a, b) => {
    // 1. 先比 firstOver (越小越前)
    if (a.firstOver !== b.firstOver) return a.firstOver - b.firstOver;
    // 2. 若 firstOver 相同，比 overVal (越大越前)
    if (a.overVal !== b.overVal) return b.overVal - a.overVal;
    // 3. 若還是相同，比所有評審給該參賽者在 1~firstOver 名次的名次數值加總（越小越前）
    let aSum = a.scores.reduce((sum, v) => sum + (v <= (a.firstOver + 1) ? v : 0), 0);
    let bSum = b.scores.reduce((sum, v) => sum + (v <= (b.firstOver + 1) ? v : 0), 0);
    if (aSum !== bSum) return aSum - bSum;
    // 4. 若還是相同，比下一累積名次票數
    for (let k = a.firstOver + 1; k < contestantCount; k++) {
      if (a.accum[k] !== b.accum[k]) return b.accum[k] - a.accum[k];
    }
    // 5. 完全相同時，進行 battle
    let aBattle = 0, bBattle = 0;
    for (let j = 0; j < judgeCount; j++) {
      if (a.scores[j] < b.scores[j]) aBattle++;
      else if (a.scores[j] > b.scores[j]) bBattle++;
    }
    return bBattle - aBattle;
  });

  // 產生結果表
  let html = '<h2>Final 結果</h2><table><thead><tr><th>名次</th><th>參賽者</th>';
  judgeNames.forEach(j => html += `<th>${j}</th>`);
  for (let k = 1; k <= contestantCount; k++) html += `<th>1→${k}</th>`;
  html += '</tr></thead><tbody>';
  stat.forEach((s, idx) => {
    html += `<tr><td>${idx+1}</td><td>${contestantNames[s.idx]}</td>`;
    s.scores.forEach((v, ji) => html += `<td>${v}</td>`);
    s.accum.forEach((v, k) => {
      html += `<td${k === s.firstOver ? ' class="result-highlight"' : ''}>${v}</td>`;
    });
    html += '</tr>';
  });
  html += '</tbody></table>';
  resultDiv.innerHTML = html;
}

// 監聽模式切換
modeRadios.forEach(radio => {
  radio.addEventListener('change', e => {
    currentMode = e.target.value;
    renderForm();
  });
});

// 預設載入
renderForm();