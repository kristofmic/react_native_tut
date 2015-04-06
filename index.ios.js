var
  React = require('react-native'),
  {
    AppRegistry,
    Image,
    StyleSheet,
    Text,
    View,
    ListView
  } = React,
  moviesStore = require('./movies_store'),
  styles;

styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center'
  },
  year: {
    textAlign: 'center'
  },
  thumbnail: {
    width: 53,
    height: 81
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  }
});

var AwesomeProject = React.createClass({
  getInitialState: function () {
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      isLoaded: false
    };
  },

  componentDidMount: function () {
    moviesStore.fetchMovies()
      .then((data) => {
        if (this.isMounted()) {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data.movies),
            isLoaded: true
          });
        }
      })
      .done();
  },

  render: function () {
    if (!this.state.isLoaded) return this.renderLoading();

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
    );
  },

  renderLoading: function() {
    return (
      <View style={styles.container}>
        <Text>Loading movies...</Text>
      </View>
    );
  },

  renderMovie: function(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }
});


AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
