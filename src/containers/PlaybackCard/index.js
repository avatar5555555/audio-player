import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import PlaybackControl from 'src/components/PlaybackControl'
import VolumeControl from 'src/components/VolumeControl'
import Icon from 'src/components/Icon'
import Playback from 'src/components/Playback'
import SearchBar from 'src/components/SearchBar'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  img {
    width: 100px;
    height: 100px;
  }

  audio {
    width: 100%;
  }
`

const ControlsRoot = styled.div`
  display: flex;
  margin: 10px 0;
`

const Text = styled.div`
  display: flex;
  flex: 1;
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  justify-content: center;
  margin-left: 10px;
  white-space: wrap;
`

const InfoRoot = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const PlaybackCard = ({
  artworkUrl100,
  artistName,
  trackName,
  duration,
  volumeLevel,
  currentTime,
  isMuted,
  isPlaying,
  mute,
  play,
  pause,
  forward,
  backward,
  seeked,
  volume,
  onSubmit
}) => (
  <Root>
    <InfoRoot>
      {artworkUrl100 ? (
        <img src={artworkUrl100} alt="album" />
      ) : (
        <Icon name="cd" small={false} />
      )}

      <Text>{artistName && `${artistName} - ${trackName}`}</Text>
    </InfoRoot>

    <ControlsRoot>
      <VolumeControl
        volume={volumeLevel}
        volumeChange={volume}
        isMuted={isMuted}
        mute={mute}
      />
      <PlaybackControl
        play={play}
        pause={pause}
        forward={forward}
        backward={backward}
        isPlaying={isPlaying}
      />
    </ControlsRoot>

    <Playback
      timeSeeked={seeked}
      duration={duration}
      currentTime={currentTime}
    />
    <SearchBar onSubmit={onSubmit} />
  </Root>
)

PlaybackCard.propTypes = {
  artworkUrl100: PropTypes.string,
  artistName: PropTypes.string,
  trackName: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  duration: PropTypes.number,
  volumeLevel: PropTypes.number,
  isMuted: PropTypes.bool,
  isPlaying: PropTypes.bool,
  currentTime: PropTypes.number,
  mute: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  forward: PropTypes.func.isRequired,
  backward: PropTypes.func.isRequired,
  seeked: PropTypes.func.isRequired,
  volume: PropTypes.func.isRequired
}

PlaybackCard.defaultProps = {
  artworkUrl100: '',
  artistName: '',
  trackName: '',
  duration: 0,
  volumeLevel: 0,
  currentTime: 0,
  isMuted: false,
  isPlaying: false
}

export default PlaybackCard
