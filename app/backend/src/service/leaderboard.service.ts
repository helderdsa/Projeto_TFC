import ILeaderboard from '../interfaces/ILeaderboard';
import IMatch from '../interfaces/IMatch';
import MatchService from './match.service';
import TeamService from './team.service';

class LeaderboardService {
  generateLeaderboard = async () => {
    const teamService = new TeamService();
    const teams = await teamService.getTeams();
    const leaderboard = teams.map((team) => (
      {
        name: team.teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: '',
      }
    ));
    return leaderboard;
  };

  getFineshedMatches = async () => {
    const matchService = new MatchService();
    const finishedMatches = await matchService.getMatchsQuery('false');
    return finishedMatches;
  };

  handleMatchAsHome = (lboard: ILeaderboard, match: IMatch) => {
    const leaderboard = lboard;
    if (match.teamHome?.teamName === leaderboard.name) {
      leaderboard.goalsFavor += match.homeTeamGoals;
      leaderboard.goalsOwn += match.awayTeamGoals;
      leaderboard.totalGames += 1;
      if (match.homeTeamGoals === match.awayTeamGoals) {
        leaderboard.totalDraws += 1;
        leaderboard.totalPoints += 1;
      } else if (match.homeTeamGoals > match.awayTeamGoals) {
        leaderboard.totalVictories += 1;
        leaderboard.totalPoints += 3;
      } else {
        leaderboard.totalLosses += 1;
      }
    }
    return leaderboard;
  };

  handleMatchAsAway = (lboard: ILeaderboard, match: IMatch) => {
    const leaderboard = lboard;
    if (match.teamAway?.teamName === leaderboard.name) {
      leaderboard.goalsFavor += match.awayTeamGoals;
      leaderboard.goalsOwn += match.homeTeamGoals;
      leaderboard.totalGames += 1;
      if (match.homeTeamGoals === match.awayTeamGoals) {
        leaderboard.totalDraws += 1;
        leaderboard.totalPoints += 1;
      } else if (match.homeTeamGoals < match.awayTeamGoals) {
        leaderboard.totalVictories += 1;
        leaderboard.totalPoints += 3;
      } else {
        leaderboard.totalLosses += 1;
      }
    }
    return leaderboard;
  };

  insertLeaderboardHome = (leaderboard: ILeaderboard, matches: IMatch[]) => {
    let lboard = leaderboard;
    matches.forEach((match) => {
      lboard = this.handleMatchAsHome(lboard, match);
    });
    lboard.goalsBalance = lboard.goalsFavor - lboard.goalsOwn;
    lboard.efficiency = ((lboard.totalPoints / (lboard.totalGames * 3)) * 100).toFixed(2);
    return lboard;
  };

  insertLeaderboardAway = (leaderboard: ILeaderboard, matches: IMatch[]) => {
    let lboard = leaderboard;
    matches.forEach((match) => {
      lboard = this.handleMatchAsAway(lboard, match);
    });
    lboard.goalsBalance = lboard.goalsFavor - lboard.goalsOwn;
    lboard.efficiency = ((lboard.totalPoints / (lboard.totalGames * 3)) * 100).toFixed(2);
    return lboard;
  };

  sortLeaderboard = (currTeam: ILeaderboard, nextTeam: ILeaderboard) => {
    if (nextTeam.totalPoints !== currTeam.totalPoints) {
      return nextTeam.totalPoints - currTeam.totalPoints;
    }
    if (nextTeam.totalVictories !== currTeam.totalVictories) {
      return nextTeam.totalVictories - currTeam.totalVictories;
    }
    if (nextTeam.goalsBalance !== currTeam.goalsBalance) {
      return nextTeam.goalsBalance - currTeam.goalsBalance;
    }
    if (nextTeam.goalsFavor !== currTeam.goalsFavor) {
      return nextTeam.goalsFavor - currTeam.goalsFavor;
    }
    if (nextTeam.goalsOwn !== currTeam.goalsOwn) {
      return nextTeam.goalsOwn - currTeam.goalsOwn;
    }
    return 0;
  };

  getTeamDataAsHome = async () => {
    const fm = await this.getFineshedMatches();
    let lb = await this.generateLeaderboard();
    lb = lb.map((team) => this.insertLeaderboardHome(team, fm));
    lb = lb.sort(this.sortLeaderboard);
    return lb;
  };

  getTeamDataAsAway = async () => {
    const fm = await this.getFineshedMatches();
    let lb = await this.generateLeaderboard();
    lb = lb.map((team) => this.insertLeaderboardAway(team, fm));
    lb = lb.sort(this.sortLeaderboard);
    return lb;
  };

  getAllTeamData = async () => {
    const fm = await this.getFineshedMatches();
    let lb = await this.generateLeaderboard();
    lb = lb.map((team) => this.insertLeaderboardHome(team, fm));
    lb = lb.map((team) => this.insertLeaderboardAway(team, fm));
    lb = lb.sort(this.sortLeaderboard);
    return lb;
  };
}

export default LeaderboardService;
