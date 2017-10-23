// @flow

/**
 * Hooks Redux state to Message component
 * When the state changes Message will automatically re-render
 */

import { connect } from 'react-redux'

import Message from '../component/message'

const mapStateToProps = state => ({
  message: state.hello.get('message'),
})

export default connect(mapStateToProps)(Message)
