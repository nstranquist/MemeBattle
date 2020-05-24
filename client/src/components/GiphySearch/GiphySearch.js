import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { StyleSheet, View, TextInput, Text, Image, TouchableOpacity } from 'react-native'
import { apiConfig } from '../../utils/api.config'
import { appColors } from '../../utils/app.colors'


export const GiphySearch = ({
  onSelectGif
}) => {
  const [searchInput, setSearchInput] = useState("")
  const [gifs, setGifs] = useState(undefined) // array of (20?) gif objects

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        console.log('reset search')
        resetGiphySearch()
      }
    }, [])
  )

  const handleInput = (text) => {
    setSearchInput(text)

    // make api call
    // getGifs(text);
  }

  const handleSearch = () => {
    getGifs(searchInput)
  }

  const getGifs = async (textQuery) => {
    // call Giphy api
    const url = apiConfig.giphyURL + '/search?api_key=' + apiConfig.giphyKey + '&q=' + textQuery.toString() + '&limit=20&offset=0&rating=R&lang=en'
  
    fetch(url)
      .then( res => res.json())
      .then( data => {
        // console.log('data received:', JSON.stringify(data))

        return data.data.map(gif => ({
          id : gif.id,
          url : 'https://i.giphy.com/media/' + gif.id + '/200w.gif',
          height : gif.images.fixed_width.height,
          width : gif.images.fixed_width.width
        }))
      })
      .then(parsedGifs => {
        console.log('received', parsedGifs.length, 'gifs')
        setGifs(parsedGifs)
      })
      .catch(err => {
        console.log('error searching gifs')
      })
  }

  const handleSelectGif = (gifData) => {
    // select gif by id
    console.log('selected gif with id:', gifData.id)

    onSelectGif(gifData)
  }

  const resetGiphySearch = () => {
    setGifs([])
    setSearchInput("")
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          value={searchInput}
          onChangeText={text => handleInput(text)}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
        >
          <Text style={styles.searchText}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.resultsContainer}>
        {/* Map over result items */}
        {gifs && gifs.length > 0 && gifs.map((gif, index) => {
          // const url = "fakenews.org"
          console.log('gif id:', gif.id, "gif url:", gif.url)

          return (
            <TouchableOpacity
              key={index}
              style={styles.gifItemResult}
              onPress={() => handleSelectGif(gif)}
            >
              <Image
                style={styles.gifItemImage}
                source={{
                  uri: gif.url
                }}
                // height={gif.height}
                // width={gif.width}
              />
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: "row",
    // alignItems:"center",
    height: 50,
    marginBottom:8,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: appColors.darkGray,
    borderRadius: 5,
    // elevation: 2,
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 18,
    flex: 1,
    height: 50,
    alignItems: "center"
  },
  searchButton: {
    backgroundColor: appColors.deepBlue,
    width: 80,
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  searchText: {
    color:"#fff",textAlign:"center", fontSize:16
  },
  resultsContainer: {
    flex: 1
  },
  // gifItemResult: {
  //   minHeight: 40,
  //   maxHeight: 200,
  //   borderWidth: 1,
  //   borderColor: "black",
  //   marginBottom: 6,
  // },
  gifItemResult: {
    minWidth: 200,
    minHeight: 200,
    maxHeight: 400,
    overflow: "scroll",
    borderWidth: 1,
    borderColor: "#666",
    marginBottom: 10,
    backgroundColor: appColors.darkGray,
  },
  gifTouchable: {
    opacity: 0,
    // backgroundColor: "rgba(0,0,0,0)"
  },
  gifItemImage: {
    flex: 1,
    minWidth: 200,
  },

})