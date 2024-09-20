function generateTable() {
    const contestants = parseInt(document.getElementById('contestants').value);
    const judges = parseInt(document.getElementById('judges').value);
    
    if (isNaN(contestants) || isNaN(judges) || contestants < 2 || judges < 2) {
        alert('請輸入有效的參賽者和評審數量（至少為2）');
        return;
    }
    
    let table = '<table><tr><th>參賽者 \\ 評審</th>';
    
    for (let j = 1; j <= judges; j++) {
        table += `<th><input type="text" id="judge${j}" placeholder="評審${j}姓名" value="評審${j}"></th>`;
    }
    table += '</tr>';
    
    for (let c = 1; c <= contestants; c++) {
        table += `<tr><td><input type="text" id="contestant${c}" placeholder="參賽者${c}姓名" value="參賽者${c}"></td>`;
        for (let j = 1; j <= judges; j++) {
            table += `<td><select id="score_${c}_${j}">`;
            for (let r = 1; r <= contestants; r++) {
                table += `<option value="${r}">${r}</option>`;
            }
            table += '</select></td>';
        }
        table += '</tr>';
    }
    table += '</table>';
    
    document.getElementById('tableContainer').innerHTML = table;
    document.getElementById('calculateButton').style.display = 'block';
}

function calculateResults() {
    const contestants = parseInt(document.getElementById('contestants').value); // 參賽者數量
    const judges = parseInt(document.getElementById('judges').value); // 評審數量
    
    if (!validateInput(contestants, judges)) return; // 驗證輸入
    
    const scores = getScores(contestants, judges); // 取得評分
    const cumulativeCounts = calculateCumulativeCounts(scores, contestants, judges); // 計算累計數量
    const finalRanking = calculateFinalRanking(cumulativeCounts, contestants, judges); // 計算最終排名
    
    displayResults(finalRanking, cumulativeCounts, scores, contestants, judges); // 顯示結果
}

function validateInput(contestants, judges) {
    for (let j = 1; j <= judges; j++) {
        const judgeName = document.getElementById(`judge${j}`).value.trim(); // 取得評審姓名
        if (!judgeName) {
            alert(`請輸入評審${j}的姓名`); // 驗證評審姓名
            return false;
        }
        
        const scores = new Set(); // 用 Set 檢查評分是否重複
        for (let c = 1; c <= contestants; c++) {
            const score = parseInt(document.getElementById(`score_${c}_${j}`).value); // 取得評分
            if (scores.has(score)) {
                alert(`評審${j}的評分出現重複`); // 驗證評分是否重複
                return false;
            }
            scores.add(score); // 將評分加入 Set
        }
    }
    return true;
}

function getScores(contestants, judges) {
    const scores = [];
    for (let c = 1; c <= contestants; c++) {
        const contestantScores = [];
        for (let j = 1; j <= judges; j++) {
            contestantScores.push(parseInt(document.getElementById(`score_${c}_${j}`).value));
        }
        scores.push(contestantScores); // 將評分加入陣列
    }
    return scores;
}


function calculateResults() {
    const contestants = parseInt(document.getElementById('contestants').value);
    const judges = parseInt(document.getElementById('judges').value);
    
    if (!validateInput(contestants, judges)) return;
    
    const scores = getScores(contestants, judges);
    const cumulativeCounts = calculateCumulativeCounts(scores, contestants, judges);
    const finalRanking = calculateFinalRanking(cumulativeCounts, contestants, judges);
    
    displayResults(finalRanking, cumulativeCounts, scores, contestants, judges);
}

function calculateCumulativeCounts(scores, contestants, judges) {
    const cumulativeCounts = [];
    
    for (let c = 0; c < contestants; c++) {
        const contestantCounts = [];
        for (let n = 1; n <= contestants; n++) {
            const count = scores[c].filter(score => score <= n).length;
            contestantCounts.push(count);
        }
        cumulativeCounts.push(contestantCounts);
    }
    
    return cumulativeCounts;
}

function calculateFinalRanking(cumulativeCounts, contestants, judges) {
    const threshold = Math.floor(judges / 2)+1;
    let rankedContestants = [];
    let unrankedContestants = [...Array(contestants).keys()];
    
    for (let n = 0; n < contestants; n++) {
        let newlyRanked = [];
        for (let c of unrankedContestants) {
            if (cumulativeCounts[c][n] >= threshold) {
                newlyRanked.push({index: c, count: cumulativeCounts[c][n]});
            }
        }
        
        newlyRanked.sort((a, b) => b.count - a.count);
        rankedContestants = rankedContestants.concat(newlyRanked.map(contestant => contestant.index));
        unrankedContestants = unrankedContestants.filter(c => !newlyRanked.some(ranked => ranked.index === c));
        
        if (unrankedContestants.length === 0) break;
    }
    
    rankedContestants = rankedContestants.concat(unrankedContestants);
    return rankedContestants;
}

function displayResults(finalRanking, cumulativeCounts, scores, contestants, judges) {
    const threshold = Math.floor(judges / 2)+1;
    let resultHTML = '<h2>最終結果</h2><table><tr><th>排名</th><th>參賽者</th>';
    
    for (let j = 1; j <= judges; j++) {
        resultHTML += `<th>${document.getElementById('judge' + j).value}</th>`;
    }
    
    for (let n = 1; n <= contestants; n++) {
        resultHTML += `<th>1->${n}</th>`;
    }
    
    resultHTML += '</tr>';
    
    finalRanking.forEach((contestantIndex, rank) => {
        const contestantName = document.getElementById('contestant' + (contestantIndex + 1)).value;
        resultHTML += `<tr><td>${rank + 1}</td><td>${contestantName}</td>`;
        
        scores[contestantIndex].forEach(score => {
            resultHTML += `<td>${score}</td>`;
        });
        
        cumulativeCounts[contestantIndex].forEach((count, index) => {
            const backgroundColor = count >= threshold ? '#86D293' : '';
            resultHTML += `<td style="background-color: ${backgroundColor}">${count}</td>`;
        });
        
        resultHTML += '</tr>';
    });
    
    resultHTML += '</table>';
    document.getElementById('result').innerHTML = resultHTML;
}
