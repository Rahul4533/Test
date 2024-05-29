const axios = require('axios');

async function fetchCricketData() {
    try {
        const apiKey = 'test-creds@2320';
        const apiUrl = 'https://api.cuvora.com/car/partner/cricket-data';

        // Step 1: Make HTTP GET request
        const response = await axios.get(apiUrl, {
            headers: {
                apiKey: apiKey
            }
        });

        const responseData = response.data;

        // Check if the response contains the expected field for matches
        if (!Array.isArray(responseData.matches)) {
            console.error('Unexpected response format:');
            console.error(responseData);
            return;
        }

        const matches = responseData.matches;

        // Variables to store the results
        let highestScore = 0;
        let highestScoringTeam = '';
        let matchesWith300PlusScore = 0;

        // Step 2: Compute the required data
        for (const match of matches) {
            if (match.ms === 'Result') {
                const team1 = match.t1;
                const team2 = match.t2;
                const team1ScoreStr = match.t1s ? match.t1s.split('/')[0] : '0';
                const team2ScoreStr = match.t2s ? match.t2s.split('/')[0] : '0';

                const team1Score = parseInt(team1ScoreStr, 10) || 0;
                const team2Score = parseInt(team2ScoreStr, 10) || 0;

                // Check highest score
                if (team1Score > highestScore) {
                    highestScore = team1Score;
                    highestScoringTeam = team1;
                }
                if (team2Score > highestScore) {
                    highestScore = team2Score;
                    highestScoringTeam = team2;
                }

                // Check for 300+ total score
                if (team1Score + team2Score >= 300) {
                    matchesWith300PlusScore++;
                }
            }
        }

        // Step 3: Print the results
        console.log(`Highest Score: ${highestScore} and Team Name is: ${highestScoringTeam}`);
        console.log(`Number Of Matches with total 300 Plus Score: ${matchesWith300PlusScore}`);

    } catch (error) {
        console.error('Error fetching cricket data:', error.message);
    }
}

fetchCricketData();
