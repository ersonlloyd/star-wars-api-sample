import React from 'react'
import { withApollo, Query } from 'react-apollo'
import { Table, Card, Spin } from 'antd'
import flowright from "lodash.flowright"
import FILMS from '../../../../../src/graphql/films'

import '../films/index.scss'

const FilmContainer = (props) => {
  
  const columns = [
    {
      title: 'Film',
      dataIndex: 'films',
      key: 'films'
    },
    {
      title: 'Producer',
      dataIndex: 'producer',
      key: 'producer'
    },
    {
      title: 'Director',
      dataIndex: 'director',
      key: 'director'
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Edited',
      dataIndex: 'update',
      key: 'update'
    },
    {
      title: 'URL',
      dataIndex: 'site',
      key: 'site'
    }

  ]

  function getAllFilms (props) {
    let rowItems = []

    return (
      <Query query={FILMS.ALL_FILMS}>
        { ({data, loading, error}) => {
          if (loading) return <Spin />
          if (error) return <p>ERROR</p>
          const converted = [data]
          converted[0].getAllFilms.results.map((value, i) =>
            rowItems.push({
              key: i,
              films: value.title,
              producer: value.producer,
              director: value.director,
              date: value.created,
              update: value.edited,
              site: value.url
            })
          )
          return (
            <Table dataSource={rowItems} columns={columns} pagination={false}  scroll={{ x: 'fit-content' }}/>
          )
        }}
      </Query>
    )
  }

  return (
    <div className='body-content'>
      <h2>List of Films</h2>
      <Card>
        <div className='table-container'>
          {getAllFilms(props)}
        </div>
      </Card>
    </div>
  )
}


export default flowright(
  withApollo
)(FilmContainer)