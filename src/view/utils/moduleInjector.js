import { connect } from 'react-redux';

export default ({ connectOpt }) => (target) => {
    target = connect(connectOpt.mapStateToProps, connectOpt.mapDispatchToProps)(target);
};
