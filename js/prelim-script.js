function generateTable() {
    const judges = parseInt(document.getElementById('judges').value);
    const finals = parseInt(document.getElementById('finals').value);
    const alternatives = parseInt(document.getElementById('alternatives').value);
    
    if (isNaN(judges) || isNaN(finals) || isNaN(alternatives) || judges < 1 || finals < 1 || alternatives < 0) {
        alert('請輸入有效的數量');
        return;
    }
    
    let table = '<table><tr><th>位置 \\ 評審</th>';
    
    for (let j = 1; j <= judges; j++) {
        table += `<th><input type="text" id="judge${j}" Value="評審${j}姓名"></th>`;
    }
    table += '</tr>';
    
    for (let f = 1; f <= finals; f++) {
        table += `<tr><td>Final ${f}</td>`;
        for (let j = 1; j <= judges; j++) {
            table += `<td><input type="text" id="final_${f}_${j}"></td>`;
        }
        table += '</tr>';
    }
    
    for (let a = 1; a <= alternatives; a++) {
        table += `<tr><td>Alt ${a}</td>`;
        for (let j = 1; j <= judges; j++) {
            table += `<td><input type="text" id="alt_${a}_${j}"></td>`;
        }
        table += '</tr>';
    }
    
    table += '</table>';
    
    document.getElementById('tableContainer').innerHTML = table;
    document.getElementById('calculateButton').style.display = 'block';
}

function calculateResults() {
    const judges = parseInt(document.getElementById('judges').value);
    const finals = parseInt(document.getElementById('finals').value);
    const alternatives = parseInt(document.getElementById('alternatives').value);
    
    const contestants = getContestants(judges, finals, alternatives);
    const cumulativeCounts = calculateCumulativeCounts(contestants, judges, alternatives);
    const finalRanking = calculateFinalRanking(cumulativeCounts, judges);
    
    displayResults(finalRanking, cumulativeCounts, contestants, judges, alternatives);
}

function calculateCumulativeCounts(contestants, judges, alternatives) {
    const cumulativeCounts = {};
    const categories = ['Final', ...Array(alternatives).fill().map((_, i) => `Alt${i+1}`)];
    
    for (const [contestant, scores] of Object.entries(contestants)) {
        cumulativeCounts[contestant] = categories.map((_, index) => {
            return scores.filter(score => {
                if (score === '') return false;
                const scoreIndex = categories.indexOf(score);
                return scoreIndex !== -1 && scoreIndex <= index;
            }).length;
        });
    }
    
    return cumulativeCounts;
}

function getContestants(judges, finals, alternatives) {
    const contestants = {};
    
    for (let j = 1; j <= judges; j++) {
        for (let f = 1; f <= finals; f++) {
            const contestant = document.getElementById(`final_${f}_${j}`).value.trim();
            if (contestant) {
                if (!contestants[contestant]) {
                    contestants[contestant] = Array(judges).fill('');
                }
                contestants[contestant][j-1] = 'Final';
            }
        }
        for (let a = 1; a <= alternatives; a++) {
            const contestant = document.getElementById(`alt_${a}_${j}`).value.trim();
            if (contestant) {
                if (!contestants[contestant]) {
                    contestants[contestant] = Array(judges).fill('');
                }
                contestants[contestant][j-1] = `Alt${a}`;
            }
        }
    }
    
    return contestants;
}

function calculateFinalRanking(cumulativeCounts, judges) {
    const threshold = judges / 2;
    let rankedContestants = [];
    let unrankedContestants = Object.keys(cumulativeCounts);
    
    for (let n = 0; n < cumulativeCounts[unrankedContestants[0]].length; n++) {
        let newlyRanked = [];
        for (let c of unrankedContestants) {
            if (cumulativeCounts[c][n] > threshold) {
                newlyRanked.push({name: c, count: cumulativeCounts[c][n]});
            }
        }
        
        newlyRanked.sort((a, b) => b.count - a.count || cumulativeCounts[b.name][n+1] - cumulativeCounts[a.name][n+1]);
        rankedContestants = rankedContestants.concat(newlyRanked.map(contestant => contestant.name));
        unrankedContestants = unrankedContestants.filter(c => !newlyRanked.some(ranked => ranked.name === c));
        
        if (unrankedContestants.length === 0) break;
    }
    
    rankedContestants = rankedContestants.concat(unrankedContestants);
    return rankedContestants;
}

function displayResults(finalRanking, cumulativeCounts, contestants, judges, alternatives) {
    const threshold = judges / 2;
    let resultHTML = '<h2>最終結果</h2><table><tr><th>排名</th><th>參賽者</th>';
    
    for (let j = 1; j <= judges; j++) {
        resultHTML += `<th>${document.getElementById('judge' + j).value}</th>`;
    }
    
    for (let n = 0; n <= alternatives; n++) {
        resultHTML += `<th>Final->${ n === 0 ? 'Final' : 'Alt' + n}</th>`;
    }
    
    resultHTML += '</tr>';
    
    finalRanking.forEach((contestant, rank) => {
        resultHTML += `<tr><td>${rank + 1}</td><td>${contestant}</td>`;
        
        contestants[contestant].forEach(score => {
            resultHTML += `<td>${score || ''}</td>`;
        });
        
        cumulativeCounts[contestant].forEach((count, index) => {
            const backgroundColor = count > threshold ? '#86D293' : '';
            resultHTML += `<td style="background-color: ${backgroundColor}">${count}</td>`;
        });
        
        resultHTML += '</tr>';
    });
    
    resultHTML += '</table>';
    document.getElementById('result').innerHTML = resultHTML;
}
