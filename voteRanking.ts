import { strict as assert } from 'node:assert';

function calculatePositionVotes(teamsToCalculate: string, position: number, votes): { [team: string]: number } {
  const positionVotes: { [team: string]: number } = {};

  console.log('calculatePositionVotes', teamsToCalculate, position);

  for (let i = 0; i < votes.length; i++) {
      const team = votes[i][position];

      if (!teamsToCalculate.includes(team)) {
          continue;
      }

      if (!positionVotes[team]) {
          positionVotes[team] = 0;
      }

      positionVotes[team]++;
  }

  return positionVotes;
}

function rankTeamsForPosition(positionVotes: { [team: string]: number }): { [rank: number]: string[] } {
  return Object.keys(positionVotes).reduce((acc, team) => {
      const numVotes = positionVotes[team];

      if (!acc[numVotes]) {
          acc[numVotes] = [];
      }

      acc[numVotes].push(team);

      return acc;
  }, {});
}

function rankPositionForTeams(teamsToRank: string, position: number, votes: string[]): string {
  let rank = '';

  const positionVotes = calculatePositionVotes(teamsToRank, position, votes);

  console.log('positionVotes', positionVotes, position);

  // rank teams for position
  const positionRanking: { [rank: number]: string[] } = rankTeamsForPosition(positionVotes);

  console.log('positionRanking', positionRanking, position);

  const descVotesOrder = Object.keys(positionRanking).reverse();

  for (let i = 0; i < descVotesOrder.length; i++) {
      const teams = positionRanking[descVotesOrder[i]];

      // rank team based on votes per position
      if (teams.length === 1) {
          rank += teams[0];
      } else {
          const tiedTeams = teams.join('');
          console.log('tiedTeams', tiedTeams);
          // break tie for team based on next position [or alphabetically]
          const ties = rankPositionForTeams(tiedTeams, position + 1, votes);

          console.log('ties resolution', ties);

          rank += ties;
      }
  }
  
  // rank missing teams on next position
  let missingTeams = '';
  for (let i = 0; i < teamsToRank.length; i++) {
      const needle = teamsToRank[i];

      if (!rank.includes(needle)) {
          missingTeams += needle;
      }
  }

  console.log('missingTeams on position', missingTeams, position)

  if (missingTeams.length === 1) {
      rank += missingTeams;
  } else if (missingTeams.length > 0) {
      let missingRanks;
      if (position < votes[0].length - 2) {
          missingRanks = rankPositionForTeams(missingTeams, position + 1, votes);

          console.log('missingRanks by ranking', missingRanks);
      } else {
          missingRanks = [...missingTeams].sort().join('');

          console.log('missingRanks by alpha', missingRanks);
      }

      rank += missingRanks;
  }

  return rank;
}

function rankTeams(votes: string[]): string {
  if (votes.length === 1) {
      return votes[0];
  }

  return rankPositionForTeams(votes[0], 0, votes)
}

const votes1 = ["ABC","ACB","ABC","ACB","ACB"];
assert.strictEqual(rankTeams(votes1), 'ACB');

const votes2 = ["WXYZ","XYZW"];
assert.strictEqual(rankTeams(votes2), "XWYZ");

const votes3 = ["ZMNAGUEDSJYLBOPHRQICWFXTVK"];
assert.strictEqual(rankTeams(votes3), "ZMNAGUEDSJYLBOPHRQICWFXTVK");

const votes4 = ["BCA","CAB","CBA","ABC","ACB","BAC"];
assert.strictEqual(rankTeams(votes4), "ABC");