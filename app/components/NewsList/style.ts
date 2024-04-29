import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'lightgrey',
  },
  refreshBtn: {
    backgroundColor: 'black',
    width: '25%',
    alignItems: 'center',
    alignSelf: 'center',
    height: 30,
    justifyContent: 'center',
    borderRadius: 20,
    marginVertical: 20,
  },
  refreshText: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 14,
  },
  headerListTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'lucida grande',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  note: {
    fontSize: 12,
    fontWeight: '400',
    color: 'black',
    alignSelf: 'center',
    fontStyle: 'italic',
  },
  stickyHeader: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 5,
  },
});

export default styles;
