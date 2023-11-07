import { strict as assert } from 'node:assert';

function rankTeams(votes: string[]): string {
  if (votes.length === 1) {
    return votes[0];
  }

  const ranks = new Map();

  votes.forEach(vote => {
    [...vote].forEach((teamName, index) => {
      let teamRanking = ranks.get(teamName);

      if (!teamRanking) {
        teamRanking = Array(votes[0].length).fill(0);
        ranks.set(teamName, teamRanking);
      }

      teamRanking[index]++;
    });
  });

  const sortedTeams = [...ranks.entries()].sort(([aName, aRanking], [bName, bRanking]) => {
    for (let i = 0; i < aRanking.length; i++) {
      if (aRanking[i] > bRanking[i]) {
        return -1;
      } else if (aRanking[i] < bRanking[i]) {
        return 1;
      }
    }

    return aName.charCodeAt(0) - bName.charCodeAt(0);
  })

  console.log(ranks);
  console.log(sortedTeams);

  const finalRank = sortedTeams.map(item => item[0]).join('');

  return finalRank;
}


const votes1 = ["ABC","ACB","ABC","ACB","ACB"];
assert.strictEqual(rankTeams(votes1), 'ACB');

const votes2 = ["WXYZ","XYZW"];
assert.strictEqual(rankTeams(votes2), "XWYZ");

const votes3 = ["ZMNAGUEDSJYLBOPHRQICWFXTVK"];
assert.strictEqual(rankTeams(votes3), "ZMNAGUEDSJYLBOPHRQICWFXTVK");

const votes4 = ["BCA","CAB","CBA","ABC","ACB","BAC"];
assert.strictEqual(rankTeams(votes4), "ABC");
