import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Feed: {
            screens: {
              FeedScreen: 'one',
            },
          },
          Explore: {
            screens: {
              ExploreScreen: 'two',
            },
          },
          Profile: {
            screens: {
              ProfileScreen: 'two',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
