import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadExamples } from '../../actions/event';
import ListingsTable from '../events/ListingsTable';

const Example = ({ examples }) => {
  useEffect(
    () => {
      loadExamples();
    },
    [loadExamples]
  )
  return (
    <Fragment>
      <ListingsTable data={examples} />
    </Fragment>
  )
}

const mapStateToProps = state => ({
  examples: state.examples
})

export default connect(
  mapStateToProps, { loadExamples })(Example);
