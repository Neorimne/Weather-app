import { connect } from 'react-redux';
import  Content from './Content';
import searchDataReducer, { getData, setIsFetching } from '../../redux/searchDataReducer';

const mapStateToProps = (state) => {
    return {
        searchData: state.searchData
    }
}

const ContentContainer = connect(mapStateToProps, { searchDataReducer, getData, setIsFetching })(Content);
export default ContentContainer;