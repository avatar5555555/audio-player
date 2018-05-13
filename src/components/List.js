import React from 'react'
import PropTypes from 'prop-types'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { getTrackDuration } from 'src/services/time'

const MessageRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  span {
    font-size: 25px;
    color: rgba(0, 0, 0, 0.6);
  }
`

const List = ({ items, onSelect }) => {
  const notFound = items.length === 0

  return notFound ? (
    <MessageRoot>
      <FormattedMessage id="notFound" />
    </MessageRoot>
  ) : (
    <ListGroup>
      {items.map(
        (
          { artistId, trackId, trackName, artistName, trackTimeMillis },
          index
        ) => {
          const isEven = index % 2 === 1
          const itemColor = isEven ? 'primary' : 'white'

          return (
            <ListGroupItem
              color={itemColor}
              key={`${artistId}-${trackId}`}
              tag="button"
              className="d-flex justify-content-between"
              onClick={() => onSelect(trackId)}
            >
              {`${index + 1}. ${artistName} - ${trackName}`}

              <div>{getTrackDuration(trackTimeMillis)}</div>
            </ListGroupItem>
          )
        }
      )}
    </ListGroup>
  )
}

List.propTypes = {
  items: PropTypes.array,
  onSelect: PropTypes.func.isRequired
}

List.defaultProps = {
  items: []
}

export default List
