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
    const contestants = parseInt(document.getElementById('contestants').value);
    const judges = parseInt(document.getElementById('judges').value);
    
    if (!validateInput(contestants, judges)) return;
    
    const scores = getScores(contestants, judges);
    const cumulativeCounts = calculateCumulativeCounts(scores, contestants, judges);
    const finalRanking = calculateFinalRanking(cumulativeCounts, contestants, judges);
    
    displayResults(finalRanking, cumulativeCounts, scores, contestants, judges);
}

function validateInput(contestants, judges) {
    for (let j = 1; j <= judges; j++) {
        const judgeName = document.getElementById(`judge${j}`).value.trim();
        if (!judgeName) {
            alert(`請輸入評審${j}的姓名`);
            return false;
        }
        
        const scores = new Set();
        for (let c = 1; c <= contestants; c++) {
            const score = parseInt(document.getElementById(`score_${c}_${j}`).value);
            if (scores.has(score)) {
                alert(`評審${j}的評分出現重複`);
                return false;
            }
            scores.add(score);
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
        scores.push(contestantScores);
    }
    return scores;
}

function calculateCumulativeCounts(scores, contestants, judges) {
    const cumulativeCounts = [];
    for (let c = 0; c < contestants; c++) {
        const counts = [];
        for (let rank = 1; rank <= contestants; rank++) {
            const count = scores[c].filter(score => score <= rank).length;
            counts.push(count);
        }
        cumulativeCounts.push(counts);
    }
    return cumulativeCounts;
}

function calculateFinalRanking(cumulativeCounts, contestants, judges) {
    const threshold = Math.floor(judges / 2) + 1;
    let unranked = Array.from({ length: contestants }, (_, i) => i);
    const finalRanking = new Array(contestants).fill(0);
    
    for (let m = 0; m < contestants; m++) {
        let qualifiedContestants = unranked.filter(c => cumulativeCounts[c][m] >= threshold);
        
        if (qualifiedContestants.length > 0) {
            qualifiedContestants.sort((a, b) => {
                for (let i = m; i >= 0; i--) {
                    if (cumulativeCounts[a][i] !== cumulativeCounts[b][i]) {
                        return cumulativeCounts[b][i] - cumulativeCounts[a][i];
                    }
                }
                for (let i = m + 1; i < contestants; i++) {
                    if (cumulativeCounts[a][i] !== cumulativeCounts[b][i]) {
                        return cumulativeCounts[b][i] - cumulativeCounts[a][i];
                    }
                }
                return 0;
            });
            
            let currentRank = unranked.indexOf(qualifiedContestants[0]) + 1;
            for (let contestant of qualifiedContestants) {
                finalRanking[contestant] = currentRank;
                unranked = unranked.filter(u => u !== contestant);
            }
        }
        
        if (unranked.length === 0) break;
    }
    
    return finalRanking;
}

function displayResults(finalRanking, cumulativeCounts, scores, contestants, judges) {
    const threshold = Math.floor(judges / 2) + 1;
    let resultHtml = '<h2>最終排名和累計數量</h2><table><tr><th>排名</th><th>參賽者</th>';
    
    for (let j = 1; j <= judges; j++) {
        resultHtml += `<th>${document.getElementById(`judge${j}`).value}</th>`;
    }
    
    for (let i = 1; i <= contestants; i++) {
        resultHtml += `<th>1->${i}</th>`;
    }
    resultHtml += '</tr>';
    
    const sortedContestants = finalRanking.map((rank, index) => ({ index, rank }))
                                          .sort((a, b) => a.rank - b.rank);
    
    for (let finalRank = 1; finalRank <= contestants; finalRank++) {
        const { index } = sortedContestants[finalRank - 1];
        const contestantName = document.getElementById(`contestant${index + 1}`).value.trim() || `參賽者${index + 1}`;
        resultHtml += `<tr><td>${finalRank}</td><td>${contestantName}</td>`;
        
        for (let j = 0; j < judges; j++) {
            resultHtml += `<td>${scores[index][j]}</td>`;
        }
        
        for (let i = 0; i < contestants; i++) {
            const count = cumulativeCounts[index][i];
            const className = count >= threshold ? 'threshold-exceeded' : '';
            resultHtml += `<td class="${className}">${count}</td>`;
        }
        resultHtml += '</tr>';
    }
    
    resultHtml += '</table>';
    document.getElementById('result').innerHTML = resultHtml;
}
