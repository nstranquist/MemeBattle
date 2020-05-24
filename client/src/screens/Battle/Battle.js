/* src/screens/Battle/Battle.js */

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Image, Button } from 'react-native'
import { GiphySearch } from '../../components/GiphySearch'
import { ErrorText } from '../../components/ErrorText'
import { apiConfig } from '../../utils/api.config'
import { appColors } from '../../utils/app.colors'
import { addGif, setPrompt } from '../../store/Battle'

/* Todo:
[] Generate bot names
[] Icons
*/

const botNames = ['JimmyJon', 'JacktheRippa', 'PlayerBob', 'PrincessButterBall', 'PickleRichard', 'BiscuitChini']

const Battle = ({
  navigation,
  username,
  prompt,
  addGif,
  setPrompt,
}) => {
  // const [battleData, setBattleData] = useState(battleState)
  const [roundTime, setRoundTime] = useState(30)
  const [selectedGif, setSelectedGif] = useState(undefined)
  const [intervalId, setIntervalId] = useState(undefined)
  // const [prompt, setPrompt] = useState(undefined)
  const [errors, setErrors] = useState(null)

  // or useFocusEffect()...
  useFocusEffect(
    React.useCallback(() => {
      startRoundTimer();
      
      getRandomPrompt()

      return () => resetBattle()
    }, [])
  )

  useEffect(() => {
    if(roundTime <= 0) {
      console.log('round time:', roundTime)
      endRound()
      if(intervalId) {

        clearInterval(intervalId)
      }
      setIntervalId(undefined)
    }
  }, [roundTime])

  const startRoundTimer = () => {
    let newTime = roundTime;
    const newIntervalId = setInterval(() => {
      console.log('call interval')
      newTime--;
      setRoundTime(newTime)
    }, 1000)

    setIntervalId(newIntervalId)
  }

  const endRound = () => {
    // const playerGifs = [
    //   selectedGif.id,
    //   getRandomGif(),
    //   getRandomGif()
    // ]

    addGif(selectedGif.id)

    getRandomGif()
    getRandomGif()

    navigation.navigate("BattleResults")
  }

  const onSelectGif = (gifData) => {
    if(gifData.id)
      setSelectedGif(gifData)
  }

  const getRandomGif = async () => {
    const url = apiConfig.giphyURL + '/random?api_key=' + apiConfig.giphyKey + '&rating=R'
    
    fetch(url)
      .then(res => {
        if(res.status < 400)
          return res.json()
        else
          console.log('getRandomGif for bot failed')
      })
      .then(data => {
        // random gif json
        randomGifId = data.data.id // string id
        console.log('random gif id:', randomGifId)
        addGif(randomGifId)
      })
      .catch(err => {
        console.log('caught error getting random gif')
        setErrors("could not generate random gif")
      })
  }

  const getRandomPrompt = async () => {
    // let randomPrompt;
    const url = apiConfig.baseURL + '/prompt/' + Math.floor(Math.random() * 275).toString()

    let randomPrompt = await fetch(url)
      .then( res => {
        if(res.status < 400)
          return res.json()
        else
          console.log('getRandomPrompt failed')

      })
      .then( data => {
        if(data) {
          console.log('received prompt:', data.prompt)
          randomPrompt = data.prompt
          setPrompt(randomPrompt)
        }
      })
      .catch( err => {
        console.log('caught error in getting random prompt')
        setErrors("error getting the prompt")
      })
  }

  const resetBattle = () => {
    // setBattleData(battleState)
    setRoundTime(30)
    setSelectedGif(undefined)
    setErrors(null)

    if(intervalId)
      clearInterval(intervalId)

    setIntervalId(undefined)
  }

  const formatSeconds = (seconds) => {
    if(seconds < 10)
      return `0${seconds}`

    return seconds.toString()
  }
  
  return (
    <SafeAreaView style={styles.pageContainer}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.pageLayout}>
          <View style={styles.header}>
            <View style={styles.timeContainer}>
              <Text style={styles.timeTextLabel}>
                {/* Clock Icon here: */}
                Time Remaining:
              </Text>
              <Text style={styles.timeText}>0:{formatSeconds(roundTime)}s</Text>
            </View>
          </View>
          <View style={styles.promptContainer}>
            <Text style={styles.promptText}>{prompt ? prompt.toString() : "..."}</Text>
            {errors && <ErrorText text={errors} />}
          </View>
          <View style={styles.chooseGif}>
            {selectedGif && (
              <View style={styles.selectedGif}>
                <Image
                  style={styles.gifItemImage}
                  source={{
                    uri: selectedGif.url
                  }}
                />
                <Button
                  title="Submit"
                  style={styles.gifItemButton}
                  onPress={() => setRoundTime(0)}
                >
                  Submit
                </Button>
              </View>
            )}
            <GiphySearch onSelectGif={onSelectGif} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  username: state.auth.username,
  prompt: state.battle.prompt,
})

export const ConnectedBattle = connect(
  mapStateToProps,
  { addGif, setPrompt }
)(Battle)

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pageLayout: {
    flex: 1,
    justifyContent: "space-evenly"
  },
  headerText: {
    fontSize: 44,
    fontFamily: 'sans-serif',
    textAlign: 'center',
    color: appColors.darkGray,
  },
  promptContainer: {
    flex: 1,
    margin: 20,
    padding: 25,
    // minHeight: "33%",
    backgroundColor: appColors.darkestGray,
    justifyContent: "center",
    alignItems: "center",
    borderLeftColor: appColors.neonGreen,
    borderBottomColor: appColors.neonGreen,
    borderLeftWidth: 5,
    borderBottomWidth: 5,
  },
  promptText: {
    // textAlign: "center",
    color: appColors.neonGreen,
    fontSize: 30,
    fontFamily: "serif",
    fontWeight: "600"
  },
  chooseGif: {
    marginTop: 15,
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: appColors.lightest,
  },
  selectedGif: {
    // padding: 10,
    flexDirection: "column",
    alignItems: "center",
  },
  gifItemImage: {
    flex: 1,
    // minWidth: 200,
    minHeight:200,
    width: 200,
    height: "100%"
  },
  gifItemButton: {
    height: 28,
    marginTop: 8,
    textAlign: "center",
    backgroundColor: appColors.deepBlue,
    color: appColors.lightest,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 12,
    marginLeft: 12
  },
  timeText: {
    color: appColors.neonGreen,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: appColors.darkestGray,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
    fontSize: 26,
    fontFamily: "sans-serif"
  },
  timeTextLabel: {
    color: appColors.red,
    // color: "rgba(255,0,0,.75)",
    fontSize: 20,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontFamily: "sans-serif"
  }
})