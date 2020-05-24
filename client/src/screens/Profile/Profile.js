import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Image } from 'react-native'
import { appColors } from '../../utils/app.colors'
import { apiConfig } from '../../utils/api.config'


const Profile = ({
  username
}) => {
  const [profileData, setProfileData] = useState(undefined)
  const [profileErrors, setProfileErrors] = useState(null)

  useEffect(() => {
    getProfileData()

    return () => resetProfile()
  }, [])

  const getProfileData = () => {
    console.log('getting profile data')

    if(!username || username==="")
      console.log('username:', username)
    
    fetch(apiConfig.baseURL + '/collection/' + username.toString())
      .then(res => {
        if(res.status < 400)
          return res.json() // from json to js obj.
        else
          setProfileErrors("profile error")
      })
      .then(json => {
        setProfileData({
          n: json.n,
          wins: [...json.wins]
        })
      })
      .catch(err => {
        console.log('error getting profile data')
        setProfileErrors("error getting profile data")
      })
  }

  const resetProfile = () => {
    setProfileErrors(null)
  }

  return (
    <SafeAreaView style={styles.pageContainer}>
      <ScrollView style={styles.pageLayout}>
        <View style={styles.pageInner}>
          {/* <Text style={styles.headerText}>Your Collection</Text> */}
          <View style={styles.pageBody}>
            {!profileErrors && <Text>{profileErrors}</Text>}
            {!profileData ? (
              <Text>Loading profile....</Text>
            ) : (
              <View style={styles.profileData}>
                <View style={styles.dataHeader}>
                  <Text style={{textAlign:"center", color: appColors.dark, fontSize: 16}}>Number of wins: {profileData.n}</Text>
                </View>
                <View style={styles.gifList}>
                  {profileData.wins.length > 0 ? profileData.wins.map((gifId, index) => {
                    const url = 'https://i.giphy.com/media/' + gifId + '/200w.gif'

                    return (
                      <View style={styles.gifItem} key={index}>
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
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  username: state.auth.username,
})

export const ConnectedProfile = connect(
  mapStateToProps,
  null,
)(Profile)


const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pageLayout: {
    flex: 1, // ScrollView
  },
  pageInner: {
    flex: 1,
    // justifyContent: "space-evenly",
  },
  headerText: {
    fontSize: 32,
    fontFamily: 'sans-serif',
    textAlign: 'center',
    color: appColors.darkGray,
    marginLeft: 10,
    marginRight: 10,
  },
  profileData: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  dataHeader: {
    padding: 20,
    // backgroundColor: appColors.darkGray
  },
  gifList: {
    flex: 1,
  },
  gifItem: {
    minWidth: 200,
    minHeight: 200,
    maxHeight: 400,
    overflow: "scroll",
    borderWidth: 1,
    borderColor: "#666",
    marginBottom: 10,
    backgroundColor: appColors.darkGray,
  },
  gifImage: {
    flex: 1,
    minWidth: 200,
  },
  // gifText: {
  //   textAlign: "center",
  //   color: appColors.light,
  //   fontSize: 18,
  // }
})