import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Button, Image } from 'react-native'
import { appColors } from '../../utils/app.colors'
import { apiConfig} from '../../utils/api.config'
import { resetBattleData } from '../../store/Battle'

const botNames = ['JimmyJon', 'JacktheRippa', 'PlayerBob', 'PrincessButterBall', 'PickleRichard', 'BiscuitChini']

const BattleResults = ({
  navigation,
  username,
  gifs,
  prompt,
  resetBattleData
}) => {
  const [winningIndex, setWinningIndex] = useState(undefined)
  const [winningName, setWinningName] = useState(undefined)
  const [resultsTime, setResultsTime] = useState(5)
  const [intervalId, setIntervalId] = useState(undefined)

  useFocusEffect(
    React.useCallback(() => {

      if(!intervalId)
        startCountdown();

      return () => {
        resetData()
        resetBattleData()
      }
    }, [])
  )

  useEffect(() => {
    if(resultsTime <= 0) {
      evaluateRound()
      if(intervalId) {
        clearInterval(intervalId)
        setIntervalId(undefined)
      }
    }
  }, [resultsTime])

  const startCountdown = () => {
    console.log('called start countdown')
    let newTime = resultsTime;
    const newIntervalId = setInterval(() => {
      console.log('interval')
      newTime--;
      setResultsTime(newTime)
    }, 1000)

    setIntervalId(newIntervalId)
  }
  
  const userWin = (user, gifID) => {
    fetch(apiConfig.baseURL + '/win', {
        method : 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: 'user=' + user.toString() + '&' + 'gif=' + gifID.toString()
    })
      .then( res => {
        if(res.status < 400)
          return res.json()
        else
          console.log('Failed at userWin')
      })
      .catch(err => {
        console.log('Caught Error in userWin')
      })
  }

  const evaluateRound = () => {

    // randomly choose winner
    const length = gifs.length;

    const winningIndex = Math.floor(Math.random() * length)

    setWinningIndex(winningIndex)
  
    // loseGame() or winGame()  - (player index will always equal 0)
    if(winningIndex === 0) {
      // player won!
      console.log('player', username, 'won!')
      setWinningName(username)
      // api call with username to increase user's score
      userWin(username, gifs[0])
    }
    else {
      // computer won!
      const winningBotName = botNames[Math.floor(Math.random() * botNames.length)]
      setWinningName(winningBotName)
    }
  }

  const resetData = () => {
    setWinningIndex(undefined)
    setWinningName(undefined)
    setResultsTime(5)

    if(intervalId)
      clearInterval(intervalId)

    setIntervalId(undefined)
  }
  
  return (
    <SafeAreaView style={styles.pageContainer}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.pageLayout}>
          <View style={styles.timeContainer}>
            <Text style={styles.resultsTimerLabel}>
              Showing results in:
            </Text>
            <Text style={styles.resultsTimerText}>{resultsTime}s</Text>
          </View>
          <View style={styles.resultsContainer}>
            <Text style={styles.winningLabelText}>And the Winner is...</Text>
            {(winningName && resultsTime <= 0) && (
              <Text style={styles.winningNameText}>{winningName}!</Text>
            )}
          </View>
          <View style={styles.promptContainer}>
            <Text style={styles.promptText}>{prompt ? prompt : "..."}</Text>
          </View>         
          <View style={styles.gifsContainer}>
            {gifs.length > 0 ? gifs.map((gifId, index) => {
              const url = 'https://i.giphy.com/media/' + gifId + '/200w.gif'
              return (
                <View
                  key={index}
                  style={winningIndex === index ?
                    [styles.gifItem, { borderWidth: 2, borderColor: appColors.neonGreen}]
                    : styles.gifItem
                  }
                >
                  <Image
                    style={styles.gifImage}
                    source={{
                      uri: url
                    }}
                  />
                  {/* <Text style={styles.gifText}>{gifId}</Text> */}
                </View>
              )
            }) : (
              <Text>No data in the array</Text>
            )}            
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              title="New Game"
              onPress={() => {
                navigation.navigate('Battle')
              }}
              style={{marginBottom:10}}>
              New Game
            </Button>
            <Button
              title="Go Home"
              onPress={() => navigation.navigate('Home')}
            >
              Go Home
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  username: state.auth.username,
  gifs: state.battle.gifs,
  prompt: state.battle.prompt,
})

export const ConnectedBattleResults = connect(
  mapStateToProps,
  { resetBattleData }
)(BattleResults)


const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pageLayout: {
    flex: 1,
    paddingHorizontal: 10,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  resultsTimerLabel: {
    fontSize: 16,
    fontFamily: "sans-serif"
  },
  resultsTime: {
    fontSize: 18,
    fontFamily: "sans-serif"
  },
  resultsContainer: {

  },
  winningNameText: {
    textAlign: "center",
    fontSize: 32,
    color: appColors.darkGray,
    fontWeight: "bold"
  },
  winningLabelText: {
    fontSize: 22,
    fontFamily: 'sans-serif',
    textAlign: 'center',
    color: appColors.darkGray,
    padding:6,
    paddingBottom: 10
  },
  gifsContainer: {
    padding: 10,
  },
  gifItem: {
    marginBottom: 12,
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.23)"
  },
  gifImage: {
    flex: 1,
    // minWidth: 200,
    minHeight:200,
    width: 200,
    height: "100%",
    // border: ...,
  },
  promptContainer: {
    marginTop:12,
    padding: 6,
  },
  promptText: {
    textAlign: "center",
    fontSize: 18,
    color: appColors.darkGray
  },
  buttonsContainer: {
    marginHorizontal: 16,
  }
})